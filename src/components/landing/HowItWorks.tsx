import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sign Up with Google",
    description: "Quick and secure login using your Google account. Set up your profile with branch and semester details.",
    highlights: ["Secure Authentication", "One-click Setup", "Profile Customization"],
  },
  {
    number: "02",
    title: "Organize Academics",
    description: "View your semester subjects, upload notes to Google Drive, and track all your deadlines in one dashboard.",
    highlights: ["Subject Overview", "Notes Storage", "Deadline Tracking"],
  },
  {
    number: "03",
    title: "Exchange Skills",
    description: "List your skills, find matching peers, and schedule learning sessions via Google Meet.",
    highlights: ["Skill Matching", "Meet Integration", "Peer Learning"],
  },
  {
    number: "04",
    title: "Never Miss Scholarships",
    description: "Browse curated scholarships, check eligibility, and set calendar reminders for deadlines.",
    highlights: ["Curated Database", "Eligibility Check", "Smart Reminders"],
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Get Started in 4 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From sign-up to success, we've made every step intuitive and fast.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden lg:block lg:left-1/2 lg:-translate-x-0.5" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ${
                  index % 2 === 0 ? "" : "lg:direction-rtl"
                }`}
              >
                {/* Content */}
                <div
                  className={`lg:text-right ${
                    index % 2 === 0 ? "lg:pr-16" : "lg:pl-16 lg:text-left lg:order-2"
                  }`}
                >
                  <div className="inline-block rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-card-hover">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-display text-4xl font-bold text-gradient">
                        {step.number}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-sm text-success"
                        >
                          <Check className="h-3 w-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex lg:items-center lg:justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
                </div>

                {/* Spacer for grid */}
                <div className={index % 2 === 0 ? "hidden lg:block" : "hidden lg:block lg:order-1"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
