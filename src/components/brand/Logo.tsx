import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-soft",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="10.5" cy="10.5" r="6.2" className="text-primary-foreground" stroke="currentColor" opacity="0.95" />
        <path d="M15.2 15.2 21 21" className="text-primary-foreground" stroke="currentColor" strokeLinecap="round" />
        <path
          d="M10.5 6.6l1.1 2.6 2.6 1.1-2.6 1.1-1.1 2.6-1.1-2.6L6.8 10.3l2.6-1.1z"
          fill="currentColor"
          className="text-primary-foreground"
          stroke="none"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  showTagline = false,
  invert = false,
}: {
  className?: string;
  showTagline?: boolean;
  invert?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[15px] font-semibold tracking-tight",
            invert ? "text-sidebar-foreground" : "text-foreground",
          )}
        >
          HackSort <span className="text-primary-glow">AI</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1 text-[11px] font-medium",
              invert ? "text-sidebar-foreground/60" : "text-muted-foreground",
            )}
          >
            See beyond the submission.
          </span>
        ) : null}
      </span>
    </span>
  );
}
