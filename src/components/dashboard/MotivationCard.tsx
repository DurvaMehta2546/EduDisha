import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  RefreshCw, 
  Heart, 
  Target,
  BookOpen,
  Trophy,
  Zap
} from "lucide-react";
import { getRandomQuote, getQuoteForIncompleteTask, MotivationQuote } from "@/data/motivationData";
import { cn } from "@/lib/utils";

interface MotivationCardProps {
  hasIncompleteTasks?: boolean;
  className?: string;
}

const MotivationCard = ({ hasIncompleteTasks = false, className }: MotivationCardProps) => {
  const [currentQuote, setCurrentQuote] = useState<MotivationQuote | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadNewQuote = useCallback(() => {
    setIsRefreshing(true);
    // Remove setTimeout to prevent layout shifts
    const newQuote = hasIncompleteTasks ? getQuoteForIncompleteTask() : getRandomQuote();
    setCurrentQuote(newQuote);
    setIsRefreshing(false);
  }, [hasIncompleteTasks]);

  // Initialize quote only once
  useEffect(() => {
    if (!isInitialized) {
      loadNewQuote();
      setIsInitialized(true);
    }
  }, [loadNewQuote, isInitialized]);

  // Only update quote when user manually refreshes, not when hasIncompleteTasks changes
  const handleRefresh = useCallback(() => {
    loadNewQuote();
  }, [loadNewQuote]);

  const getCategoryIcon = useMemo(() => (category: string) => {
    switch (category) {
      case "study":
        return <BookOpen className="h-4 w-4" />;
      case "success":
        return <Trophy className="h-4 w-4" />;
      case "perseverance":
        return <Zap className="h-4 w-4" />;
      case "goals":
        return <Target className="h-4 w-4" />;
      case "academic":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  }, []);

  const getCategoryColor = useMemo(() => (category: string) => {
    switch (category) {
      case "study":
        return "bg-primary/10 text-primary border-primary/30";
      case "success":
        return "bg-success/10 text-success border-success/30";
      case "perseverance":
        return "bg-warning/10 text-warning border-warning/30";
      case "goals":
        return "bg-accent/10 text-accent border-accent/30";
      case "academic":
        return "bg-secondary/10 text-secondary border-secondary/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  }, []);

  if (!currentQuote) return null;

  return (
    <Card className={cn("p-6 relative overflow-hidden", className)}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="font-display font-semibold text-foreground">
              Daily Inspiration
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>

        {/* Quote */}
        <blockquote className="text-foreground mb-4">
          <p className="text-lg font-medium leading-relaxed italic">
            "{currentQuote.quote}"
          </p>
        </blockquote>

        {/* Author and Category */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-medium">
            — {currentQuote.author}
          </p>
          <Badge 
            variant="outline" 
            className={cn("text-xs", getCategoryColor(currentQuote.category))}
          >
            <span className="mr-1">{getCategoryIcon(currentQuote.category)}</span>
            {currentQuote.category}
          </Badge>
        </div>

        {/* Special message for incomplete tasks */}
        {hasIncompleteTasks && (
          <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/30">
            <p className="text-sm text-foreground">
              💪 You've got this! Complete your daily tasks and come back for a celebration quote!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MotivationCard;