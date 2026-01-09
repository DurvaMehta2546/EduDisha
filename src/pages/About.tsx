import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Award, Linkedin, Code, Palette, Database, Zap } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Aryan Sharma",
      role: "Fullstack Developer",
      description: "Passionate about creating seamless user experiences and robust backend systems. Expert in modern web technologies.",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      linkedin: "https://linkedin.com/in/aryan-sharma-dev",
      icon: Code,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Durva Mehta",
      role: "UI Developer",
      description: "Crafting beautiful and intuitive interfaces that users love. Focused on design systems and user experience.",
      skills: ["Figma", "Tailwind CSS", "React", "Design Systems"],
      linkedin: "https://linkedin.com/in/durva-mehta-ui",
      icon: Palette,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      name: "Ritesh",
      role: "Backend & Optimization",
      description: "Building scalable backend architectures and optimizing performance for the best user experience.",
      skills: ["Python", "Django", "PostgreSQL", "AWS"],
      linkedin: "https://linkedin.com/in/ritesh-backend",
      icon: Zap,
      gradient: "from-green-500 to-teal-600"
    },
    {
      name: "Drashti Shah",
      role: "Data Engineer",
      description: "Transforming data into insights and building robust data pipelines for intelligent applications.",
      skills: ["Python", "SQL", "Apache Spark", "Machine Learning"],
      linkedin: "https://linkedin.com/in/drashti-shah-data",
      icon: Database,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Meet Our Team
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              The Minds Behind EduDisha
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're a passionate team of SY IT SVIT students dedicated to revolutionizing education
              through technology. Our diverse skills and shared vision drive us to create exceptional
              learning experiences for GTU students.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Innovation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Pushing boundaries with cutting-edge technology solutions
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">Collaboration</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Building together as a cohesive team with shared goals
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Learning</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Continuous growth and adaptation in our development journey
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                  <Award className="h-6 w-6 text-success" />
                </div>
                <CardTitle className="text-lg">Excellence</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Delivering high-quality solutions that make a difference
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Amazing Team</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {teamMembers.map((member, index) => (
                <Card key={member.name} className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`h-2 bg-gradient-to-r ${member.gradient}`} />
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                        <p className="text-primary font-medium mb-3 flex items-center gap-2">
                          <member.icon className="h-4 w-4" />
                          {member.role}
                        </p>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {member.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of the EduDisha revolution. Whether you're a student looking to learn or
              contribute to our mission, we'd love to have you on board.
            </p>
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;