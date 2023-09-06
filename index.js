import axios from 'axios'
import * as cheerio from 'cheerio'

const fetchCompanyLinksFromSearchList = async (baseURL) => {
    const links = []

    let i = 1;
    while (true) {
        console.log(`Fetching page ${i}`)

        const url = `${baseURL}&page=${i}`
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0' ,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Cookie': 'session=s%3APPC-IsHQADUivTp9UkEg9-Y1LH6wkqw7.Q%2FRstJwXD3ezFHTCI1m%2F9wDZgvEr8hVRDfFIW9mmWBo',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
        }
        
        const data = await axios.get(url, {
            headers
        })
            .then(res => res.data)
            
        // parse pages
        const $ = cheerio.load(data);
        const linksOnPage = $('.SearchResult__ProfileLink').map(function () {
            const href = $(this).attr('href');
            return href
        }).toArray()

        if (linksOnPage.length === 0) {
            break
        }

        links.push(...linksOnPage)

        i++
    }

    return links
}

const fetchCompanyPage = async (path) => {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0' ,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Cookie': 'session=s%3APPC-IsHQADUivTp9UkEg9-Y1LH6wkqw7.Q%2FRstJwXD3ezFHTCI1m%2F9wDZgvEr8hVRDfFIW9mmWBo',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
    }
    
    const url = `https://www.finder.fi${path}`
    const html = await axios.get(url, { headers })
        .then(res => res.data)


    const $ = cheerio.load(html)
    const name = $('.Profile__Name').text()

    const companyid = $('.CopyButton').parent().text().split(" ")[2]

    const address = $('.SearchResult__Link, .listing-street-address').text()

    const mail = $('.listing-email').text()

    const site = $('.listing-website-url').text()

    const yearEnd = $('.Financials__Table thead th').map((_, el) => $(el).text()).toArray().slice(1)

    const financialDataByKey = (key) => {
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
        shareholdersEquity: financialDataByKey('Oma pääoma yhteensä (tuhatta euroa)'),
    }

    const getCompanyData = (key) => {
        return $('.ServerOnly dt').filter((_, el) => $(el).text() === key).next().text().replace('Lähde: YTJ', '')
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
        financialData
    }
}

const flattenCompanyData = (companyData) => {
    Object.keys(companyData.financialData).forEach(key => {
        companyData.financialData[key] = companyData.financialData[key].slice(-1)[0] // get last element of arr
    });
    const flattenCompanyData = {
        ...companyData,
        ...companyData.financialData,
        financialData: undefined
    }

    Object.entries(flattenCompanyData).map(([i, el]) => {
        if (el === undefined | el === null) {
            delete flattenCompanyData[i]
        }
    })

    return flattenCompanyData
}

const app = async () => {
    const links = await fetchCompanyLinksFromSearchList('https://www.finder.fi/search?what=kirkkonummi%20rakennusliike')

    for (const link of links) {
        const companyData = await fetchCompanyPage(link)
        console.log(companyData);
        console.log(flattenCompanyData(companyData));
    }
    
    // const companyData = await fetchCompanyPage('/Kivet+kivimateriaalit+ja+kiviasennukset/Ylivieskan+Kivihiomo+Oy/Ylivieska/yhteystiedot/422050')

}

app()