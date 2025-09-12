"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const filterCategories = [
  { id: "high-quality", label: "HIGH QUALITY", active: true },
  { id: "premium", label: "PREMIUM", active: false },
  { id: "calm", label: "CALM", active: false },
  { id: "protect", label: "PROTECT", active: false },
  { id: "clean", label: "CLEAN", active: false },
]

const manifestationCards = [
  {
    id: 1,
    title: "Money & Financial Abundance",
    image: "/money-financial-abundance.jpg",
    likes: 200,
  },
  {
    id: 2,
    title: "Love & Relationships",
    image: "/love-relationships-sunset.jpg",
    likes: 200,
  },
  {
    id: 3,
    title: "Career Growth & Success",
    image: "/career-growth-success.jpg",
    likes: 200,
  },
  {
    id: 4,
    title: "Peace of Mind & Inner Clarity",
    image: "/peace-mind-clarity-tulips.jpg",
    likes: 200,
  },
]

export function ManifestationSection() {
  const [activeFilter, setActiveFilter] = useState("high-quality")

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Manifestation Header Card */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-3xl p-8 mb-12 flex items-center justify-between">
        <div className="flex-1 pr-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            What do you want to Manifest?
          </h2>
          <p className="text-purple-100 text-lg mb-8 leading-relaxed">
            "Your thoughts are powerful. Set your intention, align your energy, and call in the life you desire — one
            crystal at a time."
          </p>
          <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold">
            Learn More
          </Button>
        </div>
        <div className="flex-shrink-0">
          <div className="w-64 h-64 rounded-2xl overflow-hidden">
            <Image
              src="/manifestation-woman-with-crown.jpg"
              alt="Woman with golden crown"
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap gap-4 justify-end mb-8">
        {filterCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeFilter === category.id ? "bg-purple-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Manifestation Cards Grid */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {manifestationCards.map((card) => (
            <div key={card.id} className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square">
              <Image
                src={card.image || "/placeholder.svg"}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

              {/* Like Button */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 rounded-full px-3 py-2">
                <span className="text-white text-sm font-medium">{card.likes}</span>
                <Heart className="w-4 h-4 text-white" />
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold leading-tight">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
