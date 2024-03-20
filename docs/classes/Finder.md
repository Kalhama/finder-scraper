[finder-scraper](../README.md) / [Exports](../modules.md) / Finder

# Class: Finder

## Table of contents

### Constructors

- [constructor](Finder.md#constructor)

### Methods

- [getCompany](Finder.md#getcompany)
- [searchCompanies](Finder.md#searchcompanies)

## Constructors

### constructor

• **new Finder**(): [`Finder`](Finder.md)

#### Returns

[`Finder`](Finder.md)

## Methods

### getCompany

▸ **getCompany**(`path`): `Promise`\<[`FinderCompany`](../modules.md#findercompany)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | URL without base. ex. `/Televiestint%C3%A4+televiestint%C3%A4palvelut/Nokia+Oyj/Espoo/yhteystiedot/159843` |

#### Returns

`Promise`\<[`FinderCompany`](../modules.md#findercompany)\>

#### Defined in

[Finder/index.ts:74](https://github.com/launde/finder-scraper/blob/4aa87da/src/Finder/index.ts#L74)

___

### searchCompanies

▸ **searchCompanies**(`baseURL`, `page`): `Promise`\<`string`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL` | `string` | URL with what query param ex. https://www.finder.fi/search?what=IT-palvelut+Espoo |
| `page` | `number` | page number of results |

#### Returns

`Promise`\<`string`[]\>

company paths's. ex. `["/Televiestint%C3%A4+televiestint%C3%A4palvelut/Nokia+Oyj/Espoo/yhteystiedot/159843"]`

#### Defined in

[Finder/index.ts:28](https://github.com/launde/finder-scraper/blob/4aa87da/src/Finder/index.ts#L28)
