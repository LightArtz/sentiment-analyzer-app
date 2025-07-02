"use client"

import { useState, useRef } from "react"
import ParticleBackground from "@/components/particle-background"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AnalysisSection from "@/components/analysis-section"
import LoadingComponent from "@/components/loading-component"
import ErrorComponent from "@/components/error-component"
import ResultsComponent from "@/components/results-component"
import Footer from "@/components/footer"

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

// Mock data for testing when backend is not available
const getMockData = (ticker: string): AnalysisResponse => ({
  ticker: ticker,
  overall_sentiment: "Positive",
  analyzed_headlines: [
    {
      headline: `${ticker}'s new product launch exceeds market expectations, analysts predict strong quarter`,
      sentiment: "Positive",
      confidence: 0.92,
    },
    {
      headline: `${ticker} reports record revenue growth, beating Wall Street estimates`,
      sentiment: "Positive",
      confidence: 0.88,
    },
    {
      headline: `Supply chain concerns may impact ${ticker} production targets, sources say`,
      sentiment: "Negative",
      confidence: 0.85,
    },
    {
      headline: `${ticker} announces strategic partnership with major tech company`,
      sentiment: "Positive",
      confidence: 0.91,
    },
    {
      headline: `Market volatility affects ${ticker} stock performance this week`,
      sentiment: "Neutral",
      confidence: 0.76,
    },
  ],
})

export default function Home() {
  const [ticker, setTicker] = useState("")
  const [results, setResults] = useState<AnalysisResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const analysisRef = useRef<HTMLDivElement>(null)

  const handleAnalyze = async () => {
    if (!ticker.trim()) return

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      // Try to fetch from your backend first
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/analyze?ticker=${ticker}`)

      if (!response.ok) {
        throw new Error("Backend not available")
      }

      const data: AnalysisResponse = await response.json()
      setResults(data)
    } catch (err) {
      // If backend is not available, use mock data for demonstration
      console.log("Backend not available, using mock data for demonstration")

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockData = getMockData(ticker)
      setResults(mockData)
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen relative bg-slate-900">
      <ParticleBackground />
      <Header />

      <HeroSection onAnalyzeClick={scrollToAnalysis} />

      <div ref={analysisRef}>
        <AnalysisSection ticker={ticker} setTicker={setTicker} onAnalyze={handleAnalyze} isLoading={isLoading} />
      </div>

      {isLoading && <LoadingComponent />}
      {error && <ErrorComponent error={error} />}
      {results && <ResultsComponent results={results} />}

      <Footer />
    </main>
  )
}
