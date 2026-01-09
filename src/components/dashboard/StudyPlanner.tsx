import { useState, useEffect } from "react";
import { Check, Plus, Circle, Trash2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  date?: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Complete CN Assignment", completed: false, priority: "high", date: new Date().toISOString().split('T')[0] },
  { id: 2, title: "Review DBMS notes", completed: true, priority: "medium", date: new Date().toISOString().split('T')[0] },
  { id: 3, title: "Practice DSA problems", completed: false, priority: "high", date: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
  { id: 4, title: "Read OS chapter 5", completed: false, priority: "low", date: new Date(Date.now() + 172800000).toISOString().split('T')[0] },
];

const StudyPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

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
        priority: "medium" as const,
        date: selectedDate
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

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const formatDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(day);
      const tasksForDay = getTasksForDate(dateStr);
      const isSelected = dateStr === selectedDate;
      const isToday = dateStr === new Date().toISOString().split('T')[0];

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={cn(
            "h-8 w-8 text-sm rounded-lg flex items-center justify-center relative transition-all",
            isSelected && "bg-primary text-primary-foreground",
            isToday && !isSelected && "bg-accent text-accent-foreground",
            !isSelected && !isToday && "hover:bg-muted"
          )}
        >
          {day}
          {tasksForDay.length > 0 && (
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
          )}
        </button>
      );
    }

    return (
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const filteredTasks = tasks.filter(task => task.date === selectedDate);
  const completedCount = filteredTasks.filter(t => t.completed).length;
  const progress = filteredTasks.length > 0 ? (completedCount / filteredTasks.length) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Study Calendar
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {showCalendar ? 'Hide' : 'Show'} Calendar
          </Button>
        </div>
        {showCalendar && renderCalendar()}
      </div>

      {/* Tasks Section */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Tasks for {new Date(selectedDate).toLocaleDateString()}
            </h3>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {filteredTasks.length} tasks completed
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
          {filteredTasks.map((task) => (
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
          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No tasks scheduled for this date</p>
              <p className="text-sm">Add a task to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
