import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  Search, 
  Bell, 
  Check, 
  IndianRupee,
  GraduationCap,
  Brain,
  Building2,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { scholarships, getScholarshipsByCategory, getEligibleScholarships, getAppliedScholarships } from "@/data/scholarshipData";

const Scholarships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "eligible":
        return <Badge className="bg-success/10 text-success border-success/30">Eligible</Badge>;
      case "applied":
        return <Badge className="bg-primary/10 text-primary border-primary/30">Applied</Badge>;
      case "not-eligible":
        return <Badge className="bg-muted text-muted-foreground">Not Eligible</Badge>;
      case "deadline-passed":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/30">Deadline Passed</Badge>;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Government":
        return "bg-primary/10 text-primary border-primary/30";
      case "Private":
        return "bg-secondary/10 text-secondary border-secondary/30";
      case "Corporate":
        return "bg-accent/10 text-accent border-accent/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleAiQuery = () => {
    if (aiQuery.trim()) {
      // Enhanced AI response with more comprehensive information
      setAiResponse(
        "Based on your profile (Computer Engineering, Semester 5, CGPA 8.2), you are eligible for multiple scholarships including MYSY (Gujarat), Central Sector Scheme, Reliance Foundation, and several corporate scholarships. Priority recommendations: 1) MYSY - covers 50% tuition fee, deadline March 31st. 2) Central Sector Scheme - ₹12,000/year, deadline March 15th. 3) Reliance Foundation - up to ₹2L, deadline June 30th. Your CGPA qualifies you for merit-based scholarships. Apply to government schemes first as they have earlier deadlines."
      );
    }
  };

  const eligibleCount = getEligibleScholarships().length;
  const appliedCount = getAppliedScholarships().length;
  const deadlineSoonCount = scholarships.filter(s => s.status === "deadline-passed").length;
  const totalValue = "₹15L+"; // Approximate total value of all eligible scholarships

  const filteredScholarships = getScholarshipsByCategory(selectedCategory).filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.eligibility.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { name: "All", count: scholarships.length },
    { name: "Government", count: scholarships.filter(s => s.category === "Government").length },
    { name: "Private", count: scholarships.filter(s => s.category === "Private").length },
    { name: "Corporate", count: scholarships.filter(s => s.category === "Corporate").length }
  ];

  return (
    <DashboardLayout 
      title="Scholarship Hub" 
      subtitle="Discover and apply for scholarships tailored for GTU students"
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Eligible</p>
              <p className="font-display text-xl font-bold text-foreground">{eligibleCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Applied</p>
              <p className="font-display text-xl font-bold text-foreground">{appliedCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="font-display text-xl font-bold text-foreground">{scholarships.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <IndianRupee className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="font-display text-xl font-bold text-foreground">{totalValue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Query Section */}
      <div className="mb-8 rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">AI Eligibility Checker</h3>
            <p className="text-sm text-muted-foreground">Ask about your scholarship eligibility and get personalized recommendations</p>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="E.g., Which scholarships am I eligible for as a Computer Engineering student?"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAiQuery()}
            className="flex-1"
          />
          <Button onClick={handleAiQuery}>Ask AI</Button>
        </div>
        {aiResponse && (
          <div className="rounded-xl bg-card border border-border p-4 text-sm text-foreground">
            <p className="font-medium mb-2">AI Response:</p>
            <p className="text-muted-foreground leading-relaxed">{aiResponse}</p>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search scholarships by name, provider, or eligibility..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button 
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className="whitespace-nowrap"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Scholarships List */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-card"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    {scholarship.category === "Government" ? <Award className="h-6 w-6" /> :
                     scholarship.category === "Corporate" ? <Building2 className="h-6 w-6" /> :
                     <Users className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      {scholarship.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {getStatusBadge(scholarship.status)}
                  <span className={cn("text-xs px-2 py-1 rounded-full border", getCategoryColor(scholarship.category))}>
                    {scholarship.category}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Eligibility:</strong> {scholarship.eligibility}
                  </p>
                  {scholarship.keyCriteria && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Key Criteria:</strong> {scholarship.keyCriteria}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-foreground font-medium">
                    <IndianRupee className="h-4 w-4 text-success" />
                    {scholarship.amount}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Deadline: {scholarship.deadline}
                  </span>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-2">
                <Button className="flex-1" asChild>
                  <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" title="Set Reminder">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            No scholarships found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters to find relevant scholarships.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Scholarships;