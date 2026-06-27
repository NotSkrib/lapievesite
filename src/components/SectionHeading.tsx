import { clsx } from "@/lib/clsx";

// Section header: serif title + optional muted subtitle, stacked vertically
// (skill Section 4.7 Split-Header ban). No decorative eyebrows by default.
export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
