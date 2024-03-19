finder-scraper / [Exports](modules.md)

# finder-scraper

## Documentation

[Documentation](/docs/modules.md)

## Käyttö osana koodia

1. `git clone https://github.com/Kalhama/finder-scraper`
2. cd `finder-scraper`
3. `pnpm install && pnpm build`
4. `cd ../toinen-projekti`
5. `pnpm add ../finder-scraper`
6. `touch index.ts`
7. Lisää tiedostoon index.js alla oleva koodi

```typescript
import { Finder, YTJ } from 'finder-scraper'

// Use methods
await Finder.searchCompanies(
  'https://www.finder.fi/search?what=IT-palvelut+Espoo',
  1
)
await Finder.getCompany(
  '/Televiestint%C3%A4+televiestint%C3%A4palvelut/Nokia+Oyj/Espoo/yhteystiedot/159843'
)
await YTJ.searchCompanies(500, 10, 'OYJ')
await YTJ.getCompany('0112038-9')
```
