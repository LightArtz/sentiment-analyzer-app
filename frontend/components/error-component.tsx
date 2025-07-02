"use client"

import { AlertTriangle } from "lucide-react"

interface ErrorComponentProps {
  error: string
}

export default function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="p-4 bg-red-500/20 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">Analysis Failed</h3>
      <p className="text-slate-300 text-center max-w-md">{error}</p>
    </div>
  )
}
