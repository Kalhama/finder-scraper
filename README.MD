# finder-scraper

## Documentation

[Documentation](/docs/modules.md)

## Käyttö osana koodia

`pnpm add finder-scraper`

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
