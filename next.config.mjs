import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Projektwurzel explizit setzen: sonst findet Next die package-lock.json
  // im Home-Verzeichnis und leitet daraus eine falsche Wurzel ab.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
};

export default nextConfig;
