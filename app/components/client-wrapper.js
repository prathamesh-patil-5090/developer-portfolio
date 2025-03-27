"use client";

import { useEffect, useState } from "react";

export default function ClientWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading state if preferred
  }

  return <>{children}</>;
}
