import os
import json
import re
import requests
from collections import Counter
from geopy.geocoders import Nominatim

def extract_api_key():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r"NEWS_API_KEY\s*=\s*'([^']+)'", content)
    if match:
        return match.group(1)
    return None

def main():
    api_key = extract_api_key()
    if not api_key:
        print("API Key not found.")
        return

    url = f"https://newsdata.io/api/1/news?apikey={api_key}&category=top&language=en"
    res = requests.get(url)
    if res.status_code != 200:
        print("Failed to fetch news", res.text)
        return

    data = res.json()
    articles = data.get('results', [])
    
    country_counts = Counter()
    country_to_article = {}

    for article in articles:
        countries = article.get('country')
        if countries and isinstance(countries, list):
            for c in countries:
                c_lower = c.lower()
                country_counts[c_lower] += 1
                if c_lower not in country_to_article:
                    country_to_article[c_lower] = article['title']

    top_countries = country_counts.most_common(10)
    
    geolocator = Nominatim(user_agent="WorldMapIssue_HotspotsUpdater")
    
    hotspots = []
    for c_name, count in top_countries:
        if c_name == 'world': continue
        
        try:
            # Geocode the country name with Korean language preference
            location = geolocator.geocode(c_name, language="ko")
            if location:
                ko_name = location.address.split(',')[0].strip()
                
                hotspots.append({
                    'name': ko_name,
                    'lat': location.latitude,
                    'lng': location.longitude,
                    'title': country_to_article[c_name]
                })
                
                if len(hotspots) == 3:
                    break
        except Exception as e:
            print(f"Error geocoding {c_name}: {e}")

    # Fallback
    if len(hotspots) == 0:
        hotspots = [
            {"lng": 127.7669, "lat": 35.9078, "name": "대한민국", "title": "한국 주요 뉴스"},
            {"lng": -95.7129, "lat": 37.0902, "name": "미국", "title": "미국 주요 뉴스"},
            {"lng": 2.2137, "lat": 46.2276, "name": "프랑스", "title": "프랑스 주요 뉴스"}
        ]

    with open('hotspots.json', 'w', encoding='utf-8') as f:
        json.dump(hotspots, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
