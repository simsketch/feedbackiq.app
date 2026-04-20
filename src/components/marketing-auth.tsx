"use client";

import { useEffect, useState } from "react";

const APP_ORIGIN = "https://app.feedbackiq.app";
const DASHBOARD_URL = `${APP_ORIGIN}/dashboard`;

export function useRemoteAuth(): boolean | null {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${APP_ORIGIN}/api/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        setSignedIn(data?.signedIn === true);
      })
      .catch(() => {
        if (!cancelled) setSignedIn(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return signedIn;
}

export function NavAuthLinks() {
  const signedIn = useRemoteAuth();

  if (signedIn) {
    return (
      <a
        href={DASHBOARD_URL}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:bg-zinc-200"
      >
        Dashboard
      </a>
    );
  }

  return (
    <>
      <a
        href={`${APP_ORIGIN}/login`}
        className="text-sm text-zinc-400 transition-colors hover:text-white"
      >
        Log in
      </a>
      <a
        href={`${APP_ORIGIN}/signup`}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:bg-zinc-200"
      >
        Get started
      </a>
    </>
  );
}

interface CtaProps {
  signedOutLabel: string;
  signedInLabel: string;
  className: string;
  children?: React.ReactNode;
}

export function AuthAwareCta({
  signedOutLabel,
  signedInLabel,
  className,
  children,
}: CtaProps) {
  const signedIn = useRemoteAuth();
  const href = signedIn ? DASHBOARD_URL : `${APP_ORIGIN}/signup`;
  const label = signedIn ? signedInLabel : signedOutLabel;

  return (
    <a href={href} className={className}>
      {label}
      {children}
    </a>
  );
}
