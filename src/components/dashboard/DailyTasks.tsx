import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2,
  BookOpen,
  FileText,
  Code,
  Target
} from "lucide-react";
import { useDailyTasks, DailyTask } from "@/hooks/use-daily-tasks";
import { cn } from "@/lib/utils";

const DailyTasks = () => {
  const { 
    tasks, 
    updateTask, 
    addTask, 
    removeTask, 
    completedCount, 
    totalCount, 
    completionPercentage 
  } = useDailyTasks();
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        completed: false,
        category: "study",
        priority: "medium"
      });
      setNewTaskTitle("");
      setShowAddTask(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "study":
        return <BookOpen className="h-4 w-4" />;
      case "assignment":
        return <FileText className="h-4 w-4" />;
      case "reading":
        return <BookOpen className="h-4 w-4" />;
      case "practice":
        return <Code className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/30";
      case "medium":
        return "bg-warning/10 text-warning border-warning/30";
      case "low":
        return "bg-success/10 text-success border-success/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Daily Tasks
          </h3>
          <p className="text-sm text-muted-foreground">
            {completedCount} of {totalCount} completed ({completionPercentage}%)
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddTask(!showAddTask)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Task
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="mb-4 p-4 border border-border rounded-lg bg-muted/30">
          <div className="flex gap-2">
            <Input
              placeholder="Enter new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              className="flex-1"
            />
            <Button onClick={handleAddTask} size="sm">
              Add
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAddTask(false)}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
              task.completed 
                ? "bg-success/5 border-success/20" 
                : "bg-card border-border hover:border-primary/30"
            )}
          >
            <button
              onClick={() => updateTask(task.id, !task.completed)}
              className="flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
              )}
            </button>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-muted-foreground">
                {getCategoryIcon(task.category)}
              </div>
              <Badge 
                variant="outline" 
                className={cn("text-xs", getPriorityColor(task.priority))}
              >
                {task.priority}
              </Badge>
            </div>

            <span 
              className={cn(
                "flex-1 text-sm",
                task.completed 
                  ? "line-through text-muted-foreground" 
                  : "text-foreground"
              )}
            >
              {task.title}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTask(task.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No tasks for today. Add some to get started!</p>
          </div>
        )}
      </div>

      {/* Completion Message */}
      {completionPercentage === 100 && tasks.length > 0 && (
        <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/30">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Great job! All tasks completed! 🎉</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DailyTasks;