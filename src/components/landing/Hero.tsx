import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { animations, createDelayedAnimation } from "@/lib/animations";
import { spacing, typography, layout } from "@/lib/responsive";
import AnimatedButton from "@/components/common/AnimatedButton";

const Hero = () => {
  const navigate = useNavigate();

  const goToFeatures = () => {
    navigate('/features');
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" 
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-gradient-to-br from-accent/15 to-secondary/15 blur-2xl" 
        />
      </div>

      {/* Animated Grid Pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[linear-gradient(rgba(53,167,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(53,167,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" 
      />

      <div className={`container relative z-10 mx-auto ${spacing.container} ${spacing.section}`}>
        <div className={`${layout.grid.cards} ${spacing.gap.lg} items-center min-h-screen`}>
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left lg:col-span-2"
            {...animations.staggerContainer}
          >
            {/* Animated Badge */}
            <motion.div 
              {...createDelayedAnimation(0.2)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/15 to-accent/15 px-4 py-2 text-sm text-primary backdrop-blur-sm mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <span className="font-medium">Built for GTU Students</span>
            </motion.div>

            {/* Animated Headline */}
            <motion.div 
              {...createDelayedAnimation(0.4)}
              className={`${typography.h1} leading-tight text-foreground mb-6`}
            >
              Your Academic
              <br />
              <motion.span 
                className="text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                Journey,
              </motion.span>
              <br />
              Simplified
            </motion.div>

            {/* Animated Subheadline */}
            <motion.p 
              {...createDelayedAnimation(0.6)}
              className={`${typography.body} text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed`}
            >
              Organize academics, exchange skills with peers, and never miss a 
              scholarship deadline. All in one powerful platform designed for your success.
            </motion.p>

            {/* Animated CTA Buttons */}
            <motion.div 
              {...createDelayedAnimation(0.8)}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <AnimatedButton
                onClick={() => navigate('/register')}
                className="group bg-gradient-to-r from-primary via-accent to-secondary hover:from-primary/90 hover:via-accent/90 hover:to-secondary/90"
              >
                Get Started Free
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5 ml-2" />
                </motion.div>
              </AnimatedButton>
              
              <AnimatedButton
                variant="outline"
                onClick={goToFeatures}
                className="border-primary/40 hover:border-primary/60 hover:bg-primary/10"
              >
                Explore Features
              </AnimatedButton>
            </motion.div>

            {/* Animated Stats */}
            <motion.div 
              {...createDelayedAnimation(1.0)}
              className={`${layout.grid.stats} ${spacing.gap.md}`}
            >
              {[
                { value: "1000+", label: "Students", delay: 0 },
                { value: "50+", label: "Skills Shared", delay: 0.1 },
                { value: "₹50L+", label: "Scholarships", delay: 0.2 },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.2 + stat.delay,
                    ease: "easeOut"
                  }}
                  className="text-center lg:text-left"
                >
                  <motion.div 
                    className={`${typography.h3} text-foreground font-bold`}
                    animate={{ 
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.5 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className={`${typography.small} text-muted-foreground`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Feature Cards */}
          <motion.div 
            className="relative hidden lg:block"
            {...animations.staggerContainer}
          >
            <div className="relative space-y-6">
              {/* Card 1 - Academic Dashboard */}
              <motion.div 
                {...createDelayedAnimation(1.2)}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  boxShadow: "0 25px 50px rgba(53, 167, 255, 0.25)"
                }}
                className="ml-auto w-80 rounded-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 shadow-xl border border-primary/20 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BookOpen className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Academic Dashboard</h3>
                    <p className="text-sm text-muted-foreground">All subjects, one view</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Skill Exchange */}
              <motion.div 
                {...createDelayedAnimation(1.4)}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: -2,
                  boxShadow: "0 25px 50px rgba(255, 89, 100, 0.25)"
                }}
                className="w-80 rounded-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 shadow-xl border border-accent/20 cursor-pointer"
                onClick={() => navigate('/skills')}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-lg"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Skill Exchange</h3>
                    <p className="text-sm text-muted-foreground">Learn from peers via Meet</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Scholarships */}
              <motion.div 
                {...createDelayedAnimation(1.6)}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 1,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                }}
                className="ml-auto w-80 rounded-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 shadow-xl border border-secondary/20 cursor-pointer"
                onClick={() => navigate('/scholarships')}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Scholarship Hub</h3>
                    <p className="text-sm text-muted-foreground">Never miss deadlines</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -right-4 top-1/2 h-32 w-32 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-3xl" 
            />
          </motion.div>
        </div>
      </div>

      {/* Animated Bottom Wave */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2 }}
            d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;