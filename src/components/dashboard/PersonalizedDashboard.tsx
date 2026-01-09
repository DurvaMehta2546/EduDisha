import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  Target, 
  BookOpen, 
  Users, 
  Brain, 
  Calendar,
  Sparkles,
  TrendingUp,
  Edit3
} from "lucide-react";
import { motion } from "framer-motion";
import { animations, createDelayedAnimation } from "@/lib/animations";

interface OnboardingData {
  name: string;
  ageGroup: string;
  academicYear: string;
  interests: string[];
  currentGoal: string;
  motivationType: string;
  studyStyle: string;
  learningPace: string;
  bestStudyTime: string;
  stuckFrequency: string;
  moodType: string;
  languageStyle: string;
  explanationPreference: string;
  teachingInterest: string;
  peerInteractionComfort: string;
  userId: string;
  completedAt: string;
}

const PersonalizedDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPersonalizationData = async () => {
      if (!user?.id) return;

      try {
        // Load from local storage
        const storedData = localStorage.getItem(`edudisha_onboarding_${user.id}`);
        if (storedData) {
          const data = JSON.parse(storedData);
          setOnboardingData(data);
        }
      } catch (error) {
        console.error("Error loading personalization data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPersonalizationData();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-muted rounded-2xl mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 bg-muted rounded-xl"></div>
            <div className="h-24 bg-muted rounded-xl"></div>
            <div className="h-24 bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!onboardingData) {
    return (
      <Card className="p-8 text-center">
        <CardContent>
          <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
          <p className="text-muted-foreground mb-4">
            Help us personalize your experience by completing the onboarding process.
          </p>
          <Button onClick={() => navigate('/profile')}>
            Complete Setup
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = onboardingData.name;
    
    if (hour < 12) return `Good morning, ${name}! ☀️`;
    if (hour < 17) return `Good afternoon, ${name}! 🌤️`;
    return `Good evening, ${name}! 🌙`;
  };

  const getMotivationalMessage = () => {
    const { motivationType, currentGoal, moodType } = onboardingData;
    
    if (motivationType === 'Competition') {
      return "You're in the top 20% of active learners this week! 🏆";
    } else if (motivationType === 'Self-growth') {
      return "Every step forward is progress. Keep growing! 🌱";
    } else if (motivationType === 'Rewards / recognition') {
      return "You've earned 3 new badges this week! ⭐";
    }
    
    return "You're doing great! Keep up the momentum! 💪";
  };

  const getStudyTimeRecommendation = () => {
    const { bestStudyTime, studyStyle } = onboardingData;
    const now = new Date().getHours();
    
    if (bestStudyTime === 'Early morning' && now >= 6 && now <= 9) {
      return "Perfect time for your focused study session! 🎯";
    } else if (bestStudyTime === 'Night' && now >= 20) {
      return "Your peak study hours are here! 🌙";
    } else if (bestStudyTime === 'Afternoon' && now >= 12 && now <= 17) {
      return "Great afternoon energy for learning! ☀️";
    }
    
    return `Your best study time is ${bestStudyTime.toLowerCase()}`;
  };

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Card */}
      <motion.div {...createDelayedAnimation(0.1)}>
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {getGreeting()}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getMotivationalMessage()}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {onboardingData.academicYear}
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    {onboardingData.currentGoal}
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                    {onboardingData.learningPace}
                  </Badge>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center gap-2">
                <Sparkles className="h-16 w-16 text-primary/30" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-3 w-3" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personalized Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        {...createDelayedAnimation(0.2)}
      >
        {/* Study Time Recommendation */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {getStudyTimeRecommendation()}
            </p>
          </CardContent>
        </Card>

        {/* Learning Focus */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              <CardTitle className="text-sm font-medium">Current Focus</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {onboardingData.interests.slice(0, 2).join(" & ")}
            </p>
          </CardContent>
        </Card>

        {/* Study Style */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              <CardTitle className="text-sm font-medium">Study Style</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {onboardingData.studyStyle}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personalized Recommendations */}
      <motion.div {...createDelayedAnimation(0.3)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Based on your preferences</h4>
              <ul className="space-y-2">
                <li className="text-sm flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-primary" />
                  Study during {onboardingData.bestStudyTime.toLowerCase()} for best results
                </li>
                <li className="text-sm flex items-center gap-2">
                  <BookOpen className="h-3 w-3 text-accent" />
                  Use {onboardingData.studyStyle.toLowerCase()} approach
                </li>
                <li className="text-sm flex items-center gap-2">
                  <Users className="h-3 w-3 text-secondary" />
                  {onboardingData.teachingInterest === 'Yes, confident' 
                    ? 'Ready to mentor others in skill exchange'
                    : 'Focus on learning from peers first'
                  }
                </li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="text-xs">
                Communication: {onboardingData.languageStyle}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Pace: {onboardingData.learningPace}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Style: {onboardingData.explanationPreference}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PersonalizedDashboard;