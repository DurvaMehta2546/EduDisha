import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { animations } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const AnimatedButton = ({ 
  children, 
  className = "",
  variant = "default",
  size = "default",
  onClick,
  disabled = false,
  loading = false,
  type = "button"
}: AnimatedButtonProps) => {
  return (
    <motion.div
      {...animations.buttonHover}
      className="inline-block"
    >
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled || loading}
        type={type}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80",
          "shadow-lg hover:shadow-xl",
          loading && "cursor-not-allowed opacity-70",
          className
        )}
      >
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
          </motion.div>
        )}
        <span className={cn(loading && "opacity-0")}>
          {children}
        </span>
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;