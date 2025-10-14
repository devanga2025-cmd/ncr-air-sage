import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Cloud, MapPin, TrendingUp, Users, FileText, CheckCircle, Sparkles, Brain, Zap, Shield, Phone, LogOut } from "lucide-react";
import AirQualityNews from "@/components/AirQualityNews";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
      navigate("/");
    }
  };
  const features = [
    {
      icon: MapPin,
      title: "Source Identification",
      description: "AI-powered tracking of pollution sources using satellite, ground, and IoT data",
      link: "/sources",
    },
    {
      icon: TrendingUp,
      title: "AI Forecasting",
      description: "Machine learning predictions for 24-72 hour AQI trends and seasonal outlooks",
      link: "/forecast",
    },
    {
      icon: Users,
      title: "Citizen Engagement",
      description: "Hyperlocal AQI monitoring, health alerts, and safe route recommendations",
      link: "/citizen",
    },
    {
      icon: FileText,
      title: "Policy Dashboard",
      description: "Data-driven insights for evidence-based governance and intervention tracking",
      link: "/policy",
    },
  ];

  const stats = [
    { value: "312", label: "Current AQI", sublabel: "Delhi-NCR" },
    { value: "42", label: "Monitoring Stations", sublabel: "Real-time data" },
    { value: "35%", label: "Stubble Contribution", sublabel: "Primary source" },
    { value: "89%", label: "Forecast Accuracy", sublabel: "24-hour window" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Logout Button - Fixed Position */}
      <div className="fixed top-20 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2 shadow-elevated hover-lift"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-sky">
        <div className="absolute inset-0 bg-[image:var(--gradient-glow)] animate-pulse-slow"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground">
                AI-Powered Environmental Intelligence Platform
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Delhi-NCR AirSense
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform pollution management with <span className="font-bold">real-time AI analytics</span>, 
              satellite data integration, and <span className="font-bold">predictive forecasting</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 shadow-elevated hover-lift bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6">
                  Explore Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/citizen">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover-lift text-lg px-8 py-6"
                >
                  Citizen Portal
                </Button>
              </Link>
            </div>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
              {[
                { icon: Brain, text: "AI Source Detection" },
                { icon: TrendingUp, text: "72hr Forecasting" },
                { icon: Shield, text: "Policy Insights" },
                { icon: Zap, text: "Real-time Updates" }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full hover-lift"
                >
                  <feature.icon className="w-4 h-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card
              key={stat.label}
              variant="gradient"
              className="p-8 text-center group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
              <div className="font-semibold mb-1 text-lg">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for every stakeholder in pollution management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card 
                  variant="glow"
                  className="p-8 h-full cursor-pointer"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 flex items-center justify-between">
                          {feature.title}
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Data Sources */}
        <Card variant="elevated" className="p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8 text-center">Integrated Data Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CheckCircle, label: "Satellite Data", sublabel: "NASA MODIS & ISRO NRSC", color: "primary" },
                { icon: CheckCircle, label: "Ground Monitors", sublabel: "CPCB & DPCC Stations", color: "secondary" },
                { icon: CheckCircle, label: "Weather Data", sublabel: "IMD & OpenWeather", color: "accent" },
                { icon: CheckCircle, label: "Traffic Analytics", sublabel: "Google Maps API", color: "warning" }
              ].map((source, idx) => (
                <div 
                  key={source.label} 
                  className="text-center group hover-lift"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-${source.color}/10 flex items-center justify-center group-hover:bg-${source.color}/20 transition-all duration-300 group-hover:scale-110`}>
                    <source.icon className={`w-10 h-10 text-${source.color}`} />
                  </div>
                  <h4 className="font-bold mb-2 text-lg">{source.label}</h4>
                  <p className="text-sm text-muted-foreground">{source.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Key Points for Delhi Citizens */}
        <div className="mt-24">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Essential <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Safety Tips</span> for Delhi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick actionable steps to protect yourself and your family from air pollution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Use N95/N99 Masks",
                points: ["Wear outdoors when AQI > 150", "Change every 8-12 hours", "Ensure proper fit"],
                color: "from-primary/20 to-primary/5",
                iconBg: "bg-primary/10",
                iconColor: "text-primary"
              },
              {
                icon: Cloud,
                title: "Monitor Indoor Air",
                points: ["Use air purifiers with HEPA filters", "Keep windows closed in peak hours", "Indoor plants help absorb toxins"],
                color: "from-secondary/20 to-secondary/5",
                iconBg: "bg-secondary/10",
                iconColor: "text-secondary"
              },
              {
                icon: TrendingUp,
                title: "Check AQI Daily",
                points: ["Plan outdoor activities accordingly", "Avoid morning hours (6-9 AM)", "Use AirSense forecasts for planning"],
                color: "from-accent/20 to-accent/5",
                iconBg: "bg-accent/10",
                iconColor: "text-accent"
              },
              {
                icon: Users,
                title: "Protect Vulnerable Groups",
                points: ["Children & elderly stay indoors", "Pregnant women take extra precautions", "Consult doctors for respiratory issues"],
                color: "from-warning/20 to-warning/5",
                iconBg: "bg-warning/10",
                iconColor: "text-warning"
              },
              {
                icon: Zap,
                title: "Reduce Your Footprint",
                points: ["Use public transport or carpool", "Avoid burning waste or crackers", "Report pollution sources via app"],
                color: "from-destructive/20 to-destructive/5",
                iconBg: "bg-destructive/10",
                iconColor: "text-destructive"
              },
              {
                icon: Brain,
                title: "Stay Informed",
                points: ["Enable health alerts in AirSense", "Follow government advisories", "Join community clean air initiatives"],
                color: "from-primary/20 to-secondary/5",
                iconBg: "bg-gradient-to-br from-primary/10 to-secondary/10",
                iconColor: "text-primary"
              }
            ].map((tip, idx) => (
              <Card
                key={tip.title}
                variant="animated"
                className="p-6 relative overflow-hidden group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl ${tip.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tip.icon className={`w-7 h-7 ${tip.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{tip.title}</h3>
                  
                  <ul className="space-y-2">
                    {tip.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Latest News Section */}
        <div className="mt-24">
          <AirQualityNews />
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-24 px-4 relative overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
        <div className="absolute inset-0 bg-[image:var(--gradient-glow)]"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Difference?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of citizens and policymakers working together for cleaner air. 
              Start monitoring, reporting, and making data-driven decisions today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/citizen">
                <Button size="lg" className="gap-2 shadow-elevated hover-lift text-lg px-8 py-6">
                  <Sparkles className="w-5 h-5" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/policy">
                <Button size="lg" variant="outline" className="gap-2 hover-lift text-lg px-8 py-6">
                  <Shield className="w-5 h-5" />
                  Policy Dashboard
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="gap-2 hover-lift text-lg px-8 py-6">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
