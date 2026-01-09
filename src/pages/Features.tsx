import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import { BookOpen, Users, Award, Brain, Calendar, FileText, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Academic Organization",
      description: "Organize your notes, assignments, and study materials all in one place. Track your progress across all subjects.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Skill Exchange",
      description: "Teach what you know and learn from peers. Connect with students who share your interests.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Scholarship Discovery",
      description: "Find and apply for scholarships tailored to GTU students. Never miss an opportunity.",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Study Buddy",
      description: "Get personalized study recommendations and summaries powered by AI technology.",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Study Planner",
      description: "Plan your study sessions, track deadlines, and stay on top of your academic schedule.",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Note Sharing",
      description: "Upload, organize, and share your notes with the community. Access quality study materials.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security. Study with confidence.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quick Actions",
      description: "Fast access to all your academic tools. Get things done efficiently.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-neue-machina text-5xl md:text-6xl font-bold mb-6">
              Powerful Features for GTU Students
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Everything you need to excel in your academic journey, all in one platform.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-elevated border-border hover:border-primary/30 transition-all"
              >
                <CardHeader>
                  <div className="mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-neue-machina">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-neue-machina text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of GTU students who are already using EduDisha to organize their academic life.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-primary-foreground font-semibold transition-all hover:bg-primary/90 btn-glow"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Features;