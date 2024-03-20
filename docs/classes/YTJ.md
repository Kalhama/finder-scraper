[finder-scraper](../README.md) / [Exports](../modules.md) / YTJ

# Class: YTJ

## Table of contents

### Constructors

- [constructor](YTJ.md#constructor)

### Methods

- [getCompany](YTJ.md#getcompany)
- [searchCompanies](YTJ.md#searchcompanies)

## Constructors

### constructor

• **new YTJ**(): [`YTJ`](YTJ.md)

#### Returns

[`YTJ`](YTJ.md)

## Methods

### getCompany

▸ **getCompany**(`businessId`): `Promise`\<[`YTJRespomse`](../interfaces/YTJRespomse.md)\<[`YTJCompanyDetails`](../interfaces/YTJCompanyDetails.md)\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `businessId` | `string` | Y-tunnus |

#### Returns

`Promise`\<[`YTJRespomse`](../interfaces/YTJRespomse.md)\<[`YTJCompanyDetails`](../interfaces/YTJCompanyDetails.md)\>\>

#### Defined in

[YTJ/index.ts:14](https://github.com/launde/finder-scraper/blob/4aa87da/src/YTJ/index.ts#L14)

___

### searchCompanies

▸ **searchCompanies**(`maxResults`, `resultsFrom`, `companyForm?`): `Promise`\<[`YTJRespomse`](../interfaces/YTJRespomse.md)\<[`YTJCompany`](../interfaces/YTJCompany.md)[]\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxResults` | `number` | Maksimimäärä tuloksia |
| `resultsFrom` | `number` | Kuinka monta tulosta skipataan alusta |
| `companyForm?` | [`CompanyForm`](../modules.md#companyform) | Filter by company type "AOY" \| "OYJ" \| "OY" \| "OK" \| "VOJ" \| undefined |

#### Returns

`Promise`\<[`YTJRespomse`](../interfaces/YTJRespomse.md)\<[`YTJCompany`](../interfaces/YTJCompany.md)[]\>\>

#### Defined in

[YTJ/index.ts:32](https://github.com/launde/finder-scraper/blob/4aa87da/src/YTJ/index.ts#L32)
