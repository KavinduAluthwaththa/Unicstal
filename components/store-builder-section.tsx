import { Button } from "@/components/ui/button"

export function StoreBuilderSection() {
  const steps = ["Add your first product", "Customize your store", "Set up payments"]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image on the left */}
          <div className="flex-1">
            <img
              src="/mystical-woman-with-purple-hair-and-crown.jpg"
              alt="Mystical woman with purple hair and decorative crown"
              className="w-full max-w-md lg:max-w-lg h-auto rounded-3xl shadow-2xl mx-auto"
            />
          </div>

          {/* Content Card on the right */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-8 text-center">
                Build Up Your Own <span className="text-purple-600">Crystal Store</span>
              </h2>

              <div className="space-y-6 mb-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-black">{String(index + 1).padStart(2, "0")}.</span>
                    <span className="text-lg text-gray-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl">
                  Buildup Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* </CHANGE> */}
      </div>
    </section>
  )
}
