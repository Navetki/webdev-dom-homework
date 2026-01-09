import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import config from "eslint-config-prettier";
import config from "eslint-plugin-prettier/recommended";
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    config,
    plugin,
  },
]);
