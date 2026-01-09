import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background neural-bg">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-12 md:p-16 lg:p-20 animate-fade-in-scale">
          {/* AI Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl animate-float" />
            <div className="absolute bottom-0 left-1/4 h-40 w-40 rounded-full bg-white/10 blur-2xl animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 h-20 w-20 rounded-full bg-white/20 blur-xl animate-pulse-glow" />
          </div>

          {/* Neural Network Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm mb-6 animate-fade-in-scale interactive-element">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>AI-Powered Learning Platform</span>
            </div>

            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl animate-slide-in-up">
              Ready to Transform Your
              <br />
              <span className="text-yellow-200 animate-shimmer">Academic Journey?</span>
            </h2>

            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              Experience the future of education with AI assistance, smart recommendations,
              and seamless peer connections.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                variant="accent"
                size="xl"
                className="group bg-white text-primary hover:bg-white/90 btn-glow animate-pulse-glow"
                onClick={() => navigate('/dashboard')}
              >
                Start Learning with AI
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => navigate('/features')}
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
