"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return <SignalField className={className} />;
}
