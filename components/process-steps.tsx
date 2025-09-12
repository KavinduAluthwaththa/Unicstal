export function ProcessSteps() {
  const steps = [
    {
      number: "1.",
      title: "FREE CONSULTATION",
      description: "We meet each other and learn about your needs and goals",
    },
    {
      number: "2.",
      title: "COUNSELLING PLAN",
      description: "I provide a counselling plan tailored to your unique situation",
    },
    {
      number: "3.",
      title: "YOUR HEALING BEGINS",
      description: "You receive support until you flourish without my help",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">How It Works</p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground mb-4">
          Just Three Easy Steps
        </h2>
        <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
          I keep the process simple, so we can focus on what matters
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-6xl font-bold text-primary mb-6">
                {step.number}
              </div>
              <h3 className="font-semibold text-foreground mb-4 tracking-wide text-sm">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
