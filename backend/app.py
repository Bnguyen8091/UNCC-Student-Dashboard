from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
import logging
import feedparser
import urllib.request
import re
import os

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'change-me-in-production')
jwt = JWTManager(app)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

CORS(app, resources={r"/api/*": {"origins": [
    "http://localhost:4200",
    "http://localhost:57076",
    "http://localhost:56217",
]}}, supports_credentials=True)

DEMO_USERS = {
    'niner': 'uncc2024',
    'admin': 'admin123',
}

FALLBACK_NEWS = [
    {
        "title": "How UNC Charlotte's Deans Celebrate Thanksgiving",
        "summary": "Deans from across UNC Charlotte's campus shared their family photos and holiday traditions with the campus community.",
        "imageUrl": "https://inside.charlotte.edu/wp-content/themes/wp-epsilon-theme-main/images/default-post-avatar-1x1.png",
        "link": "https://inside.charlotte.edu/2024/11/22/how-unc-charlottes-deans-celebrate-thanksgiving/"
    },
    {
        "title": "UNC Charlotte State of Housing in Charlotte 2024 Report",
        "summary": "The number of people who moved to the Charlotte metro from 2022 to 2023 could fill a city the size of Concord, NC.",
        "imageUrl": "https://inside.charlotte.edu/wp-content/uploads/sites/1289/2024/11/2024-state-of-housing-600px-1-300x300.jpg",
        "link": "https://inside.charlotte.edu/2024/11/22/unc-charlotte-state-of-housing-in-charlotte-2024-report-analyzes-housing-issues/"
    },
    {
        "title": "49ers Athletics Recap: Fall 2024 Season Highlights",
        "summary": "UNC Charlotte's athletic programs closed out a strong fall season with standout performances across soccer, volleyball, and cross country.",
        "imageUrl": "https://inside.charlotte.edu/wp-content/themes/wp-epsilon-theme-main/images/default-post-avatar-1x1.png",
        "link": "https://charlotte49ers.com"
    },
    {
        "title": "UNC Charlotte Research Funding Reaches Record High",
        "summary": "The university secured over $100 million in research funding this year, marking a new milestone for Charlotte's growing research enterprise.",
        "imageUrl": "https://inside.charlotte.edu/wp-content/themes/wp-epsilon-theme-main/images/default-post-avatar-1x1.png",
        "link": "https://research.charlotte.edu"
    },
    {
        "title": "New Student Success Center Opens on Main Campus",
        "summary": "UNC Charlotte has opened a new Student Success Center offering expanded tutoring, advising, and career development resources for all 49ers.",
        "imageUrl": "https://inside.charlotte.edu/wp-content/themes/wp-epsilon-theme-main/images/default-post-avatar-1x1.png",
        "link": "https://inside.charlotte.edu"
    },
    {
        "title": "Charlotte's EPIC Building Wins National Architecture Award",
        "summary": "The Entrepreneurship and Innovation Center (EPIC) has been recognized by the American Institute of Architects for outstanding sustainable design.",
        "imageUrl": "https://inside.charlotte.edu/wp-content/themes/wp-epsilon-theme-main/images/default-post-avatar-1x1.png",
        "link": "https://inside.charlotte.edu"
    },
]

RSS_URL = 'https://inside.charlotte.edu/feed/'


def extract_image(entry):
    if hasattr(entry, 'media_thumbnail') and entry.media_thumbnail:
        return entry.media_thumbnail[0]['url']
    if hasattr(entry, 'media_content') and entry.media_content:
        for media in entry.media_content:
            if media.get('type', '').startswith('image/'):
                return media['url']
    html = entry.get('summary', '') or ''
    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    if match:
        return match.group(1)
    return 'https://inside.charlotte.edu/wp-content/themes/wp-epsilon-theme-main/images/default-post-avatar-1x1.png'


def fetch_rss():
    # Feed feedparser a pre-fetched response so we can control the timeout
    req = urllib.request.Request(RSS_URL, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=6) as resp:
        raw = resp.read()
    feed = feedparser.parse(raw)
    articles = []
    for entry in feed.entries[:6]:
        raw_summary = entry.get('summary', '')
        clean = re.sub(r'<[^>]+>', '', raw_summary).strip()
        clean = clean[:220] + ('...' if len(clean) > 220 else '')
        articles.append({
            'title': entry.title,
            'summary': clean,
            'imageUrl': extract_image(entry),
            'link': entry.link,
        })
    return articles


@app.route('/')
def root():
    return jsonify({"message": "UNCC Dashboard API v2"}), 200


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')
    if DEMO_USERS.get(username) == password:
        access_token = create_access_token(identity=username)
        logging.info(f'Login success: {username}')
        return jsonify(access_token=access_token), 200
    return jsonify(error='Invalid username or password'), 401


@app.route('/api/news', methods=['GET'])
def get_news():
    try:
        articles = fetch_rss()
        if articles:
            logging.info(f'Serving {len(articles)} live articles from UNCC RSS')
            return jsonify(articles), 200
        logging.warning('RSS returned empty — falling back to hardcoded news')
    except Exception as e:
        logging.warning(f'RSS fetch failed ({type(e).__name__}: {e}) — using fallback news')
    return jsonify(FALLBACK_NEWS), 200


if __name__ == '__main__':
    app.run(debug=True, port=3000)
