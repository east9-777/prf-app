const appJson = require("./app.json");

process.env.EXPO_PUBLIC_FIREBASE_API_KEY =
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY ||
  "AIzaSyC_Qps4xFmkLAMWob4PIAZN3-BCa4r8CKc";
process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN =
  process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  "project-prf.firebaseapp.com";
process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID =
  process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "project-prf";
process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET =
  process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  "project-prf.firebasestorage.app";
process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID =
  process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "306782378347";
process.env.EXPO_PUBLIC_FIREBASE_APP_ID =
  process.env.EXPO_PUBLIC_FIREBASE_APP_ID ||
  "1:306782378347:web:08f5c82e698469af59542e";
process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
  "306782378347-s0j6m3c2nvg7lamh1ap3lpfdentbbb8h.apps.googleusercontent.com";
process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ||
  "306782378347-7e1jim9fi1g63ctq8r8f6bq054n4kamm.apps.googleusercontent.com";
module.exports = {
  ...appJson,
  expo: {
    ...appJson.expo,
    plugins: appJson.expo.plugins || [],
  },
};
