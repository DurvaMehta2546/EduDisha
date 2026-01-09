import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Have questions or need support? We'd love to hear from you.
                  Send us a message and we'll respond as soon as possible.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <Textarea placeholder="Your message..." rows={4} />
                  </div>
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-muted-foreground">support@edudisha.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response Time</h4>
                  <p className="text-muted-foreground">We typically respond within 24 hours</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Support Hours</h4>
                  <p className="text-muted-foreground">Monday - Friday, 9 AM - 6 PM IST</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;