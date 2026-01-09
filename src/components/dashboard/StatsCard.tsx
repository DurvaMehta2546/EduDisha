import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "accent";
  onClick?: () => void;
}

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  variant = "default",
  onClick
}: StatsCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "secondary":
        return "bg-secondary/10 text-secondary";
      case "accent":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div 
      className={cn(
        "rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-card hover:border-primary/20",
        onClick && "cursor-pointer hover:scale-[1.02]"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className={cn("rounded-xl p-3", getVariantClasses())}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trend.isPositive ? "text-success" : "text-destructive"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {trend.value}%
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
