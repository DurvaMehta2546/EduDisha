import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToDashboard = () => {
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToFeatures = () => {
    navigate('/features');
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl animate-float delay-300" />
        <div className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl animate-float delay-500" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm animate-slide-up">
              <Sparkles className="h-4 w-4" />
              <span>Built for GTU Students</span>
            </div>

            {/* Headline */}
            <h1 className="mt-8 font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl animate-slide-up delay-100">
              Your Academic
              <br />
              <span className="text-accent">Journey,</span>
              <br />
              Simplified
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80 lg:text-xl animate-slide-up delay-200">
              Organize academics, exchange skills with peers, and never miss a 
              scholarship deadline. All in one powerful platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up delay-300">
              <Button 
                variant="accent" 
                size="xl" 
                className="group"
                onClick={() => navigate('/register')}
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl"
                onClick={goToFeatures}
              >
                Explore Features
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 animate-slide-up delay-400">
              {[
                { value: "Be one", label: "Students" },
                { value: "50+", label: "Skills Shared" },
                { value: "₹50K+", label: "Scholarships" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative hidden lg:block">
            <div className="relative space-y-6">
              {/* Card 1 - Academic Dashboard */}
              <div className="ml-auto w-80 rounded-2xl bg-glass p-6 shadow-card-hover animate-slide-up delay-200 hover:scale-[1.02] transition-transform cursor-pointer" onClick={scrollToDashboard}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Academic Dashboard</h3>
                    <p className="text-sm text-muted-foreground">All subjects, one view</p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Skill Exchange */}
              <div className="w-80 rounded-2xl bg-glass p-6 shadow-card-hover animate-slide-up delay-300 hover:scale-[1.02] transition-transform cursor-pointer" onClick={scrollToDashboard}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Skill Exchange</h3>
                    <p className="text-sm text-muted-foreground">Learn from peers via Meet</p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Scholarships */}
              <div className="ml-auto w-80 rounded-2xl bg-glass p-6 shadow-card-hover animate-slide-up delay-400 hover:scale-[1.02] transition-transform cursor-pointer" onClick={scrollToDashboard}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Scholarship Hub</h3>
                    <p className="text-sm text-muted-foreground">Never miss deadlines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-4 top-1/2 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
