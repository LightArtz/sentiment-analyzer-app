"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export default function InteractivePreview() {
  const [activeMetric, setActiveMetric] = useState(0)
  const [animatedValues, setAnimatedValues] = useState({
    sentiment: 0,
    confidence: 0,
    volume: 0,
  })

  const metrics = [
    { label: "AAPL", sentiment: "Positive", value: 78, color: "text-green-400", icon: TrendingUp },
    { label: "TSLA", sentiment: "Negative", value: 34, color: "text-red-400", icon: TrendingDown },
    { label: "MSFT", sentiment: "Positive", value: 82, color: "text-green-400", icon: TrendingUp },
    { label: "GOOGL", sentiment: "Neutral", value: 56, color: "text-slate-400", icon: Activity },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const currentMetric = metrics[activeMetric]
    const animateValue = (start: number, end: number, setter: (value: number) => void) => {
      const duration = 1000
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = start + (end - start) * easeOut

        setter(Math.round(current))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }

    animateValue(animatedValues.sentiment, currentMetric.value, (value) =>
      setAnimatedValues((prev) => ({ ...prev, sentiment: value })),
    )
    animateValue(animatedValues.confidence, currentMetric.value + Math.random() * 10, (value) =>
      setAnimatedValues((prev) => ({ ...prev, confidence: value })),
    )
    animateValue(animatedValues.volume, Math.floor(Math.random() * 200) + 50, (value) =>
      setAnimatedValues((prev) => ({ ...prev, volume: value })),
    )
  }, [activeMetric])

  const currentMetric = metrics[activeMetric]
  const Icon = currentMetric.icon

  return (
    <div className="relative">
      {/* Floating Dashboard Preview */}
      <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Live Preview</h3>
          <div className="flex space-x-1">
            {metrics.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeMetric ? "bg-blue-400" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Main Metric */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon className={`w-6 h-6 ${currentMetric.color}`} />
              <span className="text-2xl font-bold text-white">{currentMetric.label}</span>
            </div>
            <div className={`text-lg font-medium ${currentMetric.color}`}>{currentMetric.sentiment}</div>
          </div>

          {/* Animated Progress Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-slate-300 mb-1">
                <span>Sentiment Score</span>
                <span>{animatedValues.sentiment}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    currentMetric.sentiment === "Positive"
                      ? "bg-green-400"
                      : currentMetric.sentiment === "Negative"
                        ? "bg-red-400"
                        : "bg-slate-400"
                  }`}
                  style={{ width: `${animatedValues.sentiment}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-slate-300 mb-1">
                <span>Confidence</span>
                <span>{animatedValues.confidence}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${animatedValues.confidence}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-slate-300 mb-1">
                <span>News Volume</span>
                <span>{animatedValues.volume}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(animatedValues.volume / 250) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse animation-delay-500" />
      </div>

      {/* Additional Floating Cards */}
      <div className="absolute -top-4 -left-8 backdrop-blur-lg bg-slate-700/30 border border-slate-500/20 rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-slate-300">Real-time</span>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-4 backdrop-blur-lg bg-slate-700/30 border border-slate-500/20 rounded-lg p-3 shadow-lg">
        <div className="text-xs text-slate-300">
          <div>24h Change</div>
          <div className="text-green-400 font-semibold">+12.3%</div>
        </div>
      </div>
    </div>
  )
}
