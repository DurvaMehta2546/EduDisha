import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/data/blogData";

const categories = [
  { name: "All", icon: BookOpen, count: blogPosts.length },
  { name: "Scholarships", icon: Award, count: blogPosts.filter(p => p.category === "Scholarships").length },
  { name: "Skill Exchange", icon: Users, count: blogPosts.filter(p => p.category === "Skill Exchange").length },
  { name: "Academics", icon: BookOpen, count: blogPosts.filter(p => p.category === "Academics").length },
  { name: "AI & Tech", icon: Brain, count: blogPosts.filter(p => p.category === "AI & Tech").length },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Scholarships": return "bg-accent/10 text-accent border-accent/30";
      case "Skill Exchange": return "bg-secondary/10 text-secondary border-secondary/30";
      case "Academics": return "bg-primary/10 text-primary border-primary/30";
      case "AI & Tech": return "bg-success/10 text-success border-success/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl font-bold text-primary-foreground sm:text-5xl mb-4">
              EduDisha Blog
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Insights, tips, and stories to help GTU students excel in academics and beyond.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/95 border-0 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={activeCategory === cat.name ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.name)}
                className="gap-2"
              >
                <cat.icon className="h-4 w-4" />
                {cat.name}
                <span className="text-xs opacity-70">({cat.count})</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Featured Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:border-primary/30"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <Badge className={cn("mb-3", getCategoryColor(post.category))}>
                      {post.category}
                    </Badge>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            {activeCategory === "All" ? "All Articles" : activeCategory}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(activeCategory === "All" ? regularPosts : filteredPosts).map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-card hover:border-primary/30"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <Badge className={cn("mb-3 text-xs", getCategoryColor(post.category))}>
                      {post.category}
                    </Badge>
                    <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
