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
  CheckCircle,
  Send,
  Languages,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { translateText } from "@/lib/translation";

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
  const [showUpdateSkillsDialog, setShowUpdateSkillsDialog] = useState(false);
  const [teachSkills, setTeachSkills] = useState(["JavaScript", "React", "CSS"]);
  const [learnSkills, setLearnSkills] = useState(["Python", "Machine Learning"]);
  const [newTeachSkill, setNewTeachSkill] = useState("");
  const [newLearnSkill, setNewLearnSkill] = useState("");
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [chatMessages, setChatMessages] = useState<{[key: string]: Array<{id: string, sender: string, message: string, timestamp: Date, translated?: string}>}>({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !selectedMatch) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedMatch.id]: [...(prev[selectedMatch.id] || []), userMessage]
    }));

    setCurrentMessage("");

    // Handle translation
    if (selectedLanguage !== 'en') {
      setIsTranslating(true);
      try {
        const translated = await translateText({
          from: 'en', // Assuming user inputs in English for now
          to: selectedLanguage,
          text: currentMessage
        });
        setChatMessages(prev => ({
          ...prev,
          [selectedMatch.id]: prev[selectedMatch.id].map(msg =>
            msg.id === userMessage.id ? { ...msg, translated } : msg
          )
        }));
      } catch (error) {
        console.error('Translation failed:', error);
      } finally {
        setIsTranslating(false);
      }
    }

    // Simulate peer response
    setTimeout(() => {
      const responses = [
        "Hey! I'd love to help you with that skill. When are you available?",
        "That sounds interesting! I can teach you what you need.",
        "Great match! Let's schedule a session soon.",
        "I'm excited to exchange skills with you!",
        "Perfect! I have some free time this week."
      ];

      const peerResponse = {
        id: (Date.now() + 1).toString(),
        sender: selectedMatch.name.toLowerCase().replace(' ', ''),
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedMatch.id]: [...(prev[selectedMatch.id] || []), peerResponse]
      }));
    }, 2000 + Math.random() * 3000);
  };

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
              {teachSkills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">I want to learn:</span>
              {learnSkills.map((skill) => (
                <Badge key={skill} className="bg-accent/10 text-accent border-accent/30">{skill}</Badge>
              ))}
            </div>
          </div>
          <Button onClick={() => setShowUpdateSkillsDialog(true)}>
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
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedMatch(match);
                          setShowChatDialog(true);
                          // Initialize chat if not exists
                          if (!chatMessages[match.id]) {
                            setChatMessages(prev => ({
                              ...prev,
                              [match.id]: [{
                                id: '1',
                                sender: 'system',
                                message: `You matched with ${match.name}! Start a conversation to schedule your skill exchange session.`,
                                timestamp: new Date()
                              }]
                            }));
                          }
                        }}
                      >
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

      {/* Update Skills Dialog */}
      <Dialog open={showUpdateSkillsDialog} onOpenChange={setShowUpdateSkillsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Your Skills</DialogTitle>
            <DialogDescription>
              Add or remove skills you can teach and want to learn. This helps us find better matches for you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Skills I Can Teach */}
            <div>
              <label className="text-sm font-medium mb-3 block">Skills I Can Teach</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {teachSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                    <button
                      onClick={() => setTeachSkills(teachSkills.filter(s => s !== skill))}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill you can teach..."
                  value={newTeachSkill}
                  onChange={(e) => setNewTeachSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newTeachSkill.trim()) {
                      setTeachSkills([...teachSkills, newTeachSkill.trim()]);
                      setNewTeachSkill("");
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (newTeachSkill.trim()) {
                      setTeachSkills([...teachSkills, newTeachSkill.trim()]);
                      setNewTeachSkill("");
                    }
                  }}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Skills I Want to Learn */}
            <div>
              <label className="text-sm font-medium mb-3 block">Skills I Want to Learn</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {learnSkills.map((skill) => (
                  <Badge key={skill} className="bg-accent/10 text-accent border-accent/30 px-3 py-1">
                    {skill}
                    <button
                      onClick={() => setLearnSkills(learnSkills.filter(s => s !== skill))}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill you want to learn..."
                  value={newLearnSkill}
                  onChange={(e) => setNewLearnSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newLearnSkill.trim()) {
                      setLearnSkills([...learnSkills, newLearnSkill.trim()]);
                      setNewLearnSkill("");
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (newLearnSkill.trim()) {
                      setLearnSkills([...learnSkills, newLearnSkill.trim()]);
                      setNewLearnSkill("");
                    }
                  }}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Best Skills Section */}
            <div>
              <label className="text-sm font-medium mb-3 block">My Best Skills (Top 3)</label>
              <p className="text-xs text-muted-foreground mb-3">
                Highlight your strongest skills to attract better learning partners
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["Expert", "Advanced", "Intermediate"].map((level, index) => (
                  <div key={level} className="relative">
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                      <div className="text-sm font-medium text-muted-foreground">
                        {level} Level
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Select from your skills
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowUpdateSkillsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowUpdateSkillsDialog(false)}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold">
                {selectedMatch?.avatar}
              </div>
              <div>
                <div>Chat with {selectedMatch?.name}</div>
                <div className="text-sm font-normal text-muted-foreground">
                  Skill Exchange Partner
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Language Selector */}
          <div className="flex items-center gap-2 px-6 py-2 border-b">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-sm bg-transparent border-none outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
            </select>
            {isTranslating && <div className="text-xs text-muted-foreground">Translating...</div>}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {(chatMessages[selectedMatch?.id || ''] || []).map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender !== 'user' && message.sender !== 'system' && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-semibold flex-shrink-0">
                      {selectedMatch?.avatar}
                    </div>
                  )}
                  <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.sender === 'system'
                          ? 'bg-muted text-muted-foreground text-center'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.message}</p>
                      {message.translated && selectedLanguage !== 'en' && (
                        <p className="text-xs mt-1 opacity-75 border-t pt-1">
                          {message.translated}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                      U
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="flex-shrink-0 p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Type a message in ${selectedLanguage === 'en' ? 'English' : selectedLanguage === 'hi' ? 'Hindi' : 'Gujarati'}...`}
                className="flex-1 px-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim()}
                size="sm"
                className="rounded-full px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Skills;
