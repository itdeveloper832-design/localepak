import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment123456789",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "app-local.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "app-local",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "app-local.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:dummy000000000000"
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

/**
 * True when no real Firebase project is configured: local builds
 * without .env.local fall back to the "app-local" dummy project.
 * Server-side listing reads short-circuit to empty in that case —
 * the Firestore SDK otherwise retries its Listen stream against a
 * project that will never answer, and a single static page can
 * hang past Next's 60s generation timeout (proven 2026-10-27:
 * the tiers build died on /city/mardan/finance after 3 attempts).
 * Production (Vercel) always sets NEXT_PUBLIC_FIREBASE_PROJECT_ID,
 * so live behavior is unchanged — and the short-circuit returns
 * exactly what the failing read's catch block returned anyway.
 */
export const isDummyFirebase = firebaseConfig.projectId === 'app-local'

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export default app
