[finder-scraper](README.md) / Exports

# finder-scraper

## Table of contents

### Classes

- [Finder](classes/Finder.md)
- [YTJ](classes/YTJ.md)

### Interfaces

- [YTJAddress](interfaces/YTJAddress.md)
- [YTJCompany](interfaces/YTJCompany.md)
- [YTJCompanyBusinessIdChange](interfaces/YTJCompanyBusinessIdChange.md)
- [YTJCompanyBusinessLine](interfaces/YTJCompanyBusinessLine.md)
- [YTJCompanyContactDetail](interfaces/YTJCompanyContactDetail.md)
- [YTJCompanyDetails](interfaces/YTJCompanyDetails.md)
- [YTJCompanyForm](interfaces/YTJCompanyForm.md)
- [YTJCompanyLanguage](interfaces/YTJCompanyLanguage.md)
- [YTJCompanyLiquidation](interfaces/YTJCompanyLiquidation.md)
- [YTJCompanyName](interfaces/YTJCompanyName.md)
- [YTJCompanyRegisteredEntry](interfaces/YTJCompanyRegisteredEntry.md)
- [YTJCompanyRegisteredOffice](interfaces/YTJCompanyRegisteredOffice.md)
- [YTJRespomse](interfaces/YTJRespomse.md)

### Type Aliases

- [CompanyForm](modules.md#companyform)
- [FinderCompany](modules.md#findercompany)

## Type Aliases

### CompanyForm

Ƭ **CompanyForm**: ``"AOY"`` \| ``"OYJ"`` \| ``"OY"`` \| ``"OK"`` \| ``"VOJ"``

#### Defined in

[YTJ/index.ts:6](https://github.com/launde/finder-scraper/blob/4aa87da/src/YTJ/index.ts#L6)

___

### FinderCompany

Ƭ **FinderCompany**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `companyType` | `string` |
| `companyid` | `string` |
| `financialData` | \{ `employees`: `string`[] ; `operatingProfit`: `string`[] ; `revenue`: `string`[] ; `shareholdersEquity`: `string`[] ; `yearEnd`: `string`[]  } |
| `financialData.employees` | `string`[] |
| `financialData.operatingProfit` | `string`[] |
| `financialData.revenue` | `string`[] |
| `financialData.shareholdersEquity` | `string`[] |
| `financialData.yearEnd` | `string`[] |
| `location` | `string` |
| `mail` | `string` |
| `name` | `string` |
| `site` | `string` |

#### Defined in

[Finder/index.ts:4](https://github.com/launde/finder-scraper/blob/4aa87da/src/Finder/index.ts#L4)
