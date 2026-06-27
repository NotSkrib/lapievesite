// Availability from Airbnb + Booking.com iCal export feeds.
//
// Each villa's listings expose an iCal URL (Airbnb: "Availability settings >
// Sync calendars > Export"; Booking.com: "Calendar > Sync calendars > Export").
// Put them in .env.local as ICAL_<SLUG>_AIRBNB and ICAL_<SLUG>_BOOKING, e.g.
// ICAL_VIGNA_AIRBNB=https://www.airbnb.com/calendar/ical/12345.ics?s=...
// When a feed is missing, that source is simply treated as fully available.

export type BusyRange = { start: number; end: number }; // ms epoch, half-open [start, end)
export type WeekSlot = { start: string; end: string; available: boolean }; // ISO yyyy-mm-dd

const DAY = 86_400_000;

export function feedsForVilla(slug: string): string[] {
  const key = slug.toUpperCase();
  return [
    process.env[`ICAL_${key}_AIRBNB`],
    process.env[`ICAL_${key}_BOOKING`],
  ].filter((u): u is string => Boolean(u && u.trim()));
}

// Unfold RFC 5545 long lines (continuation lines start with a space or tab).
function unfold(ical: string): string[] {
  const lines: string[] = [];
  for (const line of ical.split(/\r?\n/)) {
    if ((line.startsWith(" ") || line.startsWith("\t")) && lines.length) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  return lines;
}

function parseIcalDate(value: string): number | null {
  const m = value.match(/(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

export function parseIcal(ical: string): BusyRange[] {
  const ranges: BusyRange[] = [];
  let inEvent = false;
  let start: number | null = null;
  let end: number | null = null;

  for (const line of unfold(ical)) {
    if (line.startsWith("BEGIN:VEVENT")) {
      inEvent = true;
      start = null;
      end = null;
    } else if (line.startsWith("END:VEVENT")) {
      if (start !== null) {
        ranges.push({ start, end: end ?? start + DAY });
      }
      inEvent = false;
    } else if (inEvent && line.startsWith("DTSTART")) {
      start = parseIcalDate(line.split(":").pop() ?? "");
    } else if (inEvent && line.startsWith("DTEND")) {
      end = parseIcalDate(line.split(":").pop() ?? "");
    }
  }
  return ranges;
}

export async function getBusyRanges(slug: string): Promise<BusyRange[]> {
  const all: BusyRange[] = [];
  await Promise.all(
    feedsForVilla(slug).map(async (url) => {
      try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) return;
        all.push(...parseIcal(await res.text()));
      } catch {
        // A failing feed should never break the booking page.
      }
    }),
  );
  return all;
}

function nextSaturdayUTC(): number {
  const now = new Date();
  const base = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const day = new Date(base).getUTCDay(); // 0 Sun .. 6 Sat
  return base + ((6 - day + 7) % 7) * DAY;
}

const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

// Saturday-to-Saturday weeks. A week is busy if any range overlaps it.
export function generateWeeks(count: number, busy: BusyRange[]): WeekSlot[] {
  const first = nextSaturdayUTC();
  const weeks: WeekSlot[] = [];
  for (let i = 0; i < count; i++) {
    const start = first + i * 7 * DAY;
    const end = start + 7 * DAY;
    const overlap = busy.some((r) => r.start < end && r.end > start);
    weeks.push({ start: iso(start), end: iso(end), available: !overlap });
  }
  return weeks;
}
