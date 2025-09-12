import Image from "next/image"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: string
  title: string
  description: string
  image: string
  date: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Journey to Crystal Mastery",
    description: "Explore the profound impact of crystals on personal and spiritual growth",
    image: "/crystal-jewelry-necklace.jpg",
    date: "Jan 18, 2023",
    featured: true,
  },
  {
    id: "2",
    title: "The Art of Crystal Healing: Tips for Success",
    description: "Delve into the art of crystal healing with our in-depth tips for success.",
    image: "/crystals-with-healing-book.jpg",
    date: "Jan 18, 2023",
    featured: true,
  },
  {
    id: "3",
    title: "A Harmony of Learning",
    description: "",
    image: "/crystal-jewelry-necklace.jpg",
    date: "Jan 18, 2023",
  },
  {
    id: "4",
    title: "Crystals & Career Edge",
    description: "",
    image: "/crystals-with-healing-book.jpg",
    date: "Jan 18, 2023",
  },
  {
    id: "5",
    title: "Crystals for All Ages",
    description: "",
    image: "/hands-holding-heart-crystal.jpg",
    date: "Jan 18, 2023",
  },
]

export function CrystalBlogSection() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const latestPosts = blogPosts.filter((post) => !post.featured)

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">Learn More About Crystals</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Featured Posts - Left Side (3 columns) */}
          <div className="lg:col-span-3 space-y-12">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-72">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold">
                      Read More
                    </Button>
                    <span className="text-gray-400 text-lg">{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Latest Posts - Right Side (2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="bg-purple-600 text-white px-6 py-3 rounded-xl inline-block font-semibold mb-6">
                Latest Post
              </div>

              <div className="space-y-6">
                {latestPosts.map((post) => (
                  <div key={post.id} className="flex gap-4 items-start p-4 hover:bg-purple-50 transition-colors rounded-lg">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">{post.title}</h4>
                      <span className="text-gray-500">{post.date}</span>
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
