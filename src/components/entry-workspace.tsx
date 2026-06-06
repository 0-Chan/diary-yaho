import type { ComponentPropsWithoutRef, ReactNode } from "react";

type EntryWorkspaceProps = {
  children: ReactNode;
  mobileHeader: ReactNode;
  rail: ReactNode;
  size?: "standard" | "wide";
};

type PageHeaderProps = {
  actions?: ReactNode;
  badge?: ReactNode;
  eyebrow?: ReactNode;
  meta?: ReactNode;
  title: ReactNode;
};

type WorkspaceRailPanelProps = PageHeaderProps & {
  children?: ReactNode;
};

const workspaceSizeClassNames = {
  standard: "max-w-5xl",
  wide: "max-w-6xl",
} as const;

export const surfaceCardClassName =
  "rounded-lg border border-line bg-surface p-5 shadow-sm";
export const surfaceLinkCardClassName = `${surfaceCardClassName} transition hover:border-accent`;
export const textLinkClassName = "text-sm font-semibold text-accent-strong";
export const moodPillClassName =
  "inline-flex rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold";
export const primaryActionClassName =
  "inline-flex min-h-10 items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white";
export const secondaryActionClassName =
  "inline-flex min-h-10 items-center justify-center rounded-lg border border-line px-4 py-2 text-sm font-semibold";
export const largePrimaryActionClassName =
  "inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white";
export const largeSecondaryActionClassName =
  "inline-flex min-h-12 items-center justify-center rounded-lg border border-line px-5 py-3 text-sm font-semibold";

function classNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function EntryWorkspace({
  children,
  mobileHeader,
  rail,
  size = "standard",
}: EntryWorkspaceProps) {
  return (
    <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8 lg:px-10 lg:py-8">
      <div
        className={classNames(
          "mx-auto grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-8",
          workspaceSizeClassNames[size],
        )}
      >
        <div className="min-w-0">
          <div className="mb-6 lg:hidden">{mobileHeader}</div>
          {children}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8">{rail}</div>
        </aside>
      </div>
    </main>
  );
}

export function PageHeader({
  actions,
  badge,
  eyebrow,
  meta,
  title,
}: PageHeaderProps) {
  return (
    <header
      className={classNames(
        "border-line border-b pb-5",
        actions
          ? "flex flex-wrap items-center justify-between gap-4"
          : undefined,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-sm font-semibold text-accent-strong">
            {eyebrow}
          </div>
        )}
        {meta && <div className="mt-5 text-sm text-foreground/60">{meta}</div>}
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">{title}</h1>
        {badge && <div className="mt-4">{badge}</div>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}

export function WorkspaceRailPanel({
  actions,
  badge,
  children,
  eyebrow,
  meta,
  title,
}: WorkspaceRailPanelProps) {
  return (
    <section className={surfaceCardClassName}>
      {eyebrow && (
        <div className="text-sm font-semibold text-accent-strong">
          {eyebrow}
        </div>
      )}
      <h1 className="mt-3 text-2xl font-semibold tracking-normal">{title}</h1>
      {meta && <div className="mt-4 text-sm text-foreground/60">{meta}</div>}
      {badge && <div className="mt-4">{badge}</div>}
      {children && <div className="mt-6">{children}</div>}
      {actions && <div className="mt-6 flex flex-col gap-2">{actions}</div>}
    </section>
  );
}

export function SurfaceCard({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={classNames(surfaceCardClassName, className)} {...props} />
  );
}
