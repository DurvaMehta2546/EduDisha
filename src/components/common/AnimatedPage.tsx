import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { animations } from '@/lib/animations';

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedPage = ({ children, className = "", delay = 0 }: AnimatedPageProps) => {
  return (
    <motion.div
      initial={animations.pageTransition.initial}
      animate={animations.pageTransition.animate}
      exit={animations.pageTransition.exit}
      transition={{ 
        ...animations.pageTransition.transition, 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;