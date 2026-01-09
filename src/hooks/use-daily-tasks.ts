import { useState, useEffect } from "react";

export interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  category: "study" | "assignment" | "reading" | "practice";
  priority: "high" | "medium" | "low";
}

const defaultTasks: DailyTask[] = [
  {
    id: "1",
    title: "Complete Computer Networks Chapter 4",
    completed: false,
    category: "study",
    priority: "high"
  },
  {
    id: "2",
    title: "Submit Database Assignment",
    completed: false,
    category: "assignment",
    priority: "high"
  },
  {
    id: "3",
    title: "Read Software Engineering Notes",
    completed: false,
    category: "reading",
    priority: "medium"
  },
  {
    id: "4",
    title: "Practice DSA Problems",
    completed: false,
    category: "practice",
    priority: "medium"
  }
];

export const useDailyTasks = () => {
  const [tasks, setTasks] = useState<DailyTask[]>([]);

  useEffect(() => {
    // Load tasks from localStorage or use defaults
    const savedTasks = localStorage.getItem("dailyTasks");
    const today = new Date().toDateString();
    const lastUpdated = localStorage.getItem("tasksLastUpdated");

    if (savedTasks && lastUpdated === today) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Reset tasks for new day
      setTasks(defaultTasks);
      localStorage.setItem("tasksLastUpdated", today);
    }
  }, []);

  const updateTask = (taskId: string, completed: boolean) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
  };

  const addTask = (task: Omit<DailyTask, "id">) => {
    const newTask: DailyTask = {
      ...task,
      id: Date.now().toString()
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
  };

  const removeTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const hasIncompleteTasks = completedCount < totalCount;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    tasks,
    updateTask,
    addTask,
    removeTask,
    completedCount,
    totalCount,
    hasIncompleteTasks,
    completionPercentage
  };
};