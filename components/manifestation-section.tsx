"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ChevronRight, Sparkles, Moon, Star } from "lucide-react"
import Image from "next/image"

const filterCategories = [
  { id: "mystical", label: "MYSTICAL", active: true },
  { id: "cosmic", label: "COSMIC", active: false },
  { id: "ethereal", label: "ETHEREAL", active: false },
  { id: "divine", label: "DIVINE", active: false },
  { id: "sacred", label: "SACRED", active: false },
]

const manifestationCards = [
  {
    id: 1,
    title: "Cosmic Abundance Ritual",
    image: "/money-financial-abundance.jpg",
    likes: 200,
    status: "coming-soon"
  },
  {
    id: 2,
    title: "Twin Flame Connection",
    image: "/love-relationships-sunset.jpg",
    likes: 200,
    status: "coming-soon"
  },
  {
    id: 3,
    title: "Spiritual Ascension Path",
    image: "/career-growth-success.jpg",
    likes: 200,
    status: "coming-soon"
  },
  {
    id: 4,
    title: "Inner Light Activation",
    image: "/peace-mind-clarity-tulips.jpg",
    likes: 200,
    status: "coming-soon"
  },
]

export function ManifestationSection() {
  const [activeFilter, setActiveFilter] = useState("mystical")

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto relative">
      {/* Mystical background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 opacity-5 blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-pink-400 to-indigo-400 opacity-5 blur-3xl"></div>
      </div>

      {/* Manifestation Header Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 mb-12 flex items-center justify-between relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-10 blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-yellow-500 opacity-10 blur-xl"></div>
        </div>
        
        <div className="flex-1 pr-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Moon className="h-8 w-8 text-cyan-400" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent leading-tight">
              What do you wish to Manifest?
            </h2>
          </div>
          <p className="text-purple-100 text-lg mb-8 leading-relaxed">
            "Your intentions are cosmic energy. Set your vision, align with the universe, and manifest the mystical life you desire — one sacred ritual at a time."
          </p>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-lg font-semibold border-none shadow-lg transition-all duration-300">
            <Sparkles className="w-4 h-4 mr-2" />
            Coming Soon
          </Button>
        </div>
        <div className="flex-shrink-0 relative">
          <Star className="absolute -top-2 -right-2 h-6 w-6 text-cyan-300 animate-pulse" />
          <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-cyan-400/30">
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
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeFilter === category.id 
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg" 
                : "bg-white/70 backdrop-blur-sm text-purple-700 hover:bg-white/90 border border-purple-200"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Manifestation Cards Grid */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full p-3 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full p-3 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {manifestationCards.map((card) => (
            <div key={card.id} className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src={card.image || "/placeholder.svg"}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />
              
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                Coming Soon
              </div>

              {/* Mystical Sparkles */}
              <div className="absolute bottom-4 left-4">
                <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold leading-tight mb-2">{card.title}</h3>
                <div className="text-cyan-300 text-sm font-medium">✨ Mystical Ritual</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
