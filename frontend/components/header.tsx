"use client"

import { BarChart3, Github } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white drop-shadow-sm">SentimentAI</span>
          </div>

          <nav className="flex items-center space-x-8">
            <a
              href="https://github.com/LightArtz"
              className="flex items-center space-x-2 text-slate-200 hover:text-white transition-colors duration-200 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
