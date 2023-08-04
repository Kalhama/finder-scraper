import axios from 'axios'
import * as cheerio from 'cheerio'

const fetchLinksFromPage = async (baseURL) => {
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

const fetchEmailFromPage = async (path) => {
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
    const html = await axios.get(url, {
        headers
    })
        .then(res => res.data)


    const $ = cheerio.load(html)
    const mail = $('.listing-email').attr('href')
    console.log(mail);
        
    return mail
}

const app = async () => {
    const links = await fetchLinksFromPage('https://www.finder.fi/search?what=kirkkonummi%20rakennusliike')

    for (const link of links) {
        console.log(link);
        const email = await fetchEmailFromPage(link)
        console.log(email);
    }
    
}

app()