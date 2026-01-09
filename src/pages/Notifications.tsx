import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Calendar, 
  Award, 
  Users, 
  BookOpen,
  Check,
  Trash2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    type: "session",
    title: "Skill Session in 1 hour",
    message: "Your React Hooks session with Priya Patel starts at 4:00 PM",
    time: "1 hour ago",
    read: false,
    icon: Users,
  },
  {
    id: 2,
    type: "scholarship",
    title: "Scholarship Deadline Alert",
    message: "AICTE Pragati Scholarship deadline is in 3 days",
    time: "2 hours ago",
    read: false,
    icon: Award,
  },
  {
    id: 3,
    type: "exam",
    title: "Upcoming Exam Reminder",
    message: "Computer Networks exam is scheduled for March 15, 2024",
    time: "5 hours ago",
    read: false,
    icon: BookOpen,
  },
  {
    id: 4,
    type: "session",
    title: "Session Completed",
    message: "Your Python Basics session with Neha Sharma was completed. Don't forget to rate!",
    time: "1 day ago",
    read: true,
    icon: Users,
  },
  {
    id: 5,
    type: "scholarship",
    title: "New Scholarship Available",
    message: "You're eligible for GTU Merit Scholarship. Apply before April 15!",
    time: "2 days ago",
    read: true,
    icon: Award,
  },
  {
    id: 6,
    type: "calendar",
    title: "Calendar Event Added",
    message: "Scholarship deadline reminder added to your Google Calendar",
    time: "3 days ago",
    read: true,
    icon: Calendar,
  },
];

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "session":
        return "bg-secondary/10 text-secondary";
      case "scholarship":
        return "bg-accent/10 text-accent";
      case "exam":
        return "bg-warning/10 text-warning";
      case "calendar":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filterNotifications = (type: string) => {
    if (type === "all") return notificationList;
    return notificationList.filter(n => n.type === type);
  };

  return (
    <DashboardLayout 
      title="Notifications" 
      subtitle={`You have ${unreadCount} unread notifications`}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              All Notifications
            </h2>
            <p className="text-sm text-muted-foreground">
              Stay updated with your academic activities
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all">
            All ({notificationList.length})
          </TabsTrigger>
          <TabsTrigger value="session">
            Sessions ({filterNotifications("session").length})
          </TabsTrigger>
          <TabsTrigger value="scholarship">
            Scholarships ({filterNotifications("scholarship").length})
          </TabsTrigger>
          <TabsTrigger value="exam">
            Exams ({filterNotifications("exam").length})
          </TabsTrigger>
        </TabsList>

        {["all", "session", "scholarship", "exam"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-3">
            {filterNotifications(tab).length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              filterNotifications(tab).map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 rounded-xl border bg-card p-4 transition-all duration-200",
                    notification.read 
                      ? "border-border" 
                      : "border-primary/30 bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0",
                    getTypeColor(notification.type)
                  )}>
                    <notification.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className={cn(
                          "font-medium",
                          notification.read ? "text-foreground" : "text-foreground font-semibold"
                        )}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
};

export default Notifications;
