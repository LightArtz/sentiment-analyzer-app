# main.py

import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from pydantic import BaseModel
from typing import List

# --- 1. Initialize the FastAPI App ---
app = FastAPI(
    title="Financial Sentiment Analysis API",
    description="Analyzes financial news headlines for sentiment (Positive, Negative, Neutral)."
)

origins = [
    "http://localhost:3000",  # The origin of your Next.js app
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --- 2. Load Your Fine-Tuned Model ---
# This loads the model from the folder you downloaded from Colab.
# It's loaded once when the application starts.
try:
    sentiment_analyzer = pipeline(
        "sentiment-analysis",
        model="LightArtz/sentiment-analyzer-finbert"
    )
except Exception as e:
    # If the model fails to load, we can't run the server.
    print(f"Error loading model: {e}")
    sentiment_analyzer = None

# --- 3. Define the structure of our response ---
class HeadlineAnalysis(BaseModel):
    headline: str
    sentiment: str
    confidence: float

class AnalysisResponse(BaseModel):
    ticker: str
    overall_sentiment: str
    analyzed_headlines: List[HeadlineAnalysis]

# --- 4. Create the API Endpoint ---
@app.get("/analyze", response_model=AnalysisResponse)
def analyze_sentiment_for_ticker(ticker: str):
    """
    Analyzes the sentiment of recent news headlines for a given stock ticker.
    """
    if not sentiment_analyzer:
        raise HTTPException(status_code=500, detail="Model is not available.")
    
    # --- A. Fetch News from NewsAPI.org ---
    NEWS_API_KEY = os.getenv("NEWS_API_KEY")
    if not NEWS_API_KEY:
        raise HTTPException(status_code=500, detail="News API key is not configured on the server.")

    url = (
        f"https://newsapi.org/v2/everything?"
        f"q={ticker}&"
        "language=en&"
        "sortBy=publishedAt&"
        f"apiKey={NEWS_API_KEY}"
    )
    
    try:
        response = requests.get(url)
        response.raise_for_status() # Raise an exception for bad status codes
        articles = response.json().get("articles", [])
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=503, detail=f"Failed to fetch news from NewsAPI: {e}")

    if not articles:
        raise HTTPException(status_code=404, detail=f"No recent news found for ticker: {ticker}")

    # Get the top 20 headlines
    headlines = [article['title'] for article in articles[:20]]

    # --- B. Analyze Sentiment with Your Model ---
    sentiments = sentiment_analyzer(headlines)

    # --- C. Prepare the Results ---
    analyzed_results = []
    positive_count = 0
    negative_count = 0
    neutral_count = 0

    label_map = {'positive': 'Positive', 'negative': 'Negative', 'neutral': 'Neutral'}

    for headline, sentiment in zip(headlines, sentiments):
        label = label_map.get(sentiment['label'], 'Unknown')
        
        if label == 'Positive':
            positive_count += 1
        elif label == 'Negative':
            negative_count += 1
        else:
            neutral_count += 1
        
        analyzed_results.append(
            HeadlineAnalysis(
                headline=headline,
                sentiment=label,
                confidence=sentiment['score']
            )
        )

    # Determine overall sentiment
    if positive_count > negative_count and positive_count > neutral_count:
        overall = "Positive"
    elif negative_count > positive_count and negative_count > neutral_count:
        overall = "Negative"
    else:
        overall = "Neutral"

    return AnalysisResponse(
        ticker=ticker,
        overall_sentiment=overall,
        analyzed_headlines=analyzed_results
    )