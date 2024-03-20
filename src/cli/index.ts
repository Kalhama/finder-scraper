import { program } from 'commander'
import * as fs from 'fs'
import * as Papa from 'papaparse'

import { Finder, FinderCompany } from '../Finder/index.js'
import { YTJ, YTJCompanyDetails } from '../YTJ/index.js'

const delay = async (time = 5000) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}

const flattenCompanyData = (
  finderdata: FinderCompany,
  ytjdata: YTJCompanyDetails
) => {
  const latestFinancials = {
    yearEnd: finderdata.financialData.yearEnd.slice(-1)[0],
    revenue: finderdata.financialData.revenue.slice(-1)[0],
    employees: finderdata.financialData.employees.slice(-1)[0],
    operatingProfit: finderdata.financialData.operatingProfit.slice(-1)[0],
    shareholdersEquity:
      finderdata.financialData.shareholdersEquity.slice(-1)[0],
  }

  const flattenCompanyData = {
    ...finderdata,
    financialData: '',
    ...latestFinancials,
    ytjemail: new Buffer(
      ytjdata?.contactDetails?.find((d) => d.type === 'email')?.value || '',
      'base64'
    ).toString('utf8'),
    ytjphone: new Buffer(
      ytjdata?.contactDetails?.find((d) => d.type === 'telephone')?.value ||
        ytjdata?.contactDetails?.find((d) => d.type === 'mobilePhone')?.value ||
        '',
      'base64'
    ).toString('utf8'),
  }

  return flattenCompanyData
}

program
  .arguments('<url>')
  .arguments('<output>')
  .action(async (url: string, output: string) => {
    let companiesInPage: string[] = []
    let page = 1
    let companies: Array<ReturnType<typeof flattenCompanyData>> = []
    do {
      companiesInPage = await Finder.searchCompanies(url, page)
      await delay(5000)
      page++

      for (const company of companiesInPage) {
        const finderData = await Finder.getCompany(company)
        const { results: YTJData } = await YTJ.getCompany(finderData.companyid)
        const flatCompanyData = flattenCompanyData(finderData, YTJData)
        companies.push(flatCompanyData)
      }
    } while (companiesInPage.length !== 0)

    const csv = Papa.unparse(companies)
    fs.writeFileSync('companies.csv', csv)
    process.exit()
  })

program.parse(process.argv)
