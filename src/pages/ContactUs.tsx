import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "support@airsense.delhi.gov.in",
      secondary: "info@airsense.delhi.gov.in",
      action: "mailto:support@airsense.delhi.gov.in",
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: "1800-XXX-XXXX (Toll Free)",
      secondary: "Available 24/7",
      action: "tel:1800XXXXXXX",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "Delhi Pollution Control Committee",
      secondary: "ISBT Building, Kashmere Gate, Delhi - 110006",
      action: "https://maps.google.com",
    },
  ];

  const departments = [
    {
      name: "Technical Support",
      description: "For app-related issues and technical queries",
      email: "tech@airsense.delhi.gov.in",
    },
    {
      name: "Health Advisories",
      description: "For medical guidance related to air pollution",
      email: "health@airsense.delhi.gov.in",
    },
    {
      name: "Policy & Compliance",
      description: "For policy-related questions and reporting violations",
      email: "policy@airsense.delhi.gov.in",
    },
    {
      name: "Data & Analytics",
      description: "For data access requests and research collaborations",
      email: "data@airsense.delhi.gov.in",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">We're Here to Help</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions or concerns? Our team is available 24/7 to assist you with air quality queries
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="transition-all focus:shadow-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="transition-all focus:shadow-glow"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="transition-all focus:shadow-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                        className="transition-all focus:shadow-glow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="transition-all focus:shadow-glow resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2 hover-lift shadow-glow">
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <Card 
                key={info.title} 
                variant="animated" 
                className="hover-lift cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => window.open(info.action, '_blank')}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                      <p className="text-sm font-medium text-primary mb-1">{info.primary}</p>
                      <p className="text-xs text-muted-foreground">{info.secondary}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Departments */}
        <Card variant="gradient">
          <CardHeader>
            <CardTitle className="text-3xl">Department Contacts</CardTitle>
            <CardDescription>Reach out to specific departments for faster response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept, idx) => (
                <Card 
                  key={dept.name} 
                  variant="animated"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  className="hover-lift"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <CardDescription className="text-sm">{dept.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={`mailto:${dept.email}`}
                      className="text-primary font-medium hover:underline flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      {dept.email}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <Card variant="glow" className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Looking for Quick Answers?</h3>
              <p className="text-muted-foreground mb-6">
                Check out our AI-powered chatbot on the Citizen Portal for instant assistance
              </p>
              <Button size="lg" className="gap-2 hover-lift" asChild>
                <a href="/citizen">
                  <Sparkles className="w-5 h-5" />
                  Try AI Assistant
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
