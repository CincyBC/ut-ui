/**
 * Shared ESLint flat config for @uraniumtech/ui consumers.
 * Usage in a consumer's eslint.config.mjs:
 *   import utui from "@uraniumtech/ui/eslint";
 *   export default [...utui];
 * Complements scripts/check-brand.sh (which also covers .astro files).
 */
import tseslint from "typescript-eslint";

export default [
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    ignores: ["**/node_modules/**", "**/dist/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='table']",
          message: "Raw <table> is banned — use DataTable from @uraniumtech/ui (see node_modules/@uraniumtech/ui/llms.txt).",
        },
        {
          selector: "JSXOpeningElement[name.name='svg']",
          message: "Hand-rolled SVG charts are banned — use LineChart/BarChart from @uraniumtech/ui, or add a chart to ut-ui.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "d3",
              message: "d3 is only used inside @uraniumtech/ui. Use LineChart/BarChart, or extend ut-ui.",
            },
          ],
          patterns: [
            {
              group: ["d3-*"],
              message: "d3 is only used inside @uraniumtech/ui. Use LineChart/BarChart, or extend ut-ui.",
            },
          ],
        },
      ],
    },
  },
];
