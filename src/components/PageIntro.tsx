import { Container } from "@/components/ui/Container";
import { clsx } from "@/lib/clsx";

// Compact inner-page header. Top padding clears the sticky nav without
// floating the content halfway down (skill Section 4.7 hero padding cap).
export function PageIntro({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Container className={clsx("pt-16 sm:pt-20", className)}>
      <h1 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          {subtitle}
        </p>
      ) : null}
    </Container>
  );
}
