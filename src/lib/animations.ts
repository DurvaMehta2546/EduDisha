// Animation utilities for smooth, professional interactions
export const animations = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeInOut" }
  },

  // Card animations
  cardHover: {
    whileHover: { 
      scale: 1.02, 
      y: -4,
      boxShadow: "0 20px 40px rgba(53, 167, 255, 0.2)",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    whileTap: { scale: 0.98 }
  },

  // Button animations
  buttonHover: {
    whileHover: { 
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(53, 167, 255, 0.3)",
      transition: { duration: 0.2 }
    },
    whileTap: { scale: 0.95 }
  },

  // Fade in animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 }
  },

  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  // Stagger animations for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  },

  // Loading animations
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Progress animations
  progressBar: {
    initial: { width: 0 },
    animate: { width: "100%" },
    transition: { duration: 1, ease: "easeOut" }
  }
};

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Animation variants for different components
export const variants = {
  // Modal/Dialog animations
  modal: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  },

  // Dropdown animations
  dropdown: {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  },

  // Tab animations
  tab: {
    inactive: { opacity: 0.7, scale: 0.95 },
    active: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  },

  // Study-focused animations
  studyCard: {
    rest: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 4px 12px rgba(53, 167, 255, 0.15)"
    },
    hover: { 
      scale: 1.02, 
      y: -4,
      boxShadow: "0 12px 24px rgba(53, 167, 255, 0.25)",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  },

  // Progress animations
  progressBar: {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 1.2, ease: "easeOut" }
  },

  // Notification animations
  notification: {
    initial: { opacity: 0, x: 100, scale: 0.8 },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: 100, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  },

  // Focus state animations
  focusRing: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  }
};

// Utility functions
export const createStaggerAnimation = (delay: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: delay
    }
  }
});

export const createDelayedAnimation = (delay: number) => ({
  ...animations.slideUp,
  transition: { ...animations.slideUp.transition, delay, ease: "easeOut" as const }
});