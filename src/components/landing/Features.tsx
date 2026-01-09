import { 
  BookOpen, 
  Users, 
  Award, 
  Bell, 
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
    icon: Calendar,
    title: "Smart Reminders",
    description: "Never miss an exam or deadline. Automatic calendar integration keeps you on track.",
    color: "primary",
  },
  {
    icon: Video,
    title: "Google Meet Sessions",
    description: "One-click session creation with auto-generated Meet links for skill exchange.",
    color: "secondary",
  },
  {
    icon: FileText,
    title: "Study Resources",
    description: "Access shared notes, study guides, and learning materials from your peers.",
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
    <section className="py-24 bg-background neural-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4 animate-fade-in-scale interactive-element">
            <Brain className="h-4 w-4 inline mr-2" />
            AI-Powered Features
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl animate-slide-in-up">
            Everything You Need to
            <span className="text-gradient animate-shimmer"> Excel</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            A complete ecosystem for GTU students to organize, learn, and grow together with AI assistance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 interactive-element animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              {/* Icon with glow effect */}
              <div className={`relative inline-flex rounded-xl p-3 ${getColorClasses(feature.color)} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6" />
                <div className={`absolute inset-0 rounded-xl ${getColorClasses(feature.color)} animate-pulse-glow opacity-0 group-hover:opacity-50`} />
              </div>

              {/* Content */}
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* AI indicator for AI-powered features */}
              {feature.title.includes('AI') && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary animate-pulse">
                    <Star className="h-3 w-3" />
                    <span>AI</span>
                  </div>
                </div>
              )}

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl bg-primary-gradient transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* AI Stats Banner */}
        <div className="mt-24 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-8 md:p-12 animate-fade-in-scale">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Success</h3>
            <p className="text-white/80">Real results from our intelligent learning platform</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, value: "10,000+", label: "Active Students", color: "text-blue-200" },
              { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-yellow-200" },
              { icon: FileText, value: "5,000+", label: "Notes Shared", color: "text-green-200" },
              { icon: Award, value: "₹50K+", label: "Scholarships Found", color: "text-purple-200" },
            ].map((stat, index) => (
              <div key={stat.label} className={`text-center animate-slide-in-up ${stat.color}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="mx-auto h-8 w-8 text-white/80 mb-3 animate-float" />
                <div className="font-display text-3xl font-bold text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-white/70">
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
