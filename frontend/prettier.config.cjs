module.exports = {
  useTabs: false,
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
  arrowParens: 'avoid',
  printWidth: 100,

  svelteStrictMode: true,
  svelteIndentScriptAndStyle: false,
  svelteSortOrder: 'markup-scripts-styles',

  tailwindConfig: './tailwind.config.cjs',
  plugins: [require('prettier-plugin-tailwindcss')],
  overrides: [
    {
      files: '*.svelte',
      options: { parser: 'svelte' },
    },
  ],
}
