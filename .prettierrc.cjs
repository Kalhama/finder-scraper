module.exports = {
  printWidth: 80,
  trailingComma: 'es5',
  useTabs: false,
  singleQuote: true,
  semi: false,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}