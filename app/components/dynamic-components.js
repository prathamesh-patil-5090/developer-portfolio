"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LoadingFallback from "./loading-fallback";

// Dynamically import components with SSR disabled
const HeroSection = dynamic(
  () => import("./homepage/hero-section"),
  { ssr: false, loading: () => <LoadingFallback /> }
);

export function DynamicHeroSection() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) return <LoadingFallback />;
  
  return <HeroSection />;
}

export function DynamicBlog({ blogs }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) return <LoadingFallback />;
  
  return <Blog blogs={blogs} />;
}
