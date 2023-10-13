import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_SUPPORT_EMAIL: z.string().min(1),
    NEXT_PUBLIC_SUPPORT_WHATSAPP: z.string().min(1),
    NEXT_PUBLIC_SUPPORT_EMAIL_LINK: z.string().min(1),
    NEXT_PUBLIC_SUPPORT_WHATSAPP_LINK: z.string().min(1),
    NEXT_PUBLIC_AUTH_URL: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_MARKET_URL: z.string().min(1),
    NEXT_PUBLIC_VCG_STORE_URL: z.string().min(1),
    NEXT_PUBLIC_API_MOCKING: z.string().optional(),
    NEXT_PUBLIC_WS_URL: z.string().min(1),
    NEXT_PUBLIC_CREATE_NETCORE: z.string().min(1),
    NEXT_PUBLIC_REGISTER_NETCORE: z.string().min(1),
    NEXT_PUBLIC_API_DOCS_URL: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_VAPID_KEY: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    NEXT_PUBLIC_SUPPORT_WHATSAPP: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP,
    NEXT_PUBLIC_SUPPORT_EMAIL_LINK: process.env.NEXT_PUBLIC_SUPPORT_EMAIL_LINK,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_SUPPORT_WHATSAPP_LINK:
      process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_LINK,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_MARKET_URL: process.env.NEXT_PUBLIC_MARKET_URL,
    NEXT_PUBLIC_VCG_STORE_URL: process.env.NEXT_PUBLIC_VCG_STORE_URL,
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_CREATE_NETCORE: process.env.NEXT_PUBLIC_CREATE_NETCORE,
    NEXT_PUBLIC_REGISTER_NETCORE: process.env.NEXT_PUBLIC_REGISTER_NETCORE,
    NEXT_PUBLIC_API_DOCS_URL: process.env.NEXT_PUBLIC_API_DOCS_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_FIREBASE_VAPID_KEY: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
