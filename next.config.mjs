/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import i18nConfig from "./next-i18next.config.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.vcgamers.io",
      "cdn.vcg.my.id",
      "cdn.vcg.asia",
      "cdn.vcgamers.com",
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: i18nConfig.i18n,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/seller/toko",
        permanent: true,
      },
    ];
  },
};

export default config;
