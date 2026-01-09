import { useState, useEffect } from "react";
import { Check, Plus, Circle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

const initialTasks: Task[] = [
  { id: 1, title: "Complete CN Assignment", completed: false, priority: "high" },
  { id: 2, title: "Review DBMS notes", completed: true, priority: "medium" },
  { id: 3, title: "Practice DSA problems", completed: false, priority: "high" },
  { id: 4, title: "Read OS chapter 5", completed: false, priority: "low" },
];

const StudyPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("studyPlannerTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("studyPlannerTasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority: "medium" as const
      }];
      setTasks(updatedTasks);
      localStorage.setItem("studyPlannerTasks", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("studyPlannerTasks", JSON.stringify(updatedTasks));
  };

  const getPriorityClasses = (priority: string) => {
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

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Study Planner
          </h3>
          <p className="text-sm text-muted-foreground">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>
        <div className="text-right">
          <span className="font-display text-2xl font-bold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-muted mb-6 overflow-hidden">
        <div 
          className="h-full rounded-full bg-primary-gradient transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Add Task */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          className="flex-1"
        />
        <Button onClick={addTask} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Tasks List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 group",
              task.completed 
                ? "bg-muted/50 border-border" 
                : "bg-card border-border hover:border-primary/30"
            )}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                task.completed
                  ? "border-success bg-success text-success-foreground"
                  : "border-muted-foreground/30 hover:border-primary"
              )}
            >
              {task.completed && <Check className="h-3 w-3" />}
            </button>
            
            <span className={cn(
              "flex-1 text-sm transition-all",
              task.completed && "text-muted-foreground line-through"
            )}>
              {task.title}
            </span>

            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full border",
              getPriorityClasses(task.priority)
            )}>
              {task.priority}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlanner;
