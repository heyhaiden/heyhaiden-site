"use client";

import dynamic from "next/dynamic";

const SignalField = dynamic(
  () => import("@/components/signal-field").then((mod) => mod.SignalField),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" aria-hidden />,
  }
);

type SignalFieldLazyProps = {
  className?: string;
};

export function SignalFieldLazy({ className }: SignalFieldLazyProps) {
  return <SignalField className={className} />;
}
