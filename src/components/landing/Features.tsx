import { 
  BookOpen, 
  Users, 
  Award, 
  Bell, 
  Brain, 
  Calendar,
  FileText,
  Video,
  Star
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Academic Dashboard",
    description: "View all your subjects, upcoming exams, and deadlines in one organized place. Upload and access notes instantly.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Skill Exchange",
    description: "Connect with peers to teach what you know and learn what you need. Schedule sessions via Google Meet.",
    color: "secondary",
  },
  {
    icon: Award,
    title: "Scholarship Hub",
    description: "Browse curated scholarships for GTU students. Get eligibility checks and deadline reminders.",
    color: "accent",
  },
  {
    icon: Brain,
    title: "AI-Powered Study",
    description: "Get syllabus summaries, study suggestions, and smart recommendations powered by Gemini AI.",
    color: "primary",
  },
  {
    icon: Calendar,
    title: "Smart Reminders",
    description: "Never miss an exam or deadline. Automatic calendar integration keeps you on track.",
    color: "secondary",
  },
  {
    icon: Video,
    title: "Google Meet Sessions",
    description: "One-click session creation with auto-generated Meet links for skill exchange.",
    color: "accent",
  },
];

const Features = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "secondary":
        return "bg-secondary/10 text-secondary";
      case "accent":
        return "bg-accent/10 text-accent";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Everything You Need to
            <span className="text-gradient"> Excel</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete ecosystem for GTU students to organize, learn, and grow together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex rounded-xl p-3 ${getColorClasses(feature.color)}`}>
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl bg-primary-gradient transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-24 rounded-3xl bg-primary-gradient p-8 md:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, value: "10,000+", label: "Active Students" },
              { icon: Star, value: "4.9/5", label: "Average Rating" },
              { icon: FileText, value: "5,000+", label: "Notes Shared" },
              { icon: Award, value: "₹50K+", label: "Scholarships Found" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto h-8 w-8 text-primary-foreground/80 mb-3" />
                <div className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
