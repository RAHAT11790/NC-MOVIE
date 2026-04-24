// ============================================
// NEXTGEN CINEMA - Centralized Site Configuration
// ============================================
// सभी हार्डकोडेड वैल्यू यहां env से आता है।
// .env.example देखोमें सभी वैल्यू सेट करें।

// --- Branding ---
export const SITE_NAME = import.meta.env.VITE_SITE_NAME || "NEXTGEN CINEMA";
export const SITE_DESCRIPTION = import.meta.env.VITE_SITE_DESCRIPTION || "Your ultimate destination for watching series and movies.";
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://nc-cinemas.vercel.app";
export const SITE_ICON_URL = import.meta.env.VITE_SITE_ICON_URL || "https://i.ibb.co.com/bMHP7RCr/IMG-20260413-234007-784.jpg";

// --- Telegram ---
export const TELEGRAM_CHANNEL = import.meta.env.VITE_TELEGRAM_CHANNEL || "@NEXTGEN_MODS99";
export const TELEGRAM_CHANNEL_URL = import.meta.env.VITE_TELEGRAM_CHANNEL_URL || "https://t.me/NEXTGEN_MODS99";
export const TELEGRAM_ADMIN_URL = import.meta.env.VITE_TELEGRAM_ADMIN_URL || "https://t.me/NEXTGEN_CINEMA";

// --- TMDB ---
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || "37f4b185e3dc487e4fd3e56e2fab2307";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/";

// --- Cloudflare CDN ---
export const CLOUDFLARE_CDN_URL = import.meta.env.VITE_CLOUDFLARE_CDN_URL || "";

// --- Supabase (auto-set, don't change) ---
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// --- Firebase (auto-set from env) ---
export const FIREBASE_VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || "BJVFgSOS28YpREzcKpsI81HM7h2mb_SuCAGAI__VoxJcNnS5k1Bs2CH_qkHUK1WS7mm09nWp73Jz8fT26qB9Brg";

// --- FCM ---
export const FCM_ENDPOINT = `${CLOUDFLARE_CDN_URL}/send-fcm`;
