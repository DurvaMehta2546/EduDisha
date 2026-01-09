import { useMemo } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import StudyPlanner from "@/components/dashboard/StudyPlanner";
import DailyTasks from "@/components/dashboard/DailyTasks";
import MotivationCard from "@/components/dashboard/MotivationCard";
import PersonalizedDashboard from "@/components/dashboard/PersonalizedDashboard";
import { BookOpen, Users, Award, Bell, Brain, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDailyTasks } from "@/hooks/use-daily-tasks";
import { useAuth } from "@/contexts/AuthContext";
import { animations, createDelayedAnimation } from "@/lib/animations";
import { spacing, layout } from "@/lib/responsive";
import AnimatedCard from "@/components/common/AnimatedCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, needsOnboarding } = useAuth();
  const { hasIncompleteTasks } = useDailyTasks();

  // Show personalized dashboard if onboarding is completed, but still include all sections
  const showPersonalizedHeader = user && !needsOnboarding;

  // Memoize static content to prevent re-renders
  const statsCards = useMemo(() => (
    <motion.div 
      className={`${layout.grid.stats} ${spacing.gap.md} ${spacing.mb.md}`}
      {...animations.staggerContainer}
    >
      {[
        {
          title: "Active Subjects",
          value: 6,
          subtitle: "Semester 5",
          icon: <BookOpen className="h-5 w-5" />,
          variant: "primary" as const,
          delay: 0
        },
        {
          title: "Skill Sessions",
          value: 8,
          subtitle: "This month",
          icon: <Users className="h-5 w-5" />,
          variant: "secondary" as const,
          trend: { value: 12, isPositive: true },
          delay: 0.1
        },
        {
          title: "Scholarships",
          value: 20,
          subtitle: "Available",
          icon: <Award className="h-5 w-5" />,
          variant: "accent" as const,
          onClick: () => navigate('/scholarships'),
          delay: 0.2
        },
        {
          title: "Notifications",
          value: 5,
          subtitle: "Unread",
          icon: <Bell className="h-5 w-5" />,
          variant: "default" as const,
          delay: 0.3
        }
      ].map((stat, index) => (
        <motion.div
          key={stat.title}
          {...createDelayedAnimation(stat.delay)}
        >
          <StatsCard
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            variant={stat.variant}
            trend={stat.trend}
            onClick={stat.onClick}
          />
        </motion.div>
      ))}
    </motion.div>
  ), [navigate]);

  const aiSuggestionBanner = useMemo(() => (
    <AnimatedCard 
      delay={0.4}
      className={`${spacing.mb.md} bg-gradient-to-r from-primary/15 to-accent/15 border-primary/30`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8">
        <div className="flex items-center gap-6">
          <motion.div 
            className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Brain className="h-8 w-8" />
          </motion.div>
          <div>
            <motion.h3 
              className="font-display text-xl font-semibold mb-2 text-foreground"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
            >
              AI Study Suggestion
            </motion.h3>
            <motion.p 
              className="text-muted-foreground"
              {...createDelayedAnimation(0.1)}
            >
              Based on your progress, focus on Computer Networks Chapter 4 today.
            </motion.p>
          </div>
        </div>
        <Button className="px-8 bg-gradient-to-r from-primary via-accent to-secondary hover:from-primary/90 hover:via-accent/90 hover:to-secondary/90">
          Start Studying
        </Button>
      </div>
    </AnimatedCard>
  ), []);

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle={showPersonalizedHeader ? `Welcome back, ${user.name}! Here's your personalized overview.` : "Welcome back, buddy! Here's your academic overview."}
    >
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/dashboard-bg.jpg')`
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Personalized Header Section */}
          {showPersonalizedHeader && (
            <motion.div {...createDelayedAnimation(0.1)} className="mb-8">
              <PersonalizedDashboard />
            </motion.div>
          )}

          {/* Stats Grid */}
          {statsCards}

          {/* AI Study Suggestion Banner */}
          {aiSuggestionBanner}

          {/* Daily Tasks Section */}
          <motion.div 
            className={spacing.mb.md}
            {...createDelayedAnimation(0.6)}
          >
            <motion.div className={spacing.mb.sm}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Daily Tasks</h2>
              <p className="text-muted-foreground">Track your daily academic goals and stay organized</p>
            </motion.div>
            <DailyTasks />
          </motion.div>

          {/* Motivation Section */}
          <motion.div 
            className={spacing.mb.md}
            {...createDelayedAnimation(0.8)}
          >
            <motion.div className={spacing.mb.sm}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Stay Motivated</h2>
              <p className="text-muted-foreground">Get inspired with personalized motivational quotes</p>
            </motion.div>
            <MotivationCard hasIncompleteTasks={hasIncompleteTasks} />
          </motion.div>

          {/* Study Planner Section */}
          <motion.div 
            className={spacing.mb.md}
            {...createDelayedAnimation(1.0)}
          >
            <motion.div className={spacing.mb.sm}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Study Planner</h2>
              <p className="text-muted-foreground">Plan your study sessions and track your progress</p>
            </motion.div>
            <StudyPlanner />
          </motion.div>

          {/* Upcoming Events Section */}
          <motion.div 
            className={spacing.mb.md}
            {...createDelayedAnimation(1.2)}
          >
            <motion.div className={spacing.mb.sm}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground">Stay updated with exams, assignments, and deadlines</p>
            </motion.div>
            <UpcomingEvents />
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div 
            className={spacing.mb.md}
            {...createDelayedAnimation(1.4)}
          >
            <motion.div className={spacing.mb.sm}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Quick Actions</h2>
              <p className="text-muted-foreground">Access frequently used features with one click</p>
            </motion.div>
            <motion.div 
              className={`${layout.grid.stats} ${spacing.gap.md}`}
              {...animations.staggerContainer}
            >
              {[
                { icon: BookOpen, label: "Upload Notes", delay: 0 },
                { icon: Users, label: "Find Skills", delay: 0.1 },
                { icon: Award, label: "Scholarships", onClick: () => navigate('/scholarships'), delay: 0.2 },
                { icon: User, label: "Complete Profile", onClick: () => navigate('/profile'), delay: 0.3 }
              ].map((action) => (
                <motion.div
                  key={action.label}
                  {...createDelayedAnimation(action.delay)}
                >
                  <Button
                    variant="outline"
                    onClick={action.onClick}
                    className="h-24 w-full flex-col gap-3 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
                  >
                    <action.icon className="h-6 w-6" />
                    <span className="font-medium">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;