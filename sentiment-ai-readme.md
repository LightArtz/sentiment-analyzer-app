# SentimentAI - Financial News Sentiment Analyzer

A full-stack web application that provides real-time sentiment analysis for financial news related to specific stock tickers or cryptocurrencies. This tool helps users gauge market sentiment to make more informed investment decisions.

## Key Features

- **Real-Time News Analysis:** Fetches the latest headlines from around the world using the NewsAPI.
- **AI-Powered Sentiment:** Utilizes a fine-tuned FinBERT model to classify headlines as Positive, Negative, or Neutral.
- **Overall Sentiment Score:** Aggregates individual headline sentiments into an easy-to-understand overall score.
- **Interactive UI:** A modern, responsive interface built with Next.js and a futuristic, animated background.

## Screenshots

*(Here you can add the screenshots of your application's UI)*

| Hero Section | Results Display |
|:------------:|:---------------:|
| ![Hero Section](path/to/your/hero_screenshot.png) | ![Results Display](path/to/your/results_screenshot.png) |

## Tech Stack

This project is a monorepo containing two main parts:

### Backend (`/backend`)
- **Framework:** Python, FastAPI
- **ML Model:** Hugging Face `transformers` with a fine-tuned `ProsusAI/finbert` model
- **Data:** NewsAPI.org

### Frontend (`/frontend`)
- **Framework:** Next.js, React
- **Styling:** Tailwind CSS
- **Animation:** Three.js / react-three-fiber

## Local Setup and Installation

Follow these steps to run the project on your local machine.

### Prerequisites

- Python 3.9+
- Node.js and npm
- A NewsAPI.org API Key

### 1. Clone the Repository

```bash
git clone https://github.com/LightArtz/sentiment-analyzer-app.git
cd sentiment-analyzer-app
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment (recommended):

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Set up your API Key:

Create a file named `.env` in the `backend` folder. Add your NewsAPI key to it like this:

```
NEWS_API_KEY=your_actual_api_key_here
```

Run the backend server:

```bash
uvicorn main:app --reload
```

The backend will now be running at `http://127.0.0.1:8000`.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install Node.js dependencies:

```bash
npm install
```

Set up your environment file:

Create a file named `.env.local` in the `frontend` folder. Add the following line to connect to your local backend:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Run the frontend development server:

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` to see the application.

## Future Improvements

- Train the model on more nuanced financial data to better understand transaction-based headlines
- Implement a more sophisticated overall sentiment score based on confidence levels
- Add user authentication and the ability to save a watchlist of tickers

## License

This project is licensed under the MIT License.