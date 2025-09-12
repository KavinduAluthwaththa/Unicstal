export function ServicePillars() {
  const pillars = [
    {
      icon: "🧘‍♀️",
      title: "EMOTIONAL HEALING",
      description: "Release stress, anxiety, and past traumas",
    },
    {
      icon: "🎯",
      title: "CLARITY & PURPOSE",
      description: "Gain insight into your life's direction",
    },
    {
      icon: "✨",
      title: "SPIRITUAL CONNECTION",
      description: "Align with your values and higher self",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {pillars.map((pillar, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">{pillar.icon}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-3 tracking-wide text-sm">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
