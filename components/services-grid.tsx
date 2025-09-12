export function ServicesGrid() {
  const services = [
    {
      title: "SPIRITUAL COUNSELLING",
      description: "Private guidance for clarity, healing, and personal growth",
      image: "/woman-in-peaceful-counseling-session--warm-lightin.jpg",
    },
    {
      title: "ENERGY HEALING",
      description: "Restore balance and release emotional blockages",
      image: "/hands-performing-energy-healing--soft-golden-light.jpg",
    },
    {
      title: "RETREATS & WORKSHOPS",
      description: "Deepen your journey through immersive group experiences",
      image: "/group-meditation-retreat--people-sitting-in-circle.jpg",
    },
  ]

  return (
    <section className="py-20 px-6" id="services">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">Services</p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground mb-4">
          How I Can Serve You
        </h2>
        <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
          All sessions available in-person and online for maximum flexibility
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-t-[2rem] mb-6">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-foreground mb-3 tracking-wide text-sm">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
