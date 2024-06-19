/// <reference types="vite/client" />

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "server",
  i18n: {
    locales: ["en", "es-MX"],
    defaultLocale: "es-MX"
  },
  image: {
    domains: ["http://xsgames.co"]
  },
  adapter: node({
    mode: "standalone"
  })
});