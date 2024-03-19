export interface BisCompany {
  businessId: string
  registrationDate: string
  companyForm?: string
  detailsUri?: string
  URI: string
  name: string
}

export interface YTJRespomse<T> {
  type: 'fi.prh.opendata.bis'
  version: 1
  totalResults: number
  resultsFrom: number
  previousResultsUri: string | null
  nextResultsUri: string | null
  exceptionNoticeUri: string | null
  results: T[]
}

export interface BisCompanyDetails {
  names: BisCompanyName[]
  auxiliaryNames?: BisCompanyName[]
  addresses?: BisAddress[]
  companyForms?: BisCompanyForm[]
  liquidations?: BisCompanyLiquidation[]
  businessLines?: BisCompanyBusinessLine[]
  languages?: BisCompanyLanguage[]
  registeredOffices?: BisCompanyRegisteredOffice[]
  contactDetails?: BisCompanyContactDetail[]
  registeredEntries?: BisCompanyRegisteredEntry[]
  businessId: string
  registrationDate: string
  companyForm?: string
  detailsUri?: string
  name: string
}

export interface BisCompanyName {
  source?: number
  order: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
}

export interface BisAddress {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  careOf?: string
  street?: string
  postCode?: string
  city?: string
  language?: string
  type: number
  country?: string
}

export interface BisCompanyForm {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
  type: string
}

export interface BisCompanyLiquidation {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
  type: string
}

export interface BisCompanyBusinessLine {
  source?: number
  order: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
}

export interface BisCompanyLanguage {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
}

export interface BisCompanyRegisteredOffice {
  source?: number
  order: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
}

export interface BisCompanyContactDetail {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  language?: string
  value: string
  type: string
}

export interface BisCompanyRegisteredEntry {
  description: string
  status: number
  registrationDate: string
  endDate?: string
  register: number
  language?: string
  authority: number
}

export interface BisCompanyBusinessIdChange {
  source?: number
  description: string
  reason: string
  changeDate?: string
  change: number
  oldBusinessId: string
  newBusinessId: string
  language?: string
}
