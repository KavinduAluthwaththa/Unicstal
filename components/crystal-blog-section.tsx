import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, Moon, Star } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  description: string
  image: string
  date: string
  status: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Cosmic Portal to Manifestation",
    description: "Discover how sacred crystals open doorways to your highest potential and divine purpose",
    image: "/crystal-jewelry-necklace.jpg",
    date: "Jan 15, 2024",
    status: "mystical-guide",
    featured: true,
  },
  {
    id: "2", 
    title: "Sacred Geometry & Crystal Wisdom",
    description: "Explore the ancient art of crystal alignment with universal sacred patterns.",
    image: "/crystals-with-healing-book.jpg",
    date: "Jan 10, 2024",
    status: "mystical-guide",
    featured: true,
  },
  {
    id: "3",
    title: "Lunar Manifestation Rituals",
    description: "Harness the power of moon phases for spiritual growth",
    image: "/crystal-jewelry-necklace.jpg",
    date: "Jan 5, 2024",
    status: "ritual-guide",
  },
  {
    id: "4",
    title: "Crystal Aura Cleansing",
    description: "Purify your energy field with healing crystals",
    image: "/crystals-with-healing-book.jpg",
    date: "Dec 28, 2023",
    status: "healing-guide",
  },
  {
    id: "5",
    title: "Divine Feminine Energy",
    description: "Connect with your inner goddess through crystal meditation",
    image: "/hands-holding-heart-crystal.jpg",
    date: "Dec 20, 2023",
    status: "spiritual-guide",
  },
]

export function CrystalBlogSection() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const latestPosts = blogPosts.filter((post) => !post.featured)

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-purple-50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 opacity-8 blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-pink-400 to-indigo-400 opacity-8 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mystical Wisdom Library
            </h2>
          </div>
          <p className="text-purple-700 text-lg">Sacred knowledge coming to illuminate your path</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Featured Posts - Left Side (3/4 width) */}
          <div className="lg:col-span-3">
            {/* Top Row - Two smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200/50">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-2">{post.title}</h3>
                    <p className="text-purple-600 mb-4 text-sm leading-relaxed">{post.description}</p>
                    <div className="flex items-center justify-between">
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 border-none">
                        Read More
                      </Button>
                      <span className="text-purple-400 text-sm font-medium">{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Posts - Right Side (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg sticky top-8 border border-purple-200/50">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-4 py-2 rounded-full font-semibold mb-4 text-sm w-auto border-none">
                Mystical Guides
              </Button>

              <div className="space-y-4">
                {latestPosts.map((post) => (
                  <div key={post.id} className="flex gap-3 items-start hover:bg-purple-50/50 transition-colors rounded-lg p-2">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
                      <div className="absolute top-1 right-1">
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-purple-900 text-sm mb-1 line-clamp-2">{post.title}</h4>
                      <span className="text-purple-500 text-xs font-medium">{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
