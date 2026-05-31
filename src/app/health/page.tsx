'use client'

import { useDeviceStore } from '@/stores/device-store'
import { Heart, Droplet, Sun, Wind } from 'lucide-react'

export default function HealthPage() {
  const { history } = useDeviceStore()
  
  const currentData = history.length > 0 ? history[history.length - 1] : null

  let healthScore = 100
  let tips = []

  if (currentData) {
    if (currentData.moisture < 40) {
      healthScore -= 20
      tips.push("Soil is too dry. Ensure the irrigation pump is active or manually water the plant.")
    } else if (currentData.moisture > 75) {
      healthScore -= 10
      tips.push("Soil is quite wet. Allow it to dry out a bit to prevent root rot.")
    }

    if (currentData.temperature < 15) {
      healthScore -= 15
      tips.push("Temperature is too cold for optimal growth. Consider a warmer location.")
    } else if (currentData.temperature > 32) {
      healthScore -= 15
      tips.push("Temperature is too high. Provide some shade or improve ventilation.")
    }

    if (currentData.humidity < 40) {
      healthScore -= 10
      tips.push("Air is too dry. Consider misting the leaves or using a humidifier nearby.")
    }
  } else {
    healthScore = 0
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto gap-8 pb-10">
      <div>
        <h2 className="text-4xl font-serif tracking-tight mb-2">Plant Health</h2>
        <p className="text-muted-foreground text-lg">Real-time analysis and actionable insights.</p>
      </div>

      <div className="bg-[#4a6b53] rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10 text-white shadow-md">
        <div className="relative flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="transparent" />
            <circle 
              cx="96" 
              cy="96" 
              r="88" 
              stroke="white" 
              strokeWidth="12" 
              fill="transparent" 
              strokeDasharray={2 * Math.PI * 88} 
              strokeDashoffset={2 * Math.PI * 88 * (1 - healthScore / 100)} 
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-serif">{currentData ? healthScore : '--'}</span>
            <span className="text-sm font-medium uppercase tracking-widest opacity-80 mt-1">Score</span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-3xl font-serif mb-3">
            {healthScore >= 90 ? 'Thriving' : healthScore >= 70 ? 'Doing Okay' : currentData ? 'Needs Attention' : 'Waiting for Data'}
          </h3>
          <p className="text-white/80 leading-relaxed text-lg">
            {healthScore >= 90 ? "Your plant is in an optimal environment. The temperature, humidity, and moisture levels are perfectly balanced." : 
             currentData ? "There are a few environmental factors that could be improved for better growth." : 
             "Connect your device on the Settings page to see real-time health insights."}
          </p>
        </div>
      </div>

      {tips.length > 0 && (
        <div>
          <h3 className="text-2xl font-serif mb-6">Actionable Insights</h3>
          <div className="grid gap-4">
            {tips.map((tip, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
                <div className="bg-warning/20 p-3 rounded-full text-warning-foreground shrink-0 mt-1">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Recommendation</h4>
                  <p className="text-muted-foreground leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
