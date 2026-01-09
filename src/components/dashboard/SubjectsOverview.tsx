import { BookOpen, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const subjects = [
  {
    id: 1,
    name: "Computer Networks",
    code: "3160710",
    progress: 65,
    nextClass: "Mon 10:00 AM",
    assignments: 2,
    color: "primary",
  },
  {
    id: 2,
    name: "Database Management",
    code: "3160711",
    progress: 80,
    nextClass: "Tue 2:00 PM",
    assignments: 1,
    color: "secondary",
  },
  {
    id: 3,
    name: "Operating Systems",
    code: "3160712",
    progress: 45,
    nextClass: "Wed 11:00 AM",
    assignments: 3,
    color: "accent",
  },
  {
    id: 4,
    name: "Data Structures",
    code: "3160713",
    progress: 90,
    nextClass: "Thu 9:00 AM",
    assignments: 0,
    color: "success",
  },
];

const SubjectsOverview = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-secondary";
      case "accent":
        return "bg-accent";
      case "success":
        return "bg-success";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Current Subjects
        </h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{subject.name}</h4>
                <p className="text-xs text-muted-foreground">{subject.code}</p>
              </div>
              <div className={`h-3 w-3 rounded-full ${getColorClasses(subject.color)}`} />
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Syllabus Progress</span>
                  <span className="font-medium text-foreground">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-1.5" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {subject.nextClass}
                </span>
                {subject.assignments > 0 && (
                  <span className="flex items-center gap-1 text-warning">
                    <FileText className="h-3 w-3" />
                    {subject.assignments} pending
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsOverview;
