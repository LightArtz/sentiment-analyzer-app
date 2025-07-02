"use client"

import InteractivePreview from "./interactive-preview"

export default function HeroSection({ onAnalyzeClick }: { onAnalyzeClick: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Go Beyond the Numbers.
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-none">
                  Trade with Insight.
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed drop-shadow-sm">
                Leverage real-time news sentiment analysis to make smarter, data-driven investment decisions.
              </p>

              <button
                onClick={onAnalyzeClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Analyze a Stock Now
              </button>
            </div>
          </div>

          {/* Right Column - Interactive Preview */}
          <div className="flex justify-center lg:justify-end">
            <InteractivePreview />
          </div>
        </div>
      </div>
    </section>
  )
}
