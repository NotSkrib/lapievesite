import { NextRequest, NextResponse } from "next/server";
import { villaBySlug } from "@/lib/villas";
import { feedsForVilla, getBusyRanges, generateWeeks } from "@/lib/availability";

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("villa") ?? "";
  const count = Math.min(
    Math.max(Number(req.nextUrl.searchParams.get("weeks") ?? 30), 1),
    52,
  );

  const villa = villaBySlug(slug);
  if (!villa) {
    // No specific villa chosen: show open weeks, availability not villa-specific.
    return NextResponse.json({ hasFeeds: false, weeks: generateWeeks(count, []) });
  }

  const feeds = feedsForVilla(slug);
  const busy = feeds.length ? await getBusyRanges(slug) : [];
  return NextResponse.json({
    hasFeeds: feeds.length > 0,
    weeks: generateWeeks(count, busy),
  });
}
