# finder-scraper

Työkalu yritystietojen hakuun Finderistä ja YTJ:n avoimesta rajapinnasta

## CLI

`npx finder-scraper <FINDER_SEARCH_URL> <output.csv>`

Esimerkiksi:
`npx finder-scraper https://www.finder.fi/search?what=IT-palvelut it-palvelut.csv`

## Käyttö osana koodia

`npm install finder-scraper`

```typescript
import { Finder, YTJ } from 'finder-scraper'

// Use methods
const page = 1
await Finder.searchCompanies(
  'https://www.finder.fi/search?what=IT-palvelut+Espoo',
  page
)
await Finder.getCompany(
  '/Televiestint%C3%A4+televiestint%C3%A4palvelut/Nokia+Oyj/Espoo/yhteystiedot/159843'
)
const skip = 500
const limit = 10
await YTJ.searchCompanies(skip, limit, 'OYJ')

const companyId = '0112038-9' // Y-tunnus
await YTJ.getCompany(companyId)
```

### Lue myös: [Yksityiskohtaisempi dokumentaatio](/docs/modules.md)
