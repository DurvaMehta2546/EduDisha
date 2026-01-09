import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { aiProfileService } from "@/services/aiProfile.service";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

const AIAssistant = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with personalized greeting
  useEffect(() => {
    if (user?.id) {
      const greeting = aiProfileService.getPersonalizedGreeting(user.id);
      const hasProfile = aiProfileService.hasProfile(user.id);
      
      let initialMessage = greeting;
      if (!hasProfile) {
        initialMessage += "\n\nI notice you haven't completed your profile yet. Complete it in the Profile tab so I can provide personalized assistance based on your learning style and preferences!";
      } else {
        const recommendations = aiProfileService.getStudyRecommendations(user.id);
        if (recommendations.length > 0) {
          initialMessage += "\n\n" + recommendations[0];
        }
      }

      setMessages([{
        id: '1',
        content: initialMessage,
        sender: 'ai',
        timestamp: new Date(),
      }]);
    } else {
      setMessages([{
        id: '1',
        content: "Hi! I'm EduBot, your AI learning assistant. Please log in to get personalized assistance based on your learning preferences.",
        sender: 'ai',
        timestamp: new Date(),
      }]);
    }
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual Gemini API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Get user profile for personalized responses
    const profile = user?.id ? aiProfileService.getStudentProfile(user.id) : null;
    const commPrefs = user?.id ? aiProfileService.getCommunicationPreferences(user.id) : null;
    
    // Personalize response based on communication preferences
    let responsePrefix = "";
    if (profile) {
      const name = profile.studentProfile.personalInfo.name;
      if (commPrefs?.tone === 'Chill') {
        responsePrefix = `Hey ${name}! `;
      } else if (commPrefs?.tone === 'Motivated') {
        responsePrefix = `${name}, let's tackle this! `;
      } else if (commPrefs?.tone === 'Funny') {
        responsePrefix = `${name}, great question! 😄 `;
      } else {
        responsePrefix = `${name}, `;
      }
    }

    if (input.includes('profile') || input.includes('complete profile')) {
      if (!profile) {
        return responsePrefix + "I'd love to help you better! Please complete your profile in the Profile tab. It helps me understand your learning style, communication preferences, and goals so I can provide personalized assistance.";
      } else {
        return responsePrefix + "Great! I can see your profile is complete. This helps me provide personalized responses based on your learning style and preferences. Is there anything specific you'd like to update?";
      }
    }

    if (input.includes('scholarship') || input.includes('scholarships')) {
      let response = "Great question about scholarships! EduDisha has a comprehensive scholarship database.";
      if (profile) {
        const year = profile.studentProfile.personalInfo.academicYear;
        response += ` Based on your profile (${year}), I can help you find relevant scholarships.`;
      }
      return responsePrefix + response + " Would you like me to help you search for specific scholarships or explain the application process?";
    }

    if (input.includes('skill') || input.includes('skills')) {
      let response = "Skills development is crucial for GTU students! Our platform offers skill exchange where you can teach others what you're good at and learn new skills.";
      if (profile) {
        const interests = profile.studentProfile.learningPreferences.interests;
        const teachingInterest = profile.studentProfile.socialPreferences.teachingInterest;
        
        if (interests.length > 0) {
          response += ` I see you're interested in ${interests.join(", ")}.`;
        }
        
        if (teachingInterest === 'Yes, confident') {
          response += " You seem ready to mentor others!";
        } else if (teachingInterest === 'Yes, but beginner') {
          response += " You could start by helping peers with basics.";
        }
      }
      return responsePrefix + response + " What skill are you interested in learning or teaching?";
    }

    if (input.includes('academic') || input.includes('study') || input.includes('exam')) {
      let response = "Academic success is our priority! EduDisha helps you organize your study materials, track assignments, and connect with study groups.";
      if (profile) {
        const studyStyle = profile.studentProfile.learningPreferences.studyStyle;
        const pace = profile.studentProfile.learningPreferences.learningPace;
        const goal = profile.studentProfile.learningPreferences.currentGoal;
        
        response += ` Based on your profile, I know you prefer ${studyStyle.toLowerCase()} and learn at a ${pace.toLowerCase()} pace.`;
        
        if (goal === 'Crack exams') {
          response += " Since your goal is to crack exams, I recommend focusing on practice tests and revision notes.";
        }
      }
      return responsePrefix + response + " What subject or topic are you working on?";
    }

    if (input.includes('motivation') || input.includes('motivate')) {
      let response = "Staying motivated is key to success! Our motivation section has daily quotes, success stories from GTU alumni, and tips for maintaining focus.";
      if (profile) {
        const motivationType = profile.studentProfile.learningPreferences.motivationType;
        
        if (motivationType === 'Competition') {
          response += " I know you're motivated by competition - try joining study challenges!";
        } else if (motivationType === 'Self-growth') {
          response += " Your focus on self-growth is admirable - every step forward counts!";
        } else if (motivationType === 'Rewards / recognition') {
          response += " You're motivated by recognition - check out our badge system!";
        }
      }
      return responsePrefix + response + " What's been challenging you lately?";
    }

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      if (profile) {
        return aiProfileService.getPersonalizedGreeting(user!.id) + " What can I help you with today?";
      }
      return responsePrefix + "Hello! 👋 I'm EduBot, your friendly AI assistant for EduDisha. I'm here to help you navigate your academic journey, find resources, and achieve your goals. What would you like to know about our platform or GTU studies?";
    }

    if (input.includes('recommend') || input.includes('suggestion')) {
      if (profile) {
        const recommendations = aiProfileService.getStudyRecommendations(user!.id);
        return responsePrefix + "Here are some personalized recommendations for you:\n\n" + recommendations.join("\n");
      }
    }

    let response = "That's an interesting question! While I'm still learning about all aspects of GTU education, I'd be happy to help you find relevant resources on EduDisha.";
    if (profile) {
      const explanationPref = profile.studentProfile.communicationStyle.explanationPreference;
      if (explanationPref === 'Simple & short') {
        response = "Good question! I can help you find what you need on EduDisha.";
      } else if (explanationPref === 'Detailed & deep') {
        response += " I can provide comprehensive guidance based on your learning preferences.";
      }
    }
    
    return responsePrefix + response + " Could you tell me more about what you're looking for? I can guide you to scholarships, skill exchanges, academic planning, or motivation content.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-primary to-accent group"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={cn(
        "bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300 ease-out",
        isMinimized ? "w-80 h-16" : "w-80 h-[500px]"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">EduBot</h3>
              <p className="text-xs text-muted-foreground">AI Learning Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-[380px]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === 'ai' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    )}>
                      {message.isTyping ? (
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      ) : (
                        <p className="leading-relaxed">{message.content}</p>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-secondary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-2">
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-primary animate-spin" />
                        <span className="text-sm text-muted-foreground">EduBot is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about EduDisha..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3 hover:scale-105 transition-transform"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by Gemini AI • Ask about academics, skills, scholarships
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;