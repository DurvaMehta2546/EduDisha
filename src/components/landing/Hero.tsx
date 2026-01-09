import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Award } from "lucide-react";
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
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Your Academic
              <br />
              Journey,
              <br />
              Simplified
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground lg:text-xl">
              Organize academics, exchange skills with peers, and never miss a
              scholarship deadline. All in one powerful platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="group"
                onClick={() => navigate('/register')}
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={goToFeatures}
              >
                Explore Features
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: "Be one", label: "Students" },
                { value: "50+", label: "Skills Shared" },
                { value: "₹50K+", label: "Scholarships" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
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
              <div className="ml-auto w-80 rounded-2xl bg-card p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={scrollToDashboard}>
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
              <div className="w-80 rounded-2xl bg-card p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={scrollToDashboard}>
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
              <div className="ml-auto w-80 rounded-2xl bg-card p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={scrollToDashboard}>
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
