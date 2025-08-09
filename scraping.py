import requests
from bs4 import BeautifulSoup
import time
import os
from urllib.parse import urljoin, urlparse


def get_page_content(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    response = requests.get(url, headers=headers, verify=False)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve page content. Status code: {response.error}")
        return None

def extract_text_from_url(html):
    # Find all h2 and p tags
    soup = BeautifulSoup(html, 'html.parser')
    all_tags = soup.find_all(['h2', 'p'])
    all_text = [tag.get_text() for tag in all_tags if tag.get_text().strip()]
    return all_text

def extract_pdf_from_url(html_content, folder, base_url=None, blacklist=[]):
    os.makedirs(folder, exist_ok=True)
    soup = BeautifulSoup(html_content, 'html.parser')

    urls = []

    # Find PDFs
    for link in soup.find_all('a', href=True):
        if link['href'].endswith('.pdf'):
            urls.append(link['href'])

    # Find images
    for img in soup.find_all('img', src=True):
        urls.append(img['src'])

    # Download each file
    for url in urls:

        if url.split('/')[-1].split('.')[0] in blacklist :
            continue

        if url.startswith('http'):
            full_url = url
        elif base_url:
            full_url = urljoin(base_url, url)
        else:
            raise ValueError("Base URL is required")

        filename = os.path.basename(urlparse(full_url).path)
        if not filename:
            extension = full_url.split('.')[-1]
            filename = f"file_{len(os.listdir(folder))}.{extension}"

        file_path = os.path.join(folder, filename)

        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(full_url, headers=headers, stream=True, timeout=30, verify=False)
        if response:
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)

def scrape_urls(url_list, delay=1):
    i = 0
    for url, type in url_list:

        i += 1
        print(f"Scraping {i}/{len(url_list)} | {url}")

        html = get_page_content(url)
        if type == "pdf":

            # look for links of pdfs / imgs and store them in a folder
            blacklist = ["favicon",
                "icone-R-1",
                "icone-R-2",
                "icone-rougeole",
                "logo-armoires",
                "logo-ministere-sante",
                "situation1",
                "spcommon",
                "icone-R-3",
                "rss",
                "twt"]
            extract_pdf_from_url(html, "extracted", url, blacklist=blacklist)

        else :
            data = extract_text_from_url(html)
            return data


        # Wait between requests
        if delay > 0:
            time.sleep(delay)


if __name__ == "__main__":
    urls = [
        ("https://www.sante.gov.ma/Pages/Rougeole.aspx","pdf"),
        ("https://www.who.int/news-room/fact-sheets/detail/measles", "txt")
    ]
    text_data = scrape_urls(urls)
    print("\n\n\n ----------------------- Text Found ---------------------------\n")
    print("\n".join(text_data))
