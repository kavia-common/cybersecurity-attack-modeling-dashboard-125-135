import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "build/",
      "dist/",
      "*.log",
      "*.tmp",
      "*.tsbuildinfo",
      "coverage/",
      ".vscode/",
      ".idea/",
      "*.config.mjs",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        JSX: "readonly", // silence 'JSX is not defined' for new JSX runtime
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Allow unused vars when prefixed with underscore (for typed React props etc.)
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-undef": "off"
    },
  },
];
