"use client"

import type React from "react"
import { Search } from "lucide-react"

interface AnalysisSectionProps {
  ticker: string
  setTicker: (ticker: string) => void
  onAnalyze: () => void
  isLoading: boolean
}

export default function AnalysisSection({ ticker, setTicker, onAnalyze, isLoading }: AnalysisSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ticker.trim()) {
      onAnalyze()
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Live Sentiment Analysis</h2>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Enter Stock Ticker (e.g., AAPL, TSLA)..."
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !ticker.trim()}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? "Analyzing..." : "Analyze"}
          </button>
        </form>
      </div>
    </section>
  )
}
