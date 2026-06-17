import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageShellProps = ComponentPropsWithoutRef<"div"> & {
  size?: "wide" | "readable";
};

const pageShellSizes = {
  wide: "max-w-6xl",
  readable: "max-w-3xl",
};

export function PageShell({
  size = "wide",
  className,
  children,
  ...props
}: PageShellProps) {
  return (
    <div
      className={cn("container mx-auto px-4 pt-20 pb-16", pageShellSizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

type PageHeaderProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("mb-10", className)} {...props}>
      {eyebrow && <div className="mb-4">{eyebrow}</div>}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {description && <p className="text-muted-foreground max-w-2xl">{description}</p>}
      {children}
    </div>
  );
}

type SectionHeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h2" | "h3";
};

export function SectionHeading({
  as: Component = "h2",
  className,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <Component
      className={cn("text-xs font-semibold text-muted-foreground uppercase tracking-widest", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Card({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("rounded-xl border border-border bg-white shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}

type PillVariant = "neutral" | "primary" | "blue";

type PillProps = ComponentPropsWithoutRef<"span"> & {
  variant?: PillVariant;
};

const pillVariants: Record<PillVariant, string> = {
  neutral: "bg-secondary text-muted-foreground",
  primary: "bg-primary text-white",
  blue: "bg-blue-50 text-blue-700 border border-blue-200",
};

export function Pill({ variant = "neutral", className, children, ...props }: PillProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", pillVariants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "border border-border text-gray-700 hover:bg-gray-50",
  ghost: "text-primary hover:underline px-0 py-0 rounded-none",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
    buttonVariants[variant],
    className
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}
