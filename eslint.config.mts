import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

// eslint-config-next exports config arrays, not a factory
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // type-aware rules: no unchecked any/casts/!, no dropped promises
    files: ["src/**/*.{ts,tsx}", "tailwind.config.ts"],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      "no-empty": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-type-assertion": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
