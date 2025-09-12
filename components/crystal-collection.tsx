"use client"

import { Button } from "@/components/ui/button"

interface CrystalItem {
  id: string
  name: string
  icon: string
  image: string
  description: string
  iconColor: string
}

const crystalItems: CrystalItem[] = [
  {
    id: "abundance",
    name: "Abundance",
    icon: "💰",
    image: "/golden-citrine-crystals-abundance.jpg",
    description:
      "Manifest prosperity, success, and good fortune. These high-vibe stones help align your energy with wealth and opportunity.",
    iconColor: "text-yellow-700",
  },
  {
    id: "protection",
    name: "Protection",
    icon: "🛡️",
    image: "/black-obsidian-protection-crystals.jpg",
    description:
      "Shield your energy from negativity and unwanted influences. These crystals help create a strong, grounded aura of protection.",
    iconColor: "text-blue-500",
  },
  {
    id: "love",
    name: "Love",
    icon: "💖",
    image: "/rose-quartz-pink-love-crystals.jpg",
    description:
      "Attract love, deepen self-love, and heal heartaches with gentle, heart-centered crystals like Rose Quartz and Rhodonite.",
    iconColor: "text-pink-500",
  },
]

export function CrystalCollection() {
  return (
    <div className="min-w-[48%] max-w-md">
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">OUR CRYSTAL COLLECTION</h3>
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {crystalItems.map((crystal) => (
            <div key={crystal.id} className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
              <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={crystal.image || "/placeholder.svg"}
                  alt={`${crystal.name} crystals`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${crystal.iconColor} text-sm`}>{crystal.icon}</span>
                  <h4 className="font-semibold text-gray-800 text-sm">{crystal.name}</h4>
                </div>
                <p className="text-xs text-gray-600 leading-tight">{crystal.description}</p>
              </div>
              <div className="flex-shrink-0">
                <Button
                  className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs px-4 py-2 rounded-lg font-semibold transform -rotate-90 whitespace-nowrap"
                  onClick={() => console.log(`Shopping for ${crystal.name}`)}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-lg">😊</span>
          </div>
        </div>
      </div>
    </div>
  )
}
