"use client"

import { Mail, Instagram, Linkedin, Github, BarChart3 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SentimentAI</span>
            </div>
            <p className="text-slate-400 max-w-md">
              Empowering traders with real-time sentiment analysis for smarter investment decisions.
            </p>
            <p className="text-sm text-slate-500">© 2024 SentimentAI. Built with passion for financial innovation.</p>
          </div>

          {/* Right side - Contact & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <a
                  href="mailto:kelson.vincien@gmail.com"
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors duration-200 group"
                >
                  <Mail className="w-5 h-5 group-hover:text-blue-400" />
                  <span>kelson.vincien@gmail.com</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/kelson_vincien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110 group"
                >
                  <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kelson-vincien/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110 group"
                >
                  <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                </a>
                <a
                  href="https://github.com/LightArtz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110 group"
                >
                  <Github className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-8 pt-8 border-t border-slate-700/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-500">Made with ❤️ using Next.js, Three.js, and Tailwind CSS</p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
