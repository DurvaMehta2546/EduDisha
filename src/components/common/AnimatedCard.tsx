import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { animations } from '@/lib/animations';
import { components } from '@/lib/responsive';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  delay?: number;
  onClick?: () => void;
}

const AnimatedCard = ({ 
  children, 
  className = "", 
  interactive = false,
  delay = 0,
  onClick 
}: AnimatedCardProps) => {
  const baseClass = interactive ? components.cardInteractive : components.card;
  
  return (
    <motion.div
      initial={animations.slideUp.initial}
      animate={animations.slideUp.animate}
      transition={{ 
        ...animations.slideUp.transition, 
        delay 
      }}
      {...(interactive ? animations.cardHover : {})}
      className={cn(baseClass, className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;