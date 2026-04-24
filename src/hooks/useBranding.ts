// ============================================
// Dynamic Branding Hook - Firebase से सभी नहींम/लोगो लोड
// ============================================
import { useState, useEffect } from "react";
import { db, ref, onValue } from "@/lib/firebase";

export interface BrandingConfig {
  siteName: string;
  siteDescription: string;
  siteTagline: string;
  loginTitle: string;
  loginSubtitle: string;
  premiumTitle: string;
  footerText: string;
  footerCopyright: string;
  splashText: string;
  adminTitle: string;
  aboutTitle: string;
  logoUrl: string;           // Default logo (header, splash, etc.)
  playerLogoUrl: string;     // Video player loading logo
  playerName: string;        // Video player title (e.g. "NEXTGEN CINEMA PLAYER")
  rsCardLabel: string;       // NC source card label
  anCardLabel: string;       // AnimeSalt source card label
}

const DEFAULT_BRANDING: BrandingConfig = {
  siteName: "NX CINEMA",
  siteDescription: "Your ultimate destination for watching anime series and movies.",
  siteTagline: "Premium Movie Streaming",
  loginTitle: "NX CINEMA",
  loginSubtitle: "Premium Movie Streaming",
  premiumTitle: "NEXTGEN CINEMA Premium",
  footerText: "Unlimited Series & Movies",
  footerCopyright: "© 2026 NEXTGEN CINEMA. All rights reserved.",
  splashText: "NEXTGEN CINEMA",
  adminTitle: "NEXTGEN CINEMA Admin",
  aboutTitle: "About NEXTGEN CINEMA",
  logoUrl: "https://i.ibb.co.com/bMHP7RCr/IMG-20260413-234007-784.jpg",
  playerLogoUrl: "https://i.ibb.co.com/bMHP7RCr/IMG-20260413-234007-784.jpg",
  playerName: "NEXTGEN CINEMA PLAYER",
  rsCardLabel: "NC",
  anCardLabel: "AN",
};

let cachedBranding: BrandingConfig | null = null;
const listeners = new Set<(b: BrandingConfig) => void>();

// Initialize listener once
let initialized = false;
function initBrandingListener() {
  if (initialized) return;
  initialized = true;
  onValue(ref(db, "settings/branding"), (snap) => {
    const val = snap.val();
    cachedBranding = val ? { ...DEFAULT_BRANDING, ...val } : { ...DEFAULT_BRANDING };
    listeners.forEach(fn => fn(cachedBranding!));
  });
}

export function useBranding(): BrandingConfig {
  const [branding, setBranding] = useState<BrandingConfig>(cachedBranding || DEFAULT_BRANDING);

  useEffect(() => {
    initBrandingListener();
    if (cachedBranding) setBranding(cachedBranding);
    
    const listener = (b: BrandingConfig) => setBranding(b);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  return branding;
}

export function getBrandingSync(): BrandingConfig {
  return cachedBranding || DEFAULT_BRANDING;
}

export { DEFAULT_BRANDING };
