import { Link } from "@/i18n/navigation";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "outline" | "quiet";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[transform,background-color,border-color,color] duration-200 ease-out active:translate-y-px active:scale-[0.99] focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-brand-ink hover:bg-brand/90 shadow-[0_10px_30px_-12px_rgba(47,58,44,0.5)]",
  outline:
    "border border-ink/25 text-ink hover:border-ink/50 hover:bg-surface-2",
  quiet: "text-ink hover:text-accent",
};

const sizes = {
  md: "h-11 px-6 text-[15px]",
  lg: "h-12 px-7 text-base",
} as const;

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = clsx(base, variants[variant], sizes[size], className);
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}
