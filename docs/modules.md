[finder-scraper](README.md) / Exports

# finder-scraper

## Table of contents

### Classes

- [Finder](classes/Finder.md)
- [YTJ](classes/YTJ.md)

### Interfaces

- [BisAddress](interfaces/BisAddress.md)
- [BisCompany](interfaces/BisCompany.md)
- [BisCompanyBusinessIdChange](interfaces/BisCompanyBusinessIdChange.md)
- [BisCompanyBusinessLine](interfaces/BisCompanyBusinessLine.md)
- [BisCompanyContactDetail](interfaces/BisCompanyContactDetail.md)
- [BisCompanyDetails](interfaces/BisCompanyDetails.md)
- [BisCompanyForm](interfaces/BisCompanyForm.md)
- [BisCompanyLanguage](interfaces/BisCompanyLanguage.md)
- [BisCompanyLiquidation](interfaces/BisCompanyLiquidation.md)
- [BisCompanyName](interfaces/BisCompanyName.md)
- [BisCompanyRegisteredEntry](interfaces/BisCompanyRegisteredEntry.md)
- [BisCompanyRegisteredOffice](interfaces/BisCompanyRegisteredOffice.md)
- [YTJRespomse](interfaces/YTJRespomse.md)

### Type Aliases

- [CompanyForm](modules.md#companyform)
- [GetCompanyReturn](modules.md#getcompanyreturn)

## Type Aliases

### CompanyForm

Ƭ **CompanyForm**: ``"AOY"`` \| ``"OYJ"`` \| ``"OY"`` \| ``"OK"`` \| ``"VOJ"``

#### Defined in

[YTJ/index.ts:6](https://github.com/launde/finder-scraper/blob/a5244be/src/YTJ/index.ts#L6)

___

### GetCompanyReturn

Ƭ **GetCompanyReturn**: `Promise`\<\{ `address`: `string` ; `companyType`: `string` ; `companyid`: `string` ; `financialData`: \{ `employees`: `string`[] ; `operatingProfit`: `string`[] ; `revenue`: `string`[] ; `shareholdersEquity`: `string`[] ; `yearEnd`: `string`[]  } ; `location`: `string` ; `mail`: `string` ; `name`: `string` ; `site`: `string`  }\>

#### Defined in

[Finder/index.ts:4](https://github.com/launde/finder-scraper/blob/a5244be/src/Finder/index.ts#L4)
