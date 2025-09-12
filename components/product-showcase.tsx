"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ChevronRight, Clock } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  description: string
  image: string
  comingSoon?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Celestial Amethyst",
    description: "Mystical purple crystals for spiritual awakening",
    image: "/purple-amethyst-crystal-cluster.jpg",
    comingSoon: true,
  },
  {
    id: 2,
    name: "Rainbow Healing Set",
    description: "Multi-dimensional energy collection",
    image: "/mixed-colorful-healing-crystals-collection.jpg",
    comingSoon: true,
  },
  {
    id: 3,
    name: "Pure Light Quartz",
    description: "Amplify your manifestation power",
    image: "/clear-white-quartz-crystal-points.jpg",
    comingSoon: true,
  },
  {
    id: 4,
    name: "Smoky Wisdom Tower",
    description: "Grounding and protection energy",
    image: "/smoky-quartz-crystal-tower-point.jpg",
    comingSoon: true,
  },
  {
    id: 5,
    name: "Sacred Geometry Agate",
    description: "Divine patterns for harmony",
    image: "/purple-agate-slice-with-geode-center.jpg",
    comingSoon: true,
  },
  {
    id: 6,
    name: "Lunar Energy Cluster",
    description: "Moonstone magic for intuition",
    image: "/dark-purple-amethyst-crystal-cluster.jpg",
    comingSoon: true,
  },
  {
    id: 7,
    name: "Solar Manifestation",
    description: "Golden citrine for abundance",
    image: "/golden-citrine-crystal-points-cluster.jpg",
    comingSoon: true,
  },
  {
    id: 8,
    name: "Ocean Wisdom Stone",
    description: "Blue azurite for clarity",
    image: "/blue-azurite-crystal-specimen.jpg",
    comingSoon: true,
  },
]

export function ProductShowcase() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-purple-50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 opacity-10 blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-pink-400 to-indigo-400 opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-serif">
              MYSTICAL COLLECTION
            </h2>
          </div>
          <p className="text-lg text-purple-700 mb-6">Coming soon to transform your spiritual journey</p>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden mb-4 aspect-square border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Soon
                  </div>

                  {/* Product Image */}
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-purple-900">{product.name}</h3>
                  <p className="text-sm text-purple-600">{product.description}</p>
                  <div className="text-cyan-600 font-medium">Coming Soon ✨</div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrow */}
          <Button
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-full w-12 h-12 shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-300">
            Join the Waitlist
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
