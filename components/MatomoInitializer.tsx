"use client";

import dynamic from 'next/dynamic';

const DynamicMatomoTracker = dynamic(() => import('../providers/MatomoTracker').then((mod) => mod.MatomoTracker), {
  ssr: false,
});

export default function MatomoInitializer() {
  return <DynamicMatomoTracker />;
}