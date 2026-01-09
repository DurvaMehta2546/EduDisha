import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Upload, 
  FileText, 
  Download, 
  Brain, 
  Clock,
  Calendar,
  Search,
  Folder,
  Eye,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  PenTool,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Note {
  id: number;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  createdDate: string;
  lastModified: string;
  type: 'text' | 'file';
  size?: string;
}

const subjects = [
  {
    id: 1,
    name: "Computer Networks",
    code: "3160710",
    credits: 4,
    progress: 65,
    nextExam: "March 15, 2024",
    chapters: 8,
    completedChapters: 5,
    syllabusUrl: "https://doc-14-9o-apps-viewer.googleusercontent.com/viewer/secure/pdf/39dgh6r8f6gbotr28l2sg2c34pl18vc9/jt6sqd4qcoosu2v31n7bfjk5v9qnco8q/1767966225000/drive/05385149657761973104/ACFrOgCqZKGkPIAPAviFrEPvuyrPsjhZvNWHtN9lWYQTgeJFhY4ygBCe3ELGpC3jk_LOenoGE61gcsbI1rlt-n3vi0RIBgeWaE4kla0KbCTZARlni7gB6XbyCPOxo8MNqhhTwmdNsIO8GWBWLWLCsvwBI67NGhi8OjfI-LwRMtCJxTi1RysEARndVue3qein34uz4YQsepOfBv5NwJJFF0l7IcH53iI1I2bpjYPkhQ==?print=true&nonce=lg5dfsobl6u3m&user=05385149657761973104&hash=avqimmdmlb306kaodkpdaj8gqah58b4b"
  },
  {
    id: 2,
    name: "Object Oriented Programming",
    code: "3160707",
    credits: 4,
    progress: 80,
    nextExam: "March 18, 2024",
    chapters: 10,
    completedChapters: 8,
    syllabusUrl: "https://doc-0s-9o-apps-viewer.googleusercontent.com/viewer/secure/pdf/39dgh6r8f6gbotr28l2sg2c34pl18vc9/5bb43bef33o0sohkg9uu302b1fgao4b7/1767966675000/drive/05385149657761973104/ACFrOgAOH66LajLalrKyXX9NAz64SHKE7hV6lk8x2HorElFoB7ZGHZFyTiiqtHh3z8ynjpk7wrOESPAyZy4O3zmugPvYTH3mBRjaokMa3o2BDlpRqovZWBCM_wXkSQu64V8TuGVkUFsxvzG33LbwtQqZZxgNsYF3kGmxJBM5fvl-jShL1C8j_9xS7WlIWpXB2hGKVcDjKSwiO34_uej_jjoimlP0p6VnmjgXnecLgw==?print=true&nonce=9i366b13t2ssi&user=05385149657761973104&hash=l47nqgtsi65ab3u0sus4strso3lsqav1"
  },
  {
    id: 3,
    name: "Operating Systems",
    code: "3160712",
    credits: 3,
    progress: 45,
    nextExam: "March 20, 2024",
    chapters: 12,
    completedChapters: 5,
    syllabusUrl: "https://www.gtu.ac.in/uploads/syllabus/syllabus_3160712.pdf"
  },
  {
    id: 4,
    name: "Computer Organisation and Architecture",
    code: "3160704",
    credits: 4,
    progress: 90,
    nextExam: "March 22, 2024",
    chapters: 15,
    completedChapters: 14,
    syllabusUrl: "https://doc-0k-9o-apps-viewer.googleusercontent.com/viewer/secure/pdf/39dgh6r8f6gbotr28l2sg2c34pl18vc9/ba8u7batka4csf38qhetqr4h59jatl26/1767966450000/drive/05385149657761973104/ACFrOgDmb1Z2-DLGhcFtloHtlH1Nf8mSJHoQeTk-qtSLMkyjgWnwsJhq4IuWRQeM37Dw3NiAGxw832tDh23nf23w9OzpU4kb2YogAmJeYxC4GzTxrg587NS4mlIqM_T5HvpdwwB-8gu0ngKSLvsFPlBDpu3V4HVqb94V-g5RkcFVYcMWjrIHPLvlr6uxA_5HcpUb7a4HoKDYSoTCcCbo6xlZ-Sg24UHjWW1nT8h4y_h2As_ozpMA8kaEZ_e4e4w=?print=true"
  },
  {
    id: 5,
    name: "Discrete Mathematics and Graph Theory",
    code: "3160708",
    credits: 4,
    progress: 42,
    nextExam: "March 25, 2024",
    chapters: 12,
    completedChapters: 5,
    syllabusUrl: "https://doc-0g-9o-apps-viewer.googleusercontent.com/viewer/secure/pdf/39dgh6r8f6gbotr28l2sg2c34pl18vc9/7b1ttcem82nnud410b9ahbhshs80akjo/1767966375000/drive/05385149657761973104/ACFrOgBjmIlqE99NiJzjxahLHQ1AhJuaIm-pRGtCg1AlPUgT_nKiFgLFExy19Bxv3tztOyvME4-SgKM5ywO9ipdxJ6JkT0soeW3VGyo3GLPwJkp_yGxT5C1PbXZwkaTUrYBiGbaTJeK47-myIpi7HCzTU29Rkq1CTGyH3D-IB5QV0xJ4y9Ab9JRBc9-v92JoGtyMk3FAq2tohXPOADajD8H-E4Qlqp7SU2MVn-8lNA==?print=true"
  },
];

const initialNotes: Note[] = [
  {
    id: 1,
    title: "OSI Model Overview",
    content: "The OSI (Open Systems Interconnection) model is a conceptual framework that describes how data moves through a network...\n\n7 Layers:\n1. Physical Layer\n2. Data Link Layer\n3. Network Layer\n4. Transport Layer\n5. Session Layer\n6. Presentation Layer\n7. Application Layer",
    subject: "Computer Networks",
    tags: ["networking", "osi", "protocols"],
    createdDate: "Mar 5, 2024",
    lastModified: "Mar 8, 2024",
    type: 'text'
  },
  {
    id: 2,
    title: "OOP Concepts",
    content: "Object-Oriented Programming is a programming paradigm based on the concept of objects...\n\nCore Principles:\n- Encapsulation: Data hiding and bundling\n- Inheritance: Code reusability\n- Polymorphism: Multiple forms\n- Abstraction: Hiding complexity",
    subject: "Object Oriented Programming",
    tags: ["oop", "java", "concepts"],
    createdDate: "Mar 8, 2024",
    lastModified: "Mar 10, 2024",
    type: 'text'
  },
  {
    id: 3,
    title: "CN Chapter 1-4 Notes",
    content: "",
    subject: "Computer Networks",
    tags: ["pdf", "chapters"],
    createdDate: "Mar 5, 2024",
    lastModified: "Mar 5, 2024",
    type: 'file',
    size: "2.4 MB"
  }
];

const Academics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<typeof subjects[0] | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [activeTab, setActiveTab] = useState("subjects");
  const [subjectsData, setSubjectsData] = useState(subjects);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    subject: "",
    tags: ""
  });

  // Load notes and subjects from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("academicNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes(initialNotes);
    }

    const savedSubjects = localStorage.getItem("academicSubjects");
    if (savedSubjects) {
      setSubjectsData(JSON.parse(savedSubjects));
    }
  }, []);

  const handleSummarize = (subject: typeof subjects[0]) => {
    setSelectedSubject(subject);
    
    let summary = "";
    switch (subject.name) {
      case "Computer Networks":
        summary = `Summary for ${subject.name}:\n\n• Focus on chapters ${subject.completedChapters + 1}-${subject.chapters} for upcoming exam\n• Key topics: OSI Model, TCP/IP, Network protocols, Routing algorithms\n• Recommended study time: ${Math.ceil((subject.chapters - subject.completedChapters) * 2)} hours\n• Practice previous year questions from GTU portal\n• Important: Network security and wireless communication concepts`;
        break;
      case "Object Oriented Programming":
        summary = `Summary for ${subject.name}:\n\n• Focus on chapters ${subject.completedChapters + 1}-${subject.chapters} for upcoming exam\n• Key topics: Classes & Objects, Inheritance, Polymorphism, Encapsulation\n• Recommended study time: ${Math.ceil((subject.chapters - subject.completedChapters) * 2)} hours\n• Practice coding problems in Java/C++\n• Important: Exception handling, File I/O, and GUI programming`;
        break;
      case "Operating Systems":
        summary = `Summary for ${subject.name}:\n\n• Focus on chapters ${subject.completedChapters + 1}-${subject.chapters} for upcoming exam\n• Key topics: Process management, Memory management, File systems\n• Recommended study time: ${Math.ceil((subject.chapters - subject.completedChapters) * 2)} hours\n• Practice scheduling algorithms and deadlock scenarios\n• Important: Virtual memory, disk scheduling, and system calls`;
        break;
      case "Computer Organisation and Architecture":
        summary = `Summary for ${subject.name}:\n\n• Focus on chapters ${subject.completedChapters + 1}-${subject.chapters} for upcoming exam\n• Key topics: CPU design, Memory hierarchy, I/O systems, Pipeline\n• Recommended study time: ${Math.ceil((subject.chapters - subject.completedChapters) * 2)} hours\n• Practice assembly language programming\n• Important: Cache memory, instruction sets, and performance metrics`;
        break;
      case "Discrete Mathematics and Graph Theory":
        summary = `Summary for ${subject.name}:\n\n• Focus on chapters ${subject.completedChapters + 1}-${subject.chapters} for upcoming exam\n• Key topics: Set theory, Logic, Relations, Graph traversal, Trees, Combinatorics\n• Recommended study time: ${Math.ceil((subject.chapters - subject.completedChapters) * 2)} hours\n• Practice proof techniques, mathematical reasoning, and graph algorithms\n• Important: Boolean algebra, graph coloring, shortest paths, and planar graphs`;
        break;
      default:
        summary = `Summary for ${subject.name}:\n\n• Focus on chapters ${subject.completedChapters + 1}-${subject.chapters} for upcoming exam\n• Recommended study time: ${Math.ceil((subject.chapters - subject.completedChapters) * 2)} hours\n• Practice previous year questions from GTU portal`;
    }
    
    setAiSummary(summary);
  };

  const handleCreateNote = () => {
    if (newNote.title.trim() && newNote.content.trim() && newNote.subject) {
      const note: Note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        subject: newNote.subject,
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: 'text'
      };
      const updatedNotes = [note, ...notes];
      setNotes(updatedNotes);
      localStorage.setItem("academicNotes", JSON.stringify(updatedNotes));
      setNewNote({ title: "", content: "", subject: "", tags: "" });
      setIsCreatingNote(false);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      subject: note.subject,
      tags: note.tags.join(', ')
    });
  };

  const handleUpdateNote = () => {
    if (editingNote && newNote.title.trim() && newNote.content.trim()) {
      const updatedNotes = notes.map(note => 
        note.id === editingNote.id 
          ? {
              ...note,
              title: newNote.title,
              content: newNote.content,
              subject: newNote.subject,
              tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
              lastModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
          : note
      );
      setNotes(updatedNotes);
      localStorage.setItem("academicNotes", JSON.stringify(updatedNotes));
      setEditingNote(null);
      setNewNote({ title: "", content: "", subject: "", tags: "" });
    }
  };

  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem("academicNotes", JSON.stringify(updatedNotes));
  };

  const updateSubjectProgress = (subjectId: number, progress: number, completedChapters: number) => {
    const updatedSubjects = subjectsData.map(subject =>
      subject.id === subjectId
        ? { ...subject, progress, completedChapters }
        : subject
    );
    setSubjectsData(updatedSubjects);
    localStorage.setItem("academicSubjects", JSON.stringify(updatedSubjects));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const textNotes = filteredNotes.filter(note => note.type === 'text');
  const fileNotes = filteredNotes.filter(note => note.type === 'file');

  return (
    <DashboardLayout 
      title="Academics" 
      subtitle="Manage your subjects, notes, and exam schedules"
    >
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Subjects</p>
              <p className="font-display text-xl font-bold text-foreground">6</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">My Notes</p>
              <p className="font-display text-xl font-bold text-foreground">{notes.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Exams</p>
              <p className="font-display text-xl font-bold text-foreground">6</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Progress</p>
              <p className="font-display text-xl font-bold text-foreground">61%</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="notes">My Notes ({notes.length})</TabsTrigger>
          <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-6">
          {/* AI Summary Section */}
          {aiSummary && selectedSubject && (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    AI Study Summary: {selectedSubject.name}
                  </h3>
                </div>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-card rounded-xl p-4 border border-border">
                {aiSummary}
              </pre>
              <Button 
                variant="ghost" 
                className="mt-4" 
                onClick={() => setAiSummary("")}
              >
                Close Summary
              </Button>
            </div>
          )}

          {/* Subjects Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjectsData.map((subject) => (
              <div
                key={subject.id}
                className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 
                      className="font-display font-semibold text-foreground cursor-pointer hover:text-primary transition-colors duration-200"
                      onClick={() => window.open(subject.syllabusUrl, '_blank')}
                      title="Click to view syllabus PDF"
                    >
                      {subject.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {subject.code} • {subject.credits} Credits
                    </p>
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    subject.progress >= 80 
                      ? "bg-success/10 text-success"
                      : subject.progress >= 50
                      ? "bg-warning/10 text-warning"
                      : "bg-destructive/10 text-destructive"
                  )}>
                    {subject.progress}%
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Syllabus Progress</span>
                      <span>{subject.completedChapters}/{subject.chapters} chapters</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Exam: {subject.nextExam}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleSummarize(subject)}
                    >
                      <Brain className="h-4 w-4 mr-1" />
                      Summarize
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setNewNote({ title: "", content: "", subject: subject.name, tags: "" });
                        setIsCreatingNote(true);
                        setEditingNote(null);
                        setActiveTab("notes");
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          {/* Create/Edit Note Form */}
          {(isCreatingNote || editingNote) && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <PenTool className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Note Title
                    </label>
                    <Input
                      placeholder="Enter note title..."
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Subject
                    </label>
                    <Select value={newNote.subject} onValueChange={(value) => setNewNote({ ...newNote, subject: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectsData.map((subject) => (
                          <SelectItem key={subject.id} value={subject.name}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Tags (comma separated)
                  </label>
                  <Input
                    placeholder="e.g., networking, protocols, important"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Content
                  </label>
                  <Textarea
                    placeholder="Write your notes here..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className="min-h-[200px]"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={editingNote ? handleUpdateNote : handleCreateNote}
                    disabled={!newNote.title.trim() || !newNote.content.trim() || !newNote.subject}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingNote ? 'Update Note' : 'Save Note'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsCreatingNote(false);
                      setEditingNote(null);
                      setNewNote({ title: "", content: "", subject: "", tags: "" });
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setIsCreatingNote(true)} disabled={isCreatingNote || !!editingNote}>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>

          {/* Text Notes Section */}
          {textNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">My Notes ({textNotes.length})</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {textNotes.map((note) => (
                  <Card key={note.id} className="p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{note.title}</h4>
                        <p className="text-sm text-muted-foreground">{note.subject}</p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEditNote(note)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {note.content.substring(0, 120)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {note.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {note.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{note.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Modified: {note.lastModified}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* File Upload Section */}
          <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Upload className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Upload Files
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your PDF files here, or click to browse
              </p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Select Files
              </Button>
            </div>
          </div>

          {/* File Notes Section */}
          {fileNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-secondary" />
                <h3 className="font-display font-semibold text-foreground">Uploaded Files ({fileNotes.length})</h3>
              </div>
              <div className="space-y-3">
                {fileNotes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{note.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {note.subject} • {note.createdDate} • {note.size}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredNotes.length === 0 && !isCreatingNote && (
            <div className="text-center py-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No notes found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Start by creating your first note'}
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsCreatingNote(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Note
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="exams" className="space-y-4">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">
                Upcoming Examinations - Semester 5
              </h3>
            </div>
            <div className="divide-y divide-border">
              {subjectsData.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      subject.progress >= 80 
                        ? "bg-success/10 text-success"
                        : subject.progress >= 50
                        ? "bg-warning/10 text-warning"
                        : "bg-destructive/10 text-destructive"
                    )}>
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 
                        className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors duration-200"
                        onClick={() => window.open(subject.syllabusUrl, '_blank')}
                        title="Click to view syllabus PDF"
                      >
                        {subject.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{subject.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{subject.nextExam}</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 1:00 PM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Academics;