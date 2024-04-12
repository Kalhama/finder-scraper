import queryString from 'query-string'

import { fetchRetry } from '../utils/fetch-retry.js'
import { YTJCompany, YTJCompanyDetails, YTJRespomse } from './interfaces.js'

export type CompanyForm = 'AOY' | 'OYJ' | 'OY' | 'OK' | 'VOJ'

export class YTJ {
  /**
   *
   * @param {string} businessId Y-tunnus
   * @returns {Promise<YTJRespomse<YTJCompanyDetails>>}
   */
  public static async getCompany(
    businessId: string
  ): Promise<YTJRespomse<YTJCompanyDetails>> {
    return fetchRetry(`https://avoindata.prh.fi/bis/v1/${businessId}`, {
      headers: new Headers({
        Accept: 'application/json',
      }),
    }).then((res: any) => res.json() as Promise<YTJRespomse<YTJCompanyDetails>>)
  }

  /**
   *
   * @param {number} maxResults Maksimimäärä tuloksia
   * @param {number} resultsFrom Kuinka monta tulosta skipataan alusta
   * @param {CompanyForm} [companyForm] Filter by company type "AOY" | "OYJ" | "OY" | "OK" | "VOJ" | undefined
   *
   * @returns {Promise<YTJRespomse<YTJCompany[]>>}
   */
  public static async searchCompanies(
    maxResults: number,
    resultsFrom: number,
    companyForm?: CompanyForm
  ): Promise<YTJRespomse<YTJCompany[]>> {
    if (maxResults > 1000) throw new Error('maxResults too large')

    const query = {
      companyRegistrationFrom: '2017-02-20',
      totalResults: 'true',
      maxResults,
      resultsFrom,
      companyForm,
    }

    return fetchRetry(
      `https://avoindata.prh.fi/YTJ/v1${queryString.stringify(query)}`,
      {
        headers: new Headers({
          Accept: 'application/json',
        }),
      }
    ).then((res) => res.json() as Promise<YTJRespomse<YTJCompany[]>>)
  }
}

export * from './interfaces.js'
