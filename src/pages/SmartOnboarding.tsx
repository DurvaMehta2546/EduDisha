import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  User, 
  Calendar, 
  GraduationCap, 
  Target, 
  Heart, 
  BookOpen, 
  Clock, 
  Brain, 
  MessageCircle, 
  Users, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle,
  Loader2
} from "lucide-react";
import { animations, createDelayedAnimation } from "@/lib/animations";
import { spacing, typography } from "@/lib/responsive";
import AnimatedCard from "@/components/common/AnimatedCard";

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
}

const SmartOnboarding = () => {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    ageGroup: "",
    academicYear: "",
    interests: [],
    currentGoal: "",
    motivationType: "",
    studyStyle: "",
    learningPace: "",
    bestStudyTime: "",
    stuckFrequency: "",
    moodType: "",
    languageStyle: "",
    explanationPreference: "",
    teachingInterest: "",
    peerInteractionComfort: ""
  });

  const totalSteps = 15;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("Authentication required. Please log in again.");
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      // Save onboarding data to local storage
      const onboardingData = {
        ...formData,
        userId: user.id,
        completedAt: new Date().toISOString()
      };

      // Store in local storage
      localStorage.setItem(`edudisha_onboarding_${user.id}`, JSON.stringify(onboardingData));
      
      // Mark onboarding as completed in auth context
      completeOnboarding();
      
      toast.success(`Welcome ${formData.name}! Your personalized experience is ready.`);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast.error("Failed to save your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof OnboardingData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.interests;
    if (currentInterests.includes(interest)) {
      updateFormData('interests', currentInterests.filter(i => i !== interest));
    } else if (currentInterests.length < 3) {
      updateFormData('interests', [...currentInterests, interest]);
    }
  };

  const steps = [
    // Step 1: Name
    {
      title: "What should we call you?",
      subtitle: "Let's start with your name or nickname",
      icon: <User className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name or nickname"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      )
    },
    // Step 2: Age Group
    {
      title: "Your age group?",
      subtitle: "This helps us adjust our communication style",
      icon: <Calendar className="h-6 w-6" />,
      content: (
        <div className="grid grid-cols-2 gap-3">
          {["Under 18", "18–20", "21–23", "24+"].map((age) => (
            <Button
              key={age}
              variant={formData.ageGroup === age ? "default" : "outline"}
              onClick={() => updateFormData('ageGroup', age)}
              className="h-12 text-sm"
            >
              {age}
            </Button>
          ))}
        </div>
      )
    },
    // Step 3: Academic Year
    {
      title: "Your current GTU year?",
      subtitle: "We'll customize content based on your academic level",
      icon: <GraduationCap className="h-6 w-6" />,
      content: (
        <div className="grid grid-cols-2 gap-3">
          {["1st Year", "2nd Year", "3rd Year", "Final Year"].map((year) => (
            <Button
              key={year}
              variant={formData.academicYear === year ? "default" : "outline"}
              onClick={() => updateFormData('academicYear', year)}
              className="h-12 text-sm"
            >
              {year}
            </Button>
          ))}
        </div>
      )
    },
    // Step 4: Interests
    {
      title: "What are you mostly interested in?",
      subtitle: "Select up to 3 areas that excite you most",
      icon: <Heart className="h-6 w-6" />,
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            "Tech / Coding",
            "Core subjects", 
            "Business / Startup",
            "Music / Creative",
            "Fitness / Sports",
            "Other"
          ].map((interest) => (
            <Button
              key={interest}
              variant={formData.interests.includes(interest) ? "default" : "outline"}
              onClick={() => toggleInterest(interest)}
              disabled={!formData.interests.includes(interest) && formData.interests.length >= 3}
              className="h-12 text-sm"
            >
              {interest}
              {formData.interests.includes(interest) && (
                <CheckCircle className="h-4 w-4 ml-2" />
              )}
            </Button>
          ))}
        </div>
      )
    },
    // Step 5: Main Goal
    {
      title: "What's your main goal right now?",
      subtitle: "This helps us prioritize features for you",
      icon: <Target className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          {[
            "Crack exams",
            "Learn a new skill",
            "Teach & help others",
            "Build projects",
            "Just exploring / vibing"
          ].map((goal) => (
            <Button
              key={goal}
              variant={formData.currentGoal === goal ? "default" : "outline"}
              onClick={() => updateFormData('currentGoal', goal)}
              className="w-full h-12 justify-start text-sm"
            >
              {goal}
            </Button>
          ))}
        </div>
      )
    },
    // Step 6: Motivation Type
    {
      title: "What motivates you the most?",
      subtitle: "We'll use this to encourage you effectively",
      icon: <Sparkles className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          {[
            "Deadlines",
            "Competition", 
            "Rewards / recognition",
            "Helping others",
            "Self-growth"
          ].map((motivation) => (
            <Button
              key={motivation}
              variant={formData.motivationType === motivation ? "default" : "outline"}
              onClick={() => updateFormData('motivationType', motivation)}
              className="w-full h-12 justify-start text-sm"
            >
              {motivation}
            </Button>
          ))}
        </div>
      )
    },
    // Step 7: Study Style
    {
      title: "How do you usually study?",
      subtitle: "This helps us recommend the right study approach",
      icon: <BookOpen className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          {[
            "Short focused sessions",
            "Long deep study sessions",
            "Last-minute preparation", 
            "Only when needed"
          ].map((style) => (
            <Button
              key={style}
              variant={formData.studyStyle === style ? "default" : "outline"}
              onClick={() => updateFormData('studyStyle', style)}
              className="w-full h-12 justify-start text-sm"
            >
              {style}
            </Button>
          ))}
        </div>
      )
    },
    // Step 8: Learning Pace
    {
      title: "Your learning pace is more like...",
      subtitle: "We'll adjust content difficulty accordingly",
      icon: <Clock className="h-6 w-6" />,
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            "Slow & steady",
            "Moderate",
            "Fast learner", 
            "Depends on subject"
          ].map((pace) => (
            <Button
              key={pace}
              variant={formData.learningPace === pace ? "default" : "outline"}
              onClick={() => updateFormData('learningPace', pace)}
              className="h-12 text-sm"
            >
              {pace}
            </Button>
          ))}
        </div>
      )
    },
    // Step 9: Best Study Time
    {
      title: "When do you study best?",
      subtitle: "We'll send reminders at your optimal time",
      icon: <Clock className="h-6 w-6" />,
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            "Early morning",
            "Afternoon", 
            "Night",
            "Random 😅"
          ].map((time) => (
            <Button
              key={time}
              variant={formData.bestStudyTime === time ? "default" : "outline"}
              onClick={() => updateFormData('bestStudyTime', time)}
              className="h-12 text-sm"
            >
              {time}
            </Button>
          ))}
        </div>
      )
    },
    // Step 10: Stuck Frequency
    {
      title: "How often do you feel stuck while studying?",
      subtitle: "This helps us provide the right level of support",
      icon: <Brain className="h-6 w-6" />,
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            "Very often",
            "Sometimes",
            "Rarely", 
            "Almost never"
          ].map((frequency) => (
            <Button
              key={frequency}
              variant={formData.stuckFrequency === frequency ? "default" : "outline"}
              onClick={() => updateFormData('stuckFrequency', frequency)}
              className="h-12 text-sm"
            >
              {frequency}
            </Button>
          ))}
        </div>
      )
    },
    // Step 11: Mood Type
    {
      title: "Your usual mood type?",
      subtitle: "We'll match our communication to your vibe",
      icon: <Heart className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          {[
            "Chill",
            "Motivated",
            "Funny", 
            "Serious",
            "Mood swings 😭"
          ].map((mood) => (
            <Button
              key={mood}
              variant={formData.moodType === mood ? "default" : "outline"}
              onClick={() => updateFormData('moodType', mood)}
              className="w-full h-12 justify-start text-sm"
            >
              {mood}
            </Button>
          ))}
        </div>
      )
    },
    // Step 12: Language Style
    {
      title: "Preferred language style?",
      subtitle: "We'll communicate in your preferred style",
      icon: <MessageCircle className="h-6 w-6" />,
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            "Hindi",
            "Hinglish",
            "English", 
            "Mix of everything"
          ].map((language) => (
            <Button
              key={language}
              variant={formData.languageStyle === language ? "default" : "outline"}
              onClick={() => updateFormData('languageStyle', language)}
              className="h-12 text-sm"
            >
              {language}
            </Button>
          ))}
        </div>
      )
    },
    // Step 13: Explanation Preference
    {
      title: "How do you prefer explanations?",
      subtitle: "We'll tailor our teaching style to match",
      icon: <Brain className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          {[
            "Simple & short",
            "Detailed & deep",
            "With examples", 
            "Visual / step-by-step"
          ].map((preference) => (
            <Button
              key={preference}
              variant={formData.explanationPreference === preference ? "default" : "outline"}
              onClick={() => updateFormData('explanationPreference', preference)}
              className="w-full h-12 justify-start text-sm"
            >
              {preference}
            </Button>
          ))}
        </div>
      )
    },
    // Step 14: Teaching Interest
    {
      title: "Are you interested in teaching a skill?",
      subtitle: "This determines your role in skill exchange",
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          {[
            "Yes, confident",
            "Yes, but beginner",
            "Maybe later", 
            "Not right now"
          ].map((interest) => (
            <Button
              key={interest}
              variant={formData.teachingInterest === interest ? "default" : "outline"}
              onClick={() => updateFormData('teachingInterest', interest)}
              className="w-full h-12 justify-start text-sm"
            >
              {interest}
            </Button>
          ))}
        </div>
      )
    },
    // Step 15: Peer Interaction Comfort
    {
      title: "How comfortable are you interacting with peers online?",
      subtitle: "This helps us match you with compatible study partners",
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          {[
            "Very comfortable",
            "Okay-ish",
            "Slightly nervous", 
            "Prefer chat only"
          ].map((comfort) => (
            <Button
              key={comfort}
              variant={formData.peerInteractionComfort === comfort ? "default" : "outline"}
              onClick={() => updateFormData('peerInteractionComfort', comfort)}
              className="w-full h-12 justify-start text-sm"
            >
              {comfort}
            </Button>
          ))}
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const canProceed = () => {
    const step = currentStep;
    switch (step) {
      case 0: return formData.name.trim() !== "";
      case 1: return formData.ageGroup !== "";
      case 2: return formData.academicYear !== "";
      case 3: return formData.interests.length > 0;
      case 4: return formData.currentGoal !== "";
      case 5: return formData.motivationType !== "";
      case 6: return formData.studyStyle !== "";
      case 7: return formData.learningPace !== "";
      case 8: return formData.bestStudyTime !== "";
      case 9: return formData.stuckFrequency !== "";
      case 10: return formData.moodType !== "";
      case 11: return formData.languageStyle !== "";
      case 12: return formData.explanationPreference !== "";
      case 13: return formData.teachingInterest !== "";
      case 14: return formData.peerInteractionComfort !== "";
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 study-pattern">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          {...animations.fadeIn}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/30">
              <img 
                src="/logo.svg" 
                alt="EduDisha Logo" 
                className="h-8 w-8" 
              />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">EduDisha Smart Onboarding</h1>
          </div>
          <p className="text-muted-foreground">
            Help us personalize your learning experience in just 15 quick questions
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-8"
          {...createDelayedAnimation(0.2)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedCard className="p-8">
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {currentStepData.icon}
                    </div>
                  </div>
                  <CardTitle className={`${typography.h2} mb-2`}>
                    {currentStepData.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {currentStepData.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  {currentStepData.content}
                </CardContent>
              </AnimatedCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div 
            className="flex items-center justify-between mt-8"
            {...createDelayedAnimation(0.4)}
          >
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  {isLastStep ? "Complete Setup" : "Next"}
                  {!isLastStep && <ChevronRight className="h-4 w-4" />}
                </>
              )}
            </Button>
          </motion.div>

          {/* Skip Option */}
          {currentStep > 2 && (
            <motion.div 
              className="text-center mt-4"
              {...createDelayedAnimation(0.6)}
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-muted-foreground hover:text-foreground"
              >
                Skip for now
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartOnboarding;