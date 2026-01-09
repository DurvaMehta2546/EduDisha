// Responsive utilities for consistent spacing and sizing
export const spacing = {
  // Responsive padding classes
  container: "px-4 sm:px-6 lg:px-8",
  section: "py-12 sm:py-16 lg:py-20",
  card: "p-4 sm:p-6 lg:p-8",
  
  // Responsive margins
  mb: {
    sm: "mb-4 sm:mb-6",
    md: "mb-6 sm:mb-8 lg:mb-10",
    lg: "mb-8 sm:mb-12 lg:mb-16"
  },
  
  // Responsive gaps
  gap: {
    sm: "gap-3 sm:gap-4",
    md: "gap-4 sm:gap-6",
    lg: "gap-6 sm:gap-8"
  }
};

export const typography = {
  // Responsive headings
  h1: "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold",
  h2: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold",
  h3: "text-lg sm:text-xl lg:text-2xl font-semibold",
  h4: "text-base sm:text-lg lg:text-xl font-medium",
  
  // Body text
  body: "text-sm sm:text-base",
  small: "text-xs sm:text-sm",
  
  // Line heights
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed"
};

export const layout = {
  // Grid systems
  grid: {
    auto: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    cards: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    stats: "grid grid-cols-2 sm:grid-cols-4",
    features: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  },
  
  // Flex utilities
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-start",
    col: "flex flex-col",
    wrap: "flex flex-wrap"
  },
  
  // Container sizes
  container: {
    sm: "max-w-sm mx-auto",
    md: "max-w-md mx-auto",
    lg: "max-w-4xl mx-auto",
    xl: "max-w-6xl mx-auto",
    full: "max-w-7xl mx-auto"
  }
};

// Responsive component utilities
export const components = {
  // Card styles with responsive padding and shadows
  card: "rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300",
  cardInteractive: "rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer",
  
  // Study-focused card variants
  studyCard: "study-card rounded-2xl p-4 sm:p-6 lg:p-8",
  focusArea: "focus-area rounded-2xl p-6 sm:p-8",
  
  // Button responsive sizes
  button: {
    sm: "px-3 py-2 text-sm sm:px-4 sm:py-2",
    md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
    lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg"
  },
  
  // Input responsive styles
  input: "w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
  
  // Badge styles
  badge: "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full",
  notificationBadge: "notification-soft",
  
  // Avatar sizes
  avatar: {
    sm: "w-8 h-8 sm:w-10 sm:h-10",
    md: "w-10 h-10 sm:w-12 sm:h-12",
    lg: "w-12 h-12 sm:w-16 sm:h-16"
  },
  
  // Study-specific components
  timer: "timer-display px-4 py-2 sm:px-6 sm:py-3",
  quote: "quote-card",
  progress: "progress-gentle relative h-2 sm:h-3"
};

// Media query hooks for JavaScript
export const useMediaQuery = (query: string) => {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQuery.matches);
  
  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mediaQuery]);
  
  return matches;
};

// Responsive breakpoint hooks
export const useBreakpoint = () => {
  const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1280px)');
  
  return { isSm, isMd, isLg, isXl };
};

import { useState, useEffect } from 'react';