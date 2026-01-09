import { useMemo } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import StudyPlanner from "@/components/dashboard/StudyPlanner";
import SubjectsOverview from "@/components/dashboard/SubjectsOverview";
import DailyTasks from "@/components/dashboard/DailyTasks";
import MotivationCard from "@/components/dashboard/MotivationCard";
import { BookOpen, Users, Award, Bell, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDailyTasks } from "@/hooks/use-daily-tasks";

const Dashboard = () => {
  const navigate = useNavigate();
  const { hasIncompleteTasks, completionPercentage } = useDailyTasks();

  // Memoize static content to prevent re-renders
  const statsCards = useMemo(() => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
      <StatsCard
        title="Active Subjects"
        value={6}
        subtitle="Semester 5"
        icon={<BookOpen className="h-5 w-5" />}
        variant="primary"
      />
      <StatsCard
        title="Skill Sessions"
        value={8}
        subtitle="This month"
        icon={<Users className="h-5 w-5" />}
        variant="secondary"
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Scholarships"
        value={20}
        subtitle="Available"
        icon={<Award className="h-5 w-5" />}
        variant="accent"
        onClick={() => navigate('/scholarships')}
      />
      <StatsCard
        title="Notifications"
        value={5}
        subtitle="Unread"
        icon={<Bell className="h-5 w-5" />}
      />
    </div>
  ), [navigate]);

  const aiSuggestionBanner = useMemo(() => (
    <div className="mb-12 rounded-2xl bg-primary-gradient p-8 text-primary-foreground">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-foreground/20">
            <Brain className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold mb-2">AI Study Suggestion</h3>
            <p className="text-primary-foreground/80">
              Based on your progress, focus on Computer Networks Chapter 4 today.
            </p>
          </div>
        </div>
        <Button variant="accent" size="lg" className="px-8">
          Start Studying
        </Button>
      </div>
    </div>
  ), []);

  const quickActions = useMemo(() => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Button 
        variant="outline" 
        className="h-24 flex-col gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
      >
        <BookOpen className="h-6 w-6" />
        <span className="font-medium">Upload Notes</span>
      </Button>
      <Button 
        variant="outline" 
        className="h-24 flex-col gap-3 hover:bg-secondary/5 hover:border-secondary/30 transition-all duration-200"
      >
        <Users className="h-6 w-6" />
        <span className="font-medium">Find Skills</span>
      </Button>
      <Button 
        variant="outline" 
        className="h-24 flex-col gap-3 hover:bg-accent/5 hover:border-accent/30 transition-all duration-200"
        onClick={() => navigate('/scholarships')}
      >
        <Award className="h-6 w-6" />
        <span className="font-medium">Scholarships</span>
      </Button>
      <Button 
        variant="outline" 
        className="h-24 flex-col gap-3 hover:bg-warning/5 hover:border-warning/30 transition-all duration-200"
      >
        <Brain className="h-6 w-6" />
        <span className="font-medium">Ask AI</span>
      </Button>
    </div>
  ), [navigate]);

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle="Welcome back, Raj! Here's your academic overview."
    >
      {/* Stats Grid */}
      {statsCards}

      {/* AI Study Suggestion Banner */}
      {aiSuggestionBanner}

      {/* Daily Tasks Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Daily Tasks</h2>
          <p className="text-muted-foreground">Track your daily academic goals and stay organized</p>
        </div>
        <DailyTasks />
      </div>

      {/* Motivation Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Stay Motivated</h2>
          <p className="text-muted-foreground">Get inspired with personalized motivational quotes</p>
        </div>
        <MotivationCard hasIncompleteTasks={hasIncompleteTasks} />
      </div>

      {/* Study Planner Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Study Planner</h2>
          <p className="text-muted-foreground">Plan your study sessions and track your progress</p>
        </div>
        <StudyPlanner />
      </div>

      {/* Upcoming Events Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground">Stay updated with exams, assignments, and deadlines</p>
        </div>
        <UpcomingEvents />
      </div>

      {/* Quick Actions Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Quick Actions</h2>
          <p className="text-muted-foreground">Access frequently used features with one click</p>
        </div>
        {quickActions}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;