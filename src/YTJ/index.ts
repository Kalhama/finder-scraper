import fetch from 'node-fetch'
import queryString from 'query-string'

import { BisCompany, BisCompanyDetails, YTJRespomse } from './interfaces'

type CompanyForm = 'AOY' | 'OYJ' | 'OY' | 'OK' | 'VOJ'

export class YTJ {
  public static async getCompany(businessId: string) {
    fetch(`https://avoindata.prh.fi/bis/v1/${businessId}`).then(
      (res) => res.json() as Promise<YTJRespomse<BisCompanyDetails>>
    )
  }

  public static async searchCompanies(
    maxResults: number,
    resultsFrom: number,
    companyForm?: CompanyForm
  ) {
    if (maxResults > 1000) throw new Error('maxResults too large')

    const query = {
      companyRegistrationFrom: '2017-02-20',
      totalResults: 'true',
      maxResults,
      resultsFrom,
      companyForm,
    }

    fetch(
      `https://avoindata.prh.fi/bis/v1${queryString.stringify(query)}`
    ).then((res) => res.json() as Promise<YTJRespomse<BisCompany[]>>)
  }
}

export * from './interfaces'
