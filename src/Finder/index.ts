import axios from 'axios'
import * as cheerio from 'cheerio'

export type FinderCompany = {
  name: string
  companyType: string
  location: string
  companyid: string
  address: string
  mail: string
  site: string
  financialData: {
    yearEnd: string[]
    revenue: string[]
    employees: string[]
    operatingProfit: string[]
    shareholdersEquity: string[]
  }
}

export class Finder {
  /**
   *
   * @param {string} baseURL - URL with what query param ex. https://www.finder.fi/search?what=IT-palvelut+Espoo
   * @param {number} page - page number of results
   * @returns {Promise<string[]>} company paths's. ex. `["/Televiestint%C3%A4+televiestint%C3%A4palvelut/Nokia+Oyj/Espoo/yhteystiedot/159843"]`
   */
  public static async searchCompanies(
    baseURL: string,
    page: number
  ): Promise<string[]> {
    const url = `${baseURL}&page=${page}`
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      DNT: '1',
      Connection: 'keep-alive',
      Cookie:
        'session=s%3APPC-IsHQADUivTp9UkEg9-Y1LH6wkqw7.Q%2FRstJwXD3ezFHTCI1m%2F9wDZgvEr8hVRDfFIW9mmWBo',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
    }

    const data = await axios
      .get(url, {
        headers,
      })
      .then((res) => res.data)

    // parse pages
    const $ = cheerio.load(data)
    const linksOnPage = $('.SearchResult__ProfileLink')
      .map(function () {
        const href = $(this).attr('href')
        return href
      })
      .toArray()

    return linksOnPage
  }

  /**
   *
   * @param {string} path - URL without base. ex. `/Televiestint%C3%A4+televiestint%C3%A4palvelut/Nokia+Oyj/Espoo/yhteystiedot/159843`
   * @returns {GetCompanyReturn}
   */
  public static async getCompany(path: string): Promise<FinderCompany> {
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      DNT: '1',
      Connection: 'keep-alive',
      Cookie:
        'session=s%3APPC-IsHQADUivTp9UkEg9-Y1LH6wkqw7.Q%2FRstJwXD3ezFHTCI1m%2F9wDZgvEr8hVRDfFIW9mmWBo',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
    }

    const url = `https://www.finder.fi${path}`
    const html = await axios.get(url, { headers }).then((res) => res.data)

    const $ = cheerio.load(html)
    const name = $('.Profile__Name').text()

    const companyid = $('.CopyButton').parent().text().split(' ')[2]

    const address = $('.SearchResult__Link, .listing-street-address').text()

    const mail = $('.listing-email').text()

    const site = $('.listing-website-url').text()

    const yearEnd = $('.Financials__Table thead th')
      .map((_, el) => $(el).text())
      .toArray()
      .slice(1)

    const financialDataByKey = (key: string) => {
      return $('.Financials__Table tbody th')
        .filter((_, el) => $(el).text() === key)
        .parent()
        .find('td')
        .map((_, el) => $(el).text())
        .toArray()
    }

    const financialData = {
      yearEnd,
      revenue: financialDataByKey('Liikevaihto (tuhatta euroa)'),
      employees: financialDataByKey('Henkilöstö'),
      operatingProfit: financialDataByKey('Liiketulos (tuhatta euroa)'),
      shareholdersEquity: financialDataByKey(
        'Oma pääoma yhteensä (tuhatta euroa)'
      ),
    }

    const getCompanyData = (key: string) => {
      return $('.ServerOnly dt')
        .filter((_, el) => $(el).text() === key)
        .next()
        .text()
        .replace('Lähde: YTJ', '')
    }

    const companyType = getCompanyData('Yhtiömuoto')

    const location = getCompanyData('Kotipaikka')

    return {
      name,
      companyType,
      location,
      companyid,
      address,
      mail,
      site,
      financialData,
    }
  }
}
