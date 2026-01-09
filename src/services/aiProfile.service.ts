// AI Profile Service - Provides student profile data to AI assistant
export interface StudentProfile {
  userId: string;
  studentProfile: {
    personalInfo: {
      name: string;
      ageGroup: string;
      academicYear: string;
    };
    learningPreferences: {
      interests: string[];
      currentGoal: string;
      motivationType: string;
      studyStyle: string;
      learningPace: string;
      bestStudyTime: string;
      stuckFrequency: string;
    };
    communicationStyle: {
      moodType: string;
      languageStyle: string;
      explanationPreference: string;
    };
    socialPreferences: {
      teachingInterest: string;
      peerInteractionComfort: string;
    };
  };
  aiInstructions: string;
  lastUpdated: string;
}

export class AIProfileService {
  private static instance: AIProfileService;

  public static getInstance(): AIProfileService {
    if (!AIProfileService.instance) {
      AIProfileService.instance = new AIProfileService();
    }
    return AIProfileService.instance;
  }

  /**
   * Get student profile for AI assistant
   */
  getStudentProfile(userId: string): StudentProfile | null {
    try {
      const profileData = localStorage.getItem(`edudisha_ai_profile_${userId}`);
      if (profileData) {
        return JSON.parse(profileData);
      }
      return null;
    } catch (error) {
      console.error('Error loading student profile:', error);
      return null;
    }
  }

  /**
   * Get AI instructions for personalized responses
   */
  getAIInstructions(userId: string): string | null {
    const profile = this.getStudentProfile(userId);
    return profile?.aiInstructions || null;
  }

  /**
   * Get personalized greeting based on student profile
   */
  getPersonalizedGreeting(userId: string): string {
    const profile = this.getStudentProfile(userId);
    if (!profile) {
      return "Hello! How can I help you today?";
    }

    const { name, moodType } = profile.studentProfile.personalInfo;
    const mood = profile.studentProfile.communicationStyle.moodType;
    const hour = new Date().getHours();

    let timeGreeting = "Hello";
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 17) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";

    let personalizedGreeting = `${timeGreeting}, ${name}!`;

    // Adjust based on mood type
    switch (mood.toLowerCase()) {
      case 'chill':
        personalizedGreeting += " What's up? 😎";
        break;
      case 'motivated':
        personalizedGreeting += " Ready to crush some goals today? 💪";
        break;
      case 'funny':
        personalizedGreeting += " Hope you're having an awesome day! 😄";
        break;
      case 'serious':
        personalizedGreeting += " How may I assist you with your studies?";
        break;
      default:
        personalizedGreeting += " How can I help you today?";
    }

    return personalizedGreeting;
  }

  /**
   * Get study recommendations based on profile
   */
  getStudyRecommendations(userId: string): string[] {
    const profile = this.getStudentProfile(userId);
    if (!profile) {
      return ["Complete your profile to get personalized recommendations!"];
    }

    const { studyStyle, bestStudyTime, learningPace, currentGoal } = profile.studentProfile.learningPreferences;
    const recommendations: string[] = [];

    // Time-based recommendations
    const hour = new Date().getHours();
    if (bestStudyTime === 'Early morning' && hour >= 6 && hour <= 9) {
      recommendations.push("Perfect time for your morning study session! 🌅");
    } else if (bestStudyTime === 'Night' && hour >= 20) {
      recommendations.push("Your peak study hours are here! 🌙");
    } else if (bestStudyTime === 'Afternoon' && hour >= 12 && hour <= 17) {
      recommendations.push("Great afternoon energy for learning! ☀️");
    }

    // Study style recommendations
    if (studyStyle === 'Short focused sessions') {
      recommendations.push("Try 25-minute focused sessions with 5-minute breaks (Pomodoro technique)");
    } else if (studyStyle === 'Long deep study sessions') {
      recommendations.push("Block out 2-3 hours for deep, uninterrupted learning");
    }

    // Goal-based recommendations
    if (currentGoal === 'Crack exams') {
      recommendations.push("Focus on practice tests and revision notes");
    } else if (currentGoal === 'Learn a new skill') {
      recommendations.push("Check out the skill exchange section to find mentors");
    }

    return recommendations.length > 0 ? recommendations : ["Keep up the great work with your studies!"];
  }

  /**
   * Get communication style preferences for AI responses
   */
  getCommunicationPreferences(userId: string): {
    languageStyle: string;
    explanationStyle: string;
    tone: string;
  } | null {
    const profile = this.getStudentProfile(userId);
    if (!profile) return null;

    return {
      languageStyle: profile.studentProfile.communicationStyle.languageStyle,
      explanationStyle: profile.studentProfile.communicationStyle.explanationPreference,
      tone: profile.studentProfile.communicationStyle.moodType
    };
  }

  /**
   * Check if student profile exists
   */
  hasProfile(userId: string): boolean {
    return this.getStudentProfile(userId) !== null;
  }

  /**
   * Get profile completion status
   */
  getProfileCompletionStatus(userId: string): {
    isComplete: boolean;
    completedSections: string[];
    missingSections: string[];
  } {
    const profile = this.getStudentProfile(userId);
    
    if (!profile) {
      return {
        isComplete: false,
        completedSections: [],
        missingSections: ['Personal Info', 'Learning Preferences', 'Communication Style', 'Social Preferences']
      };
    }

    const completedSections: string[] = [];
    const missingSections: string[] = [];

    // Check each section
    const { personalInfo, learningPreferences, communicationStyle, socialPreferences } = profile.studentProfile;

    if (personalInfo.name && personalInfo.ageGroup && personalInfo.academicYear) {
      completedSections.push('Personal Info');
    } else {
      missingSections.push('Personal Info');
    }

    if (learningPreferences.interests.length > 0 && learningPreferences.currentGoal && 
        learningPreferences.studyStyle && learningPreferences.learningPace) {
      completedSections.push('Learning Preferences');
    } else {
      missingSections.push('Learning Preferences');
    }

    if (communicationStyle.moodType && communicationStyle.languageStyle && 
        communicationStyle.explanationPreference) {
      completedSections.push('Communication Style');
    } else {
      missingSections.push('Communication Style');
    }

    if (socialPreferences.teachingInterest && socialPreferences.peerInteractionComfort) {
      completedSections.push('Social Preferences');
    } else {
      missingSections.push('Social Preferences');
    }

    return {
      isComplete: missingSections.length === 0,
      completedSections,
      missingSections
    };
  }
}

// Export singleton instance
export const aiProfileService = AIProfileService.getInstance();