import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  Target, 
  Trophy, 
  BookOpen, 
  Heart,
  Zap,
  RefreshCw
} from "lucide-react";
import { motivationQuotes, getQuotesByCategory, MotivationQuote } from "@/data/motivationData";
import { useDailyTasks } from "@/hooks/use-daily-tasks";
import { cn } from "@/lib/utils";

const Motivation = () => {
  const { hasIncompleteTasks, completionPercentage } = useDailyTasks();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [displayedQuotes, setDisplayedQuotes] = useState<MotivationQuote[]>(
    motivationQuotes.slice(0, 6)
  );

  const categories = [
    { name: "all", label: "All", icon: Sparkles, count: motivationQuotes.length },
    { name: "study", label: "Study", icon: BookOpen, count: getQuotesByCategory("study").length },
    { name: "success", label: "Success", icon: Trophy, count: getQuotesByCategory("success").length },
    { name: "perseverance", label: "Perseverance", icon: Zap, count: getQuotesByCategory("perseverance").length },
    { name: "goals", label: "Goals", icon: Target, count: getQuotesByCategory("goals").length },
    { name: "academic", label: "Academic", icon: BookOpen, count: getQuotesByCategory("academic").length }
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setDisplayedQuotes(motivationQuotes.slice(0, 6));
    } else {
      setDisplayedQuotes(getQuotesByCategory(category));
    }
  };

  const loadMoreQuotes = () => {
    if (selectedCategory === "all") {
      const currentLength = displayedQuotes.length;
      const newQuotes = motivationQuotes.slice(currentLength, currentLength + 6);
      setDisplayedQuotes([...displayedQuotes, ...newQuotes]);
    }
  };

  const getCategoryColor = (category: string) => {
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
  };

  return (
    <DashboardLayout 
      title="Motivation Hub" 
      subtitle="Stay inspired and motivated on your academic journey"
    >
      {/* Progress Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily Progress</p>
              <p className="font-display text-xl font-bold text-foreground">{completionPercentage}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Motivation Level</p>
              <p className="font-display text-xl font-bold text-foreground">
                {hasIncompleteTasks ? "Building" : "High"}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quotes Available</p>
              <p className="font-display text-xl font-bold text-foreground">{motivationQuotes.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="font-display text-xl font-bold text-foreground">{categories.length - 1}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Browse by Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category.name)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.label} ({category.count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Quotes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {displayedQuotes.map((quote) => (
          <Card key={quote.id} className="p-6 hover:shadow-lg transition-all duration-200">
            <blockquote className="mb-4">
              <p className="text-foreground font-medium leading-relaxed italic">
                "{quote.quote}"
              </p>
            </blockquote>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-medium">
                — {quote.author}
              </p>
              <Badge 
                variant="outline" 
                className={cn("text-xs", getCategoryColor(quote.category))}
              >
                {quote.category}
              </Badge>
            </div>
            {quote.isForIncompleteTask && (
              <div className="mt-3 text-xs text-warning">
                💪 Perfect for when you need that extra push!
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {selectedCategory === "all" && displayedQuotes.length < motivationQuotes.length && (
        <div className="text-center">
          <Button onClick={loadMoreQuotes} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Load More Quotes
          </Button>
        </div>
      )}

      {/* Motivational Tips */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-primary/5 to-accent/5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Daily Motivation Tips
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">🌅 Start Your Day Right</h4>
            <p className="text-sm text-muted-foreground">
              Read a motivational quote every morning to set a positive tone for your day.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">🎯 Set Clear Goals</h4>
            <p className="text-sm text-muted-foreground">
              Break down your tasks into smaller, achievable goals to maintain momentum.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">🏆 Celebrate Small Wins</h4>
            <p className="text-sm text-muted-foreground">
              Acknowledge your progress, no matter how small. Every step counts!
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">💪 Stay Consistent</h4>
            <p className="text-sm text-muted-foreground">
              Consistency beats perfection. Keep showing up, even on tough days.
            </p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Motivation;