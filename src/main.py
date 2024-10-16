import requests
from time import sleep
from bs4 import BeautifulSoup
import pandas as pd
from argparse import ArgumentParser


def retry_request(url, method="GET", max_retries=5, **kwargs):
    """
    Makes an HTTP request and retries up to max_retries times if it fails.

    Parameters:
    - url (str): The URL for the request.
    - method (str): The HTTP method (e.g., 'GET', 'POST'). Default is 'GET'.
    - max_retries (int): Maximum number of retries. Default is 5.
    - kwargs: Additional arguments passed to requests.request().

    Returns:
    - Response object if the request is successful.
    - None if all retries fail.
    """
    base_delay = 2

    for attempt in range(max_retries):
        try:
            print(f"Attempt {attempt + 1} of {max_retries}: {url}")
            sleep(base_delay**base_delay)
            response = requests.request(method, url, **kwargs)
            response.raise_for_status()  # Raises an HTTPError for bad responses
            return response
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            if attempt < max_retries - 1:
                print(f"Retrying...")
            else:
                print("All retries failed.")
                return None


def get_company_name(soup):
    """
    Extracts the company name from a BeautifulSoup object.

    Args:
        soup (BeautifulSoup): Parsed HTML content as a BeautifulSoup object.

    Returns:
        str or None: The company name as a string if found, otherwise None.
    """
    company_name_el = soup.select_one(".sisalto > div > div > h1")
    company_name = company_name_el.get_text(strip=True) if company_name_el else None
    return company_name


def get_table_value_element(soup, key):
    """
    Args:
        soup (BeautifulSoup): Parsed HTML content as a BeautifulSoup object.
        key (str): The string key to search for in the table cells.

    Returns:
        Tag or None: The next sibling <td> element containing the value if found, otherwise None.
    """
    td_key = soup.find("td", string=key)

    if td_key is None:
        return None

    # Get the next sibling td
    td_value = td_key.find_next_sibling("td")

    return td_value


def get_financial_year_end(soup):
    """
    Extracts the financial year-end information from BeautifulSoup object.

    The function searches for an <h5> element that starts with the string "Tilikausi"
    and returns the relevant text by removing the prefix and any trailing parentheses.

    Args:
        soup (BeautifulSoup): Parsed HTML content as a BeautifulSoup object.

    Returns:
        str or None: The financial year-end string if found, otherwise None.
    """
    h5_elements = soup.find(
        "h5", string=lambda text: text and text.startswith("Tilikausi")
    )
    return (
        h5_elements.text.replace("Tilikausi ", "").replace(" ()", "")
        if h5_elements is not None
        else None
    )


def parse_to_int(s):
    """
    Converts a string representing a monetary value into a float.

    This function cleans the input string by removing spaces, replacing commas with
    periods, removing the "EUR" currency symbol, and eliminating any "+" signs.
    It then converts the cleaned string to a float.

    Args:
        s (str): The input string representing a monetary value.

    Returns:
        float: The converted float value after cleaning the input string.
    """
    clean_str = (
        s.replace(" ", "").replace(",", ".").replace("EUR", "").replace("+", "").strip()
    )

    return float(clean_str)


def element_to_int(el):
    """
    Converts the text content of a BeautifulSoup element to a float.

    This function checks if the provided BeautifulSoup element is None. If it is not,
    it extracts the text from the element and converts it to a float using the
    `parse_to_int` function.

    Args:
        el (Tag or None): A BeautifulSoup element from which to extract the text.

    Returns:
        float or None: The float value derived from the element's text if the element
        is not None; otherwise, None.
    """
    if el is None:
        return None

    return parse_to_int(el.text)


def scrape_company_data(url):
    """
    Scrapes company data from a specified URL.

    This function retrieves the HTML content from the given URL and parses it
    using BeautifulSoup. It extracts various company-related information, such as
    the company name, financial year-end, revenue, profit, net profit, and location,
    returning the information in a structured dictionary format.

    Args:
        url (str): The URL of the company page to scrape.

    Returns:
        dict: A dictionary containing the following keys and values:
            - "linkki": The URL of the company page.
            - "yritys": The name of the company.
            - "osakeyhtiö": A boolean indicating if the company is an Osakeyhtiö.
            - "tilikausi_päättynyt": The financial year-end date.
            - "liikevaihto": The company's revenue as a float.
            - "liikevoitto": The company's profit as a float.
            - "nettotulos": The company's net profit as a float.
            - "kotipaikka": The company's location as a string.
    """
    html = retry_request(url).text

    soup = BeautifulSoup(html, "html.parser")
    company_name = get_company_name(soup)

    return {
        "linkki": url,
        "yritys": company_name,
        "osakeyhtiö": "Osakeyhtiö" in html,
        "tilikausi_päättynyt": get_financial_year_end(soup),
        "liikevaihto": element_to_int(get_table_value_element(soup, "Liikevaihto")),
        "liikevoitto": element_to_int(get_table_value_element(soup, "Liikevoitto")),
        "nettotulos": element_to_int(get_table_value_element(soup, "Nettotulos")),
        "kotipaikka": get_table_value_element(soup, "Kotipaikka").get_text(strip=True),
    }


def scrape_links_from_page(searchurl, page):
    """
    Scrapes links from a specified search results page.

    This function retrieves the HTML content of the given search URL with pagination.
    It parses the content to find specific links within <h3> elements and transforms
    them into a list of full URLs by modifying the href attribute.

    Args:
        searchurl (str): The base URL of the search page to scrape.
        page (int): The page number to request for scraping links.

    Returns:
        list: A list of full URLs constructed from the <a> elements found within <h3> tags.
    """
    params = {"page": page}
    html = retry_request(searchurl, params=params).text
    soup = BeautifulSoup(html, "html.parser")
    elements = soup.select("h3 > a")
    href = [
        "https://www.yritystele.fi"
        + element.get("href").replace("yhteystiedot", "taloustiedot")
        for element in elements
        if element.get("href") is not None
    ]
    return href


def get_df(filename):
    """
    Loads a DataFrame from a CSV file or returns an empty DataFrame with predefined columns.

    This function attempts to read a CSV file using the provided filename. If the file
    cannot be read (e.g., it does not exist or is not a valid CSV), it returns an empty
    DataFrame with specified column names.

    Args:
        filename (str): The path to the CSV file to be read.

    Returns:
        DataFrame: A pandas DataFrame containing the data from the CSV file, or an empty
        DataFrame with predefined columns if the file cannot be read.
    """
    try:
        return pd.read_csv(filename)
    except:
        return pd.DataFrame(
            columns=[
                "linkki",
                "yritys",
                "osakeyhtiö",
                "tilikausi_päättynyt",
                "liikevaihto",
                "liikevoitto",
                "nettotulos",
                "kotipaikka",
            ]
        )


def main():
    parser = ArgumentParser()
    parser.add_argument(
        "-r",
        "--resume",
        dest="resume",
        help="page to resume scraping from",
        metavar="resume",
        default=1,
        type=int,
    )
    parser.add_argument(
        "-p",
        "--pages",
        dest="pages",
        help="total pages in to scrape from",
        metavar="pages",
        required=True,
        type=int,
    )
    parser.add_argument(
        "-o",
        "--output",
        dest="output",
        help="csv file to ouput the results",
        metavar="output",
        required=True,
    )
    parser.add_argument(
        "-w",
        "--search",
        dest="search",
        help="csv file to ouput the results",
        metavar="search",
        required=True,
    )
    args = parser.parse_args()

    print(f"Args: {args}")

    df = get_df(args.output)

    for page in range(args.resume, args.pages):
        print(f"Page {page}")
        links = scrape_links_from_page(args.search, page)

        for link in links:
            if link not in df["linkki"].values:
                company = scrape_company_data(link)
                company_df = pd.DataFrame([company])
                df = pd.concat([df, company_df], ignore_index=True)
                df.to_csv(args.output, index=False)
            else:
                print("Skipping, company exists")


if __name__ == "__main__":
    main()
