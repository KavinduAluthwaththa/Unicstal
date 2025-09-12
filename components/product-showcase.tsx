"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronRight, TrendingUp } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  image: string
  isSpecialSale?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Amethyst",
    price: 450,
    image: "/purple-amethyst-crystal-cluster.jpg",
    isSpecialSale: true,
  },
  {
    id: 2,
    name: "Crystal",
    price: 200,
    image: "/mixed-colorful-healing-crystals-collection.jpg",
    isSpecialSale: true,
  },
  {
    id: 3,
    name: "White Crystal",
    price: 100,
    image: "/clear-white-quartz-crystal-points.jpg",
    isSpecialSale: true,
  },
  {
    id: 4,
    name: "White Crystal",
    price: 210,
    image: "/smoky-quartz-crystal-tower-point.jpg",
    isSpecialSale: true,
  },
  {
    id: 5,
    name: "Purple Agate",
    price: 320,
    image: "/purple-agate-slice-with-geode-center.jpg",
    isSpecialSale: true,
  },
  {
    id: 6,
    name: "Amethyst Cluster",
    price: 180,
    image: "/dark-purple-amethyst-crystal-cluster.jpg",
    isSpecialSale: true,
  },
  {
    id: 7,
    name: "Citrine Points",
    price: 275,
    image: "/golden-citrine-crystal-points-cluster.jpg",
    isSpecialSale: true,
  },
  {
    id: 8,
    name: "Blue Crystal",
    price: 195,
    image: "/blue-azurite-crystal-specimen.jpg",
    isSpecialSale: true,
  },
]

export function ProductShowcase() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-serif">"YOUR JOURNEY. YOUR STONES."</h2>
          <p className="text-lg text-gray-600 mb-6">Our top selects for the season</p>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative bg-gray-50 rounded-2xl overflow-hidden mb-4 aspect-square">
                  {/* Shopping Cart Icon */}
                  <Button
                    size="icon"
                    className="absolute top-4 right-4 z-10 bg-black hover:bg-gray-800 text-white rounded-full w-10 h-10"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Button>

                  {/* Product Image */}
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-black">{product.name}</h3>
                  {product.isSpecialSale && <p className="text-sm text-gray-500">Special Sale Item</p>}
                  <p className="text-2xl font-bold text-black">${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrow */}
          <Button
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-black hover:bg-gray-800 text-white rounded-full w-12 h-12"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl text-base">
            Show New In Stock
            <TrendingUp className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
