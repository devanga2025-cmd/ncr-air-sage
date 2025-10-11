import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Cloud, MapPin, TrendingUp, Users, FileText, CheckCircle } from "lucide-react";

const Index = () => {
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
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-sky">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Cloud className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Smart Pollution Management Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Delhi-NCR AirSense
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Tackling air quality crisis with AI analytics, satellite data, and citizen engagement
              for evidence-based policymaking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 shadow-glow bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  View Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/citizen">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Citizen App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="p-6 shadow-glow bg-gradient-card backdrop-blur-sm border-border text-center"
            >
              <div className="text-4xl font-bold mb-2 text-primary">{stat.value}</div>
              <div className="font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for monitoring, analyzing, and acting on air quality data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border hover:shadow-glow transition-smooth h-full group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-smooth">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                        {feature.title}
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
                      </h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Data Sources */}
        <Card className="p-8 shadow-card bg-gradient-card backdrop-blur-sm border-border">
          <h3 className="text-2xl font-semibold mb-6 text-center">Integrated Data Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Satellite Data</h4>
              <p className="text-sm text-muted-foreground">NASA MODIS & ISRO NRSC</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-secondary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-medium mb-1">Ground Monitors</h4>
              <p className="text-sm text-muted-foreground">CPCB & DPCC Stations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-medium mb-1">Weather Data</h4>
              <p className="text-sm text-muted-foreground">IMD & OpenWeather</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-warning/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-warning" />
              </div>
              <h4 className="font-medium mb-1">Traffic Analytics</h4>
              <p className="text-sm text-muted-foreground">Google Maps API</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
