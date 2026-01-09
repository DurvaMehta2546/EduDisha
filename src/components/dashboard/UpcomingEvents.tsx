import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "DSA Skill Session",
    type: "Skill Exchange",
    date: "Today",
    time: "4:00 PM",
    location: "Google Meet",
    color: "secondary",
  },
  {
    id: 2,
    title: "CN Mid-Semester Exam",
    type: "Exam",
    date: "Mar 15",
    time: "10:00 AM",
    location: "Hall A",
    color: "destructive",
  },
  {
    id: 3,
    title: "React Workshop",
    type: "Skill Exchange",
    date: "Mar 18",
    time: "3:00 PM",
    location: "Google Meet",
    color: "secondary",
  },
  {
    id: 4,
    title: "Scholarship Deadline",
    type: "Reminder",
    date: "Mar 20",
    time: "11:59 PM",
    location: "Online",
    color: "accent",
  },
];

const UpcomingEvents = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "secondary":
        return "bg-secondary/10 border-secondary/30 text-secondary";
      case "destructive":
        return "bg-destructive/10 border-destructive/30 text-destructive";
      case "accent":
        return "bg-accent/10 border-accent/30 text-accent";
      default:
        return "bg-primary/10 border-primary/30 text-primary";
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Upcoming Events
        </h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className={`rounded-lg border p-3 ${getColorClasses(event.color)}`}>
              <Calendar className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">
                {event.title}
              </h4>
              <p className="text-sm text-muted-foreground">{event.type}</p>
              
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.date} at {event.time}
                </span>
                <span className="flex items-center gap-1">
                  {event.location === "Google Meet" ? (
                    <Video className="h-3 w-3" />
                  ) : (
                    <MapPin className="h-3 w-3" />
                  )}
                  {event.location}
                </span>
              </div>
            </div>

            {event.location === "Google Meet" && (
              <Button size="sm" variant="secondary">
                Join
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
