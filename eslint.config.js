import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config([
  // Global ignores
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },

  // Main config
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TypeScript specific
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // General
      "no-console": "warn",
    },
  },
]);
