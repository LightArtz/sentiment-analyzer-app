"use client"

import { ThumbsUp, ThumbsDown, Minus } from "lucide-react"

interface HeadlineAnalysis {
  headline: string
  sentiment: string
  confidence: number
}

interface AnalysisResponse {
  ticker: string
  overall_sentiment: string
  analyzed_headlines: HeadlineAnalysis[]
}

interface ResultsComponentProps {
  results: AnalysisResponse
}

export default function ResultsComponent({ results }: ResultsComponentProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return <ThumbsUp className="w-8 h-8 text-green-400" />
      case "Negative":
        return <ThumbsDown className="w-8 h-8 text-red-400" />
      default:
        return <Minus className="w-8 h-8 text-slate-400" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "text-green-400"
      case "Negative":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  const getSentimentBadgeColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Negative":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-7xl px-8">
        {/* Overall Sentiment Card */}
        <div className="backdrop-blur-md bg-slate-800/30 border border-slate-600/50 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Sentiment Analysis: <span className="text-blue-400">{results.ticker}</span>
            </h3>
            <p className="text-slate-400 mb-8">Last updated: just now</p>

            <div className="flex items-center justify-center mb-6">{getSentimentIcon(results.overall_sentiment)}</div>

            <h4 className={`text-4xl font-bold mb-2 ${getSentimentColor(results.overall_sentiment)}`}>
              {results.overall_sentiment}
            </h4>
            <p className="text-slate-400">Overall sentiment</p>
          </div>
        </div>

        {/* Headlines List */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-8">Recent Headlines</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {results.analyzed_headlines.map((headline, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-slate-800/30 border border-slate-600/50 rounded-xl p-6 hover:bg-slate-800/40 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-white text-lg leading-relaxed mb-3">{headline.headline}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentBadgeColor(headline.sentiment)}`}
                    >
                      {headline.sentiment}
                    </span>
                    <span className="text-slate-400 text-sm">{Math.round(headline.confidence * 100)}% confidence</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
