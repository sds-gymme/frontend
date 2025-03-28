import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASEURL || "https://xnjquyseausfrxytquvs.supabase.co";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASEANONKEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuanF1eXNlYXVzZnJ4eXRxdXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNzMxMjgsImV4cCI6MjA0ODY0OTEyOH0.XnTGwQ6vdZUwkosX_COz-Gxrfd9vnpSBWx1gEug4QcI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
