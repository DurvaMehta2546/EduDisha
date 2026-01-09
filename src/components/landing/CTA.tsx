import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-12 md:p-16 lg:p-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Your
              <br />
              Academic Journey?
            </h2>

            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Join thousands of GTU students who are already organizing their academics,
              exchanging skills, and securing scholarships with EduDisha.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/register')}
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => navigate('/features')}
              >
                Learn More
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/60">
              No credit card required • Free forever for students
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
