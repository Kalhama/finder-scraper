export interface YTJCompany {
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
  results: T
}

export interface YTJCompanyDetails {
  names: YTJCompanyName[]
  auxiliaryNames?: YTJCompanyName[]
  addresses?: YTJAddress[]
  companyForms?: YTJCompanyForm[]
  liquidations?: YTJCompanyLiquidation[]
  businessLines?: YTJCompanyBusinessLine[]
  languages?: YTJCompanyLanguage[]
  registeredOffices?: YTJCompanyRegisteredOffice[]
  contactDetails?: YTJCompanyContactDetail[]
  registeredEntries?: YTJCompanyRegisteredEntry[]
  businessId: string
  registrationDate: string
  companyForm?: string
  detailsUri?: string
  name: string
}

export interface YTJCompanyName {
  source?: number
  order: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
}

export interface YTJAddress {
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

export interface YTJCompanyForm {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
  type: string
}

export interface YTJCompanyLiquidation {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
  type: string
}

export interface YTJCompanyBusinessLine {
  source?: number
  order: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
}

export interface YTJCompanyLanguage {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
}

export interface YTJCompanyRegisteredOffice {
  source?: number
  order: number
  version: number
  registrationDate: string
  endDate?: string
  name: string
  language?: string
}

export interface YTJCompanyContactDetail {
  source?: number
  version: number
  registrationDate: string
  endDate?: string
  language?: string
  value: string
  type: string
}

export interface YTJCompanyRegisteredEntry {
  description: string
  status: number
  registrationDate: string
  endDate?: string
  register: number
  language?: string
  authority: number
}

export interface YTJCompanyBusinessIdChange {
  source?: number
  description: string
  reason: string
  changeDate?: string
  change: number
  oldBusinessId: string
  newBusinessId: string
  language?: string
}
