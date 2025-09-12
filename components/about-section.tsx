import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-3xl p-12 flex items-center gap-12">
          <div className="w-80 h-80 rounded-2xl overflow-hidden flex-shrink-0">
            <img
              src="/professional-spiritual-healer-woman-smiling-warmly.jpg"
              alt="Spiritual healer portrait"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">About Your Therapist</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-card-foreground mb-6">
              I'm Here To Serve You
            </h2>
            <p className="text-card-foreground/80 leading-relaxed mb-6">
              Hi I'm Roxana, a spiritual counselor helping you find peace, clarity, and purpose. Whether you're seeking
              emotional healing, spiritual growth, or a renewed sense of purpose, I'm here to support you on your
              journey.
            </p>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-primary">📍</span>
                <span className="text-card-foreground/70 text-sm">Sessions in Spiritual Care</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">⭐</span>
                <span className="text-card-foreground/70 text-sm">Best Levels: 1, 2, & 3</span>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Book My Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
