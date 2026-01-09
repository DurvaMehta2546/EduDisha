import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-12 md:p-16 lg:p-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Join 10,000+ GTU Students</span>
            </div>

            <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to Transform Your
              <br />
              Academic Journey?
            </h2>

            <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Stop juggling multiple platforms. Get organized, connect with peers, 
              and never miss an opportunity again.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="accent" 
                size="xl" 
                className="group"
                onClick={() => navigate('/dashboard')}
              >
                Start for Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl"
                onClick={() => navigate('/dashboard')}
              >
                See Demo
              </Button>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              No credit card required • Free forever for students
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
