import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  User,
  Heart,
  BookOpen,
  Target,
  Languages,
  Brain,
  Sparkles,
  CheckCircle
} from "lucide-react";

interface OnboardingData {
  name: string;
  nickname: string;
  ageGroup: string;
  interests: string[];
  moodType: string;
  languageStyle: string;
  goal: string;
  learningStyle: string;
  humorLevel: string;
  studyHabits: string[];
  preferredTime: string;
  motivationLevel: string;
}

interface OnboardingQuestionnaireProps {
  isOpen: boolean;
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const OnboardingQuestionnaire = ({ isOpen, onComplete, onSkip }: OnboardingQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    nickname: '',
    ageGroup: '',
    interests: [],
    moodType: '',
    languageStyle: '',
    goal: '',
    learningStyle: '',
    humorLevel: '',
    studyHabits: [],
    preferredTime: '',
    motivationLevel: ''
  });

  const steps = [
    { title: "Basic Info", icon: User },
    { title: "Personality", icon: Heart },
    { title: "Interests", icon: BookOpen },
    { title: "Learning Style", icon: Brain },
    { title: "Goals", icon: Target },
    { title: "Communication", icon: Languages }
  ];

  const interestOptions = [
    'Technology', 'Music', 'Sports', 'Art', 'Business', 'Science',
    'Literature', 'Fitness', 'Gaming', 'Cooking', 'Photography', 'Dance'
  ];

  const studyHabits = [
    'Early morning study', 'Late night study', 'Regular breaks',
    'Group study', 'Solo study', 'Music while studying', 'Complete silence'
  ];

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Let's get to know you!</h3>
              <p className="text-muted-foreground">Tell us a bit about yourself so we can find the perfect study partners.</p>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => updateData('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="nickname">Nickname (Optional)</Label>
                <Input
                  id="nickname"
                  value={data.nickname}
                  onChange={(e) => updateData('nickname', e.target.value)}
                  placeholder="What do your friends call you?"
                />
              </div>

              <div>
                <Label>Age Group</Label>
                <RadioGroup value={data.ageGroup} onValueChange={(value) => updateData('ageGroup', value)}>
                  <div className="grid grid-cols-2 gap-2">
                    {['18-20', '21-23', '24-26', '27+'].map((age) => (
                      <div key={age} className="flex items-center space-x-2">
                        <RadioGroupItem value={age} id={age} />
                        <Label htmlFor={age}>{age} years</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 1: // Personality
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">What's your vibe?</h3>
              <p className="text-muted-foreground">Help us understand your personality for better matches.</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Mood Type</Label>
                <RadioGroup value={data.moodType} onValueChange={(value) => updateData('moodType', value)}>
                  <div className="grid gap-3">
                    {[
                      { value: 'chill', label: 'Chill & Relaxed', desc: 'Go with the flow, take it easy' },
                      { value: 'motivated', label: 'Motivated & Driven', desc: 'Always pushing forward' },
                      { value: 'funny', label: 'Funny & Light-hearted', desc: 'Love to laugh and joke around' },
                      { value: 'serious', label: 'Serious & Focused', desc: 'Get things done efficiently' }
                    ].map((mood) => (
                      <div key={mood.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value={mood.value} id={mood.value} />
                        <div>
                          <Label htmlFor={mood.value} className="font-medium">{mood.label}</Label>
                          <p className="text-sm text-muted-foreground">{mood.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Humor Level</Label>
                <RadioGroup value={data.humorLevel} onValueChange={(value) => updateData('humorLevel', value)}>
                  <div className="grid gap-2">
                    {[
                      { value: 'none', label: 'No humor please' },
                      { value: 'light', label: 'Light jokes occasionally' },
                      { value: 'moderate', label: 'Love a good laugh' },
                      { value: 'high', label: 'Always cracking jokes!' }
                    ].map((level) => (
                      <div key={level.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={level.value} id={`humor-${level.value}`} />
                        <Label htmlFor={`humor-${level.value}`}>{level.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 2: // Interests
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">What interests you?</h3>
              <p className="text-muted-foreground">Select all that apply to help us find like-minded study partners.</p>
            </div>

            <div>
              <Label>Your Interests</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={data.interests.includes(interest)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateData('interests', [...data.interests, interest]);
                        } else {
                          updateData('interests', data.interests.filter(i => i !== interest));
                        }
                      }}
                    />
                    <Label htmlFor={interest}>{interest}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Learning Style
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">How do you learn best?</h3>
              <p className="text-muted-foreground">Understanding your learning style helps us match you better.</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Learning Style</Label>
                <RadioGroup value={data.learningStyle} onValueChange={(value) => updateData('learningStyle', value)}>
                  <div className="grid gap-3">
                    {[
                      { value: 'visual', label: 'Visual Learner', desc: 'Diagrams, charts, videos' },
                      { value: 'auditory', label: 'Auditory Learner', desc: 'Listening, discussions, podcasts' },
                      { value: 'kinesthetic', label: 'Kinesthetic Learner', desc: 'Hands-on, practical activities' },
                      { value: 'reading', label: 'Reading/Writing Learner', desc: 'Books, notes, articles' }
                    ].map((style) => (
                      <div key={style.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value={style.value} id={style.value} />
                        <div>
                          <Label htmlFor={style.value} className="font-medium">{style.label}</Label>
                          <p className="text-sm text-muted-foreground">{style.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Study Habits</Label>
                <div className="grid grid-cols-1 gap-2 mt-3">
                  {studyHabits.map((habit) => (
                    <div key={habit} className="flex items-center space-x-2">
                      <Checkbox
                        id={habit}
                        checked={data.studyHabits.includes(habit)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateData('studyHabits', [...data.studyHabits, habit]);
                          } else {
                            updateData('studyHabits', data.studyHabits.filter(h => h !== habit));
                          }
                        }}
                      />
                      <Label htmlFor={habit}>{habit}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Goals
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">What's your goal?</h3>
              <p className="text-muted-foreground">Tell us what you want to achieve with EduDisha.</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Primary Goal</Label>
                <RadioGroup value={data.goal} onValueChange={(value) => updateData('goal', value)}>
                  <div className="grid gap-3">
                    {[
                      { value: 'learn', label: 'Learn New Skills', desc: 'Expand my knowledge and abilities' },
                      { value: 'earn', label: 'Earn Money', desc: 'Monetize my skills through teaching' },
                      { value: 'improve', label: 'Improve Grades', desc: 'Get better academic performance' },
                      { value: 'crack_exam', label: 'Crack Competitive Exams', desc: 'Prepare for entrance exams' },
                      { value: 'vibe', label: 'Just Have Fun', desc: 'Connect with like-minded people' }
                    ].map((goal) => (
                      <div key={goal.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value={goal.value} id={goal.value} />
                        <div>
                          <Label htmlFor={goal.value} className="font-medium">{goal.label}</Label>
                          <p className="text-sm text-muted-foreground">{goal.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Motivation Level</Label>
                <RadioGroup value={data.motivationLevel} onValueChange={(value) => updateData('motivationLevel', value)}>
                  <div className="grid gap-2">
                    {[
                      { value: 'low', label: 'Need gentle encouragement' },
                      { value: 'medium', label: 'Moderately motivated' },
                      { value: 'high', label: 'Highly self-motivated' },
                      { value: 'ultra', label: 'Extremely driven!' }
                    ].map((level) => (
                      <div key={level.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={level.value} id={`motivation-${level.value}`} />
                        <Label htmlFor={`motivation-${level.value}`}>{level.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 5: // Communication
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Languages className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Communication Preferences</h3>
              <p className="text-muted-foreground">How do you like to communicate and when?</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Language Style</Label>
                <RadioGroup value={data.languageStyle} onValueChange={(value) => updateData('languageStyle', value)}>
                  <div className="grid gap-3">
                    {[
                      { value: 'english', label: 'English Only', desc: 'Prefer formal English communication' },
                      { value: 'hinglish', label: 'Hinglish', desc: 'Mix of Hindi and English' },
                      { value: 'hindi', label: 'Hindi', desc: 'Prefer Hindi language' },
                      { value: 'slang', label: 'Slang/Colloquial', desc: 'Casual, trendy language' }
                    ].map((style) => (
                      <div key={style.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value={style.value} id={style.value} />
                        <div>
                          <Label htmlFor={style.value} className="font-medium">{style.label}</Label>
                          <p className="text-sm text-muted-foreground">{style.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Preferred Study Time</Label>
                <RadioGroup value={data.preferredTime} onValueChange={(value) => updateData('preferredTime', value)}>
                  <div className="grid gap-2">
                    {[
                      { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
                      { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
                      { value: 'evening', label: 'Evening (6 PM - 10 PM)' },
                      { value: 'night', label: 'Night (10 PM - 2 AM)' }
                    ].map((time) => (
                      <div key={time.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={time.value} id={`time-${time.value}`} />
                        <Label htmlFor={`time-${time.value}`}>{time.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Welcome to EduDisha!
          </DialogTitle>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="py-6">
          {renderStepContent()}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onSkip : prevStep}
          >
            {currentStep === 0 ? 'Skip for now' : 'Previous'}
          </Button>

          <Button
            onClick={nextStep}
            disabled={
              (currentStep === 0 && !data.name) ||
              (currentStep === 1 && !data.moodType) ||
              (currentStep === 2 && data.interests.length === 0) ||
              (currentStep === 3 && !data.learningStyle) ||
              (currentStep === 4 && !data.goal) ||
              (currentStep === 5 && !data.languageStyle)
            }
          >
            {currentStep === steps.length - 1 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Setup
              </>
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingQuestionnaire;