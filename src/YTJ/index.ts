import fetch from 'node-fetch'
import queryString from 'query-string'

import { BisCompany, BisCompanyDetails, YTJRespomse } from './interfaces'

export type CompanyForm = 'AOY' | 'OYJ' | 'OY' | 'OK' | 'VOJ'

export class YTJ {
  /**
   *
   * @param {string} businessId Y-tunnus
   * @returns {Promise<YTJRespomse<BisCompanyDetails>>}
   */
  public static async getCompany(
    businessId: string
  ): Promise<YTJRespomse<BisCompanyDetails>> {
    return fetch(`https://avoindata.prh.fi/bis/v1/${businessId}`).then(
      (res) => res.json() as Promise<YTJRespomse<BisCompanyDetails>>
    )
  }

  /**
   *
   * @param {number} maxResults Maksimimäärä tuloksia
   * @param {number} resultsFrom Kuinka monta tulosta skipataan alusta
   * @param {CompanyForm} [companyForm] Filter by company type "AOY" | "OYJ" | "OY" | "OK" | "VOJ" | undefined
   *
   * @returns {Promise<YTJRespomse<BisCompany[]>>}
   */
  public static async searchCompanies(
    maxResults: number,
    resultsFrom: number,
    companyForm?: CompanyForm
  ): Promise<YTJRespomse<BisCompany[]>> {
    if (maxResults > 1000) throw new Error('maxResults too large')

    const query = {
      companyRegistrationFrom: '2017-02-20',
      totalResults: 'true',
      maxResults,
      resultsFrom,
      companyForm,
    }

    return fetch(
      `https://avoindata.prh.fi/bis/v1${queryString.stringify(query)}`
    ).then((res) => res.json() as Promise<YTJRespomse<BisCompany[]>>)
  }
}

export * from './interfaces'
