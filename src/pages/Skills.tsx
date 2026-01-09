import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  Video, 
  Star, 
  Clock, 
  Calendar,
  Plus,
  ArrowRight,
  MessageSquare,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const skillMatches = [
  {
    id: 1,
    name: "Priya Patel",
    avatar: "PP",
    teaches: ["React", "JavaScript"],
    wants: ["Python", "Machine Learning"],
    rating: 4.8,
    sessions: 12,
    availability: ["Mon 4-6 PM", "Wed 5-7 PM"],
    matchScore: 95,
  },
  {
    id: 2,
    name: "Amit Shah",
    avatar: "AS",
    teaches: ["Data Structures", "Algorithms"],
    wants: ["Web Development", "React"],
    rating: 4.9,
    sessions: 24,
    availability: ["Tue 3-5 PM", "Thu 4-6 PM"],
    matchScore: 88,
  },
  {
    id: 3,
    name: "Neha Sharma",
    avatar: "NS",
    teaches: ["Python", "Django"],
    wants: ["JavaScript", "Node.js"],
    rating: 4.7,
    sessions: 8,
    availability: ["Mon 6-8 PM", "Fri 4-6 PM"],
    matchScore: 82,
  },
  {
    id: 4,
    name: "Rahul Verma",
    avatar: "RV",
    teaches: ["Machine Learning", "TensorFlow"],
    wants: ["Flutter", "Mobile Development"],
    rating: 4.6,
    sessions: 15,
    availability: ["Wed 3-5 PM", "Sat 10 AM-12 PM"],
    matchScore: 75,
  },
];

const upcomingSessions = [
  {
    id: 1,
    partner: "Priya Patel",
    avatar: "PP",
    skill: "React Hooks Workshop",
    date: "Today",
    time: "4:00 PM",
    meetLink: "https://meet.google.com/abc-defg-hij",
    status: "upcoming",
  },
  {
    id: 2,
    partner: "Amit Shah",
    avatar: "AS",
    skill: "DSA Problem Solving",
    date: "Tomorrow",
    time: "3:00 PM",
    meetLink: "https://meet.google.com/xyz-uvwx-rst",
    status: "upcoming",
  },
];

const pastSessions = [
  {
    id: 1,
    partner: "Neha Sharma",
    avatar: "NS",
    skill: "Python Basics",
    date: "Mar 10, 2024",
    rating: 5,
    feedback: "Great session! Very helpful.",
  },
];

const Skills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<typeof skillMatches[0] | null>(null);

  return (
    <DashboardLayout 
      title="Skill Exchange" 
      subtitle="Connect with peers to teach and learn skills via Google Meet"
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Matches Found</p>
              <p className="font-display text-xl font-bold text-foreground">24</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sessions Completed</p>
              <p className="font-display text-xl font-bold text-foreground">8</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
              <p className="font-display text-xl font-bold text-foreground">4.8</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hours Exchanged</p>
              <p className="font-display text-xl font-bold text-foreground">16</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Skills Card */}
      <div className="mb-8 rounded-2xl border border-secondary/30 bg-secondary/5 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-semibold text-foreground mb-2">My Skills Profile</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-sm text-muted-foreground">I can teach:</span>
              <Badge variant="secondary">JavaScript</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">CSS</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">I want to learn:</span>
              <Badge className="bg-accent/10 text-accent border-accent/30">Python</Badge>
              <Badge className="bg-accent/10 text-accent border-accent/30">Machine Learning</Badge>
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Update Skills
          </Button>
        </div>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="matches">Find Matches</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by skill or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Matches Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {skillMatches.map((match) => (
              <div
                key={match.id}
                className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-secondary/50 hover:shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold text-lg flex-shrink-0">
                    {match.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-semibold text-foreground">{match.name}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium">
                        {match.matchScore}% match
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span>{match.rating}</span>
                      <span>•</span>
                      <span>{match.sessions} sessions</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-muted-foreground mr-1">Teaches:</span>
                        {match.teaches.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-muted-foreground mr-1">Wants:</span>
                        {match.wants.map((skill) => (
                          <Badge key={skill} className="bg-accent/10 text-accent border-accent/30 text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Clock className="h-3 w-3" />
                      <span>{match.availability.join(" | ")}</span>
                    </div>

                    <div className="flex gap-2">
                      <Dialog open={showScheduleDialog && selectedMatch?.id === match.id} onOpenChange={(open) => {
                        setShowScheduleDialog(open);
                        if (open) setSelectedMatch(match);
                      }}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1">
                            <Video className="h-4 w-4 mr-2" />
                            Schedule Session
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule Session with {match.name}</DialogTitle>
                            <DialogDescription>
                              Choose a time slot and a Google Meet link will be generated automatically.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-sm font-medium">Available Slots</label>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                {match.availability.map((slot) => (
                                  <Button key={slot} variant="outline" className="justify-start">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {slot}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            <Button className="w-full">
                              Create Session
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold">
                    {session.avatar}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">{session.skill}</h4>
                    <p className="text-sm text-muted-foreground">with {session.partner}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {session.date} at {session.time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild>
                    <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                      <Video className="h-4 w-4 mr-2" />
                      Join Meet
                    </a>
                  </Button>
                  <Button variant="outline">Reschedule</Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold">
                    {session.avatar}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">{session.skill}</h4>
                    <p className="text-sm text-muted-foreground">with {session.partner} • {session.date}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < session.rating ? "text-accent fill-accent" : "text-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-success" />
                  {session.feedback}
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Skills;
