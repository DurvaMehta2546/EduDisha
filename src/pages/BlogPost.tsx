import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Heart,
  Share2,
  Bookmark,
  MessageSquare,
  ThumbsUp,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPostBySlug, getRelatedPosts, getPostComments, Comment } from "@/data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const post = getPostBySlug(slug || "");
  const relatedPosts = post ? getRelatedPosts(post) : [];
  const initialComments = post ? getPostComments(post.id) : [];
  
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Scholarships": return "bg-accent/10 text-accent border-accent/30";
      case "Skill Exchange": return "bg-secondary/10 text-secondary border-secondary/30";
      case "Academics": return "bg-primary/10 text-primary border-primary/30";
      case "AI & Tech": return "bg-success/10 text-success border-success/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Blog post link copied to clipboard.",
      });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and comment.",
        variant: "destructive",
      });
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      postId: post.id,
      author: authorName,
      avatar: authorName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      content: newComment,
      date: "Just now",
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setAuthorName("");
    toast({
      title: "Comment added!",
      description: "Your comment has been posted successfully.",
    });
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] mt-16">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-card mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/blog")}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>

            <Badge className={cn("mb-4", getCategoryColor(post.category))}>
              {post.category}
            </Badge>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {post.author.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-6">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className={cn("h-4 w-4 mr-2", isBookmarked && "fill-current")} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-card mb-8">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-sidebar prose-pre:text-sidebar-foreground">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-foreground mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-foreground mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <p key={index} className="font-semibold text-foreground">{paragraph.replace(/\*\*/g, '')}</p>;
                } else if (paragraph.startsWith('- ')) {
                  return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
                } else if (paragraph.startsWith('```')) {
                  return null;
                } else if (paragraph.trim()) {
                  return <p key={index}>{paragraph}</p>;
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm font-medium text-muted-foreground mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-card mb-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                Comments ({comments.length})
              </h2>
            </div>

            {/* Add Comment */}
            <div className="bg-muted/50 rounded-xl p-6 mb-6">
              <h3 className="font-medium text-foreground mb-4">Leave a comment</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
                <Textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddComment}>
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold text-sm flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-muted-foreground mb-2">{comment.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground"
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-card hover:border-primary/30"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className={cn("mb-2 text-xs", getCategoryColor(relatedPost.category))}>
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        {relatedPost.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
