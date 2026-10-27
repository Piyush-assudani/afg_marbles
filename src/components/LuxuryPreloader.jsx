'use client';

export default function LuxuryPreloader() {
  if (typeof window !== 'undefined') {
    window.__AFG_MODEL_LOADED = true;
  }
  return null;
}
