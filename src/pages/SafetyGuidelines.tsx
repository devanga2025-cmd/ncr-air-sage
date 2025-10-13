import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Wind, Heart, Home, Users, Activity, Phone, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SafetyGuidelines = () => {
  const aqiLevels = [
    {
      range: "0-50",
      level: "Good",
      color: "bg-success",
      description: "Air quality is satisfactory, and air pollution poses little or no risk.",
      actions: ["Enjoy outdoor activities", "No precautions needed", "Open windows for fresh air"],
    },
    {
      range: "51-100",
      level: "Moderate",
      color: "bg-accent",
      description: "Air quality is acceptable. However, sensitive individuals may experience minor breathing discomfort.",
      actions: ["Unusually sensitive people should limit prolonged outdoor exertion", "Everyone else can enjoy normal outdoor activities"],
    },
    {
      range: "101-200",
      level: "Unhealthy for Sensitive Groups",
      color: "bg-warning",
      description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      actions: ["Children, elderly, and people with respiratory diseases should limit prolonged outdoor exertion", "Wear N95/N99 masks if going outdoors"],
    },
    {
      range: "201-300",
      level: "Unhealthy",
      color: "bg-destructive",
      description: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
      actions: ["Everyone should reduce prolonged outdoor exertion", "Use air purifiers indoors", "Wear N95/N99 masks when outdoors", "Close windows and doors"],
    },
    {
      range: "301-400",
      level: "Very Unhealthy",
      color: "bg-destructive",
      description: "Health alert: The risk of health effects is increased for everyone.",
      actions: ["Avoid all outdoor activities", "Stay indoors with air purifiers", "Schools should consider closure", "Emergency health measures may be necessary"],
    },
    {
      range: "401+",
      level: "Hazardous",
      color: "bg-destructive",
      description: "Health warning of emergency conditions: everyone is more likely to be affected.",
      actions: ["Remain indoors at all times", "Seal doors and windows", "Use N95/N99 masks even indoors if necessary", "Seek medical attention if experiencing symptoms"],
    },
  ];

  const protectionMeasures = [
    {
      icon: Shield,
      title: "Wear Proper Masks",
      description: "Use N95 or N99 masks that filter PM2.5 particles",
      tips: ["Replace mask every 8-12 hours of use", "Ensure tight fit around nose and mouth", "Don't reuse disposable masks", "Children need child-sized masks"],
    },
    {
      icon: Home,
      title: "Indoor Air Quality",
      description: "Keep your home environment clean and safe",
      tips: ["Use HEPA air purifiers in living spaces", "Keep windows closed during high pollution", "Use air conditioners with good filters", "Add indoor plants (Spider plant, Snake plant, Aloe Vera)"],
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description: "Track your health and symptoms regularly",
      tips: ["Monitor breathing difficulties", "Check for eye irritation or headaches", "Keep inhalers handy if you have asthma", "Consult doctor if symptoms persist"],
    },
    {
      icon: Wind,
      title: "Outdoor Precautions",
      description: "Minimize exposure when pollution is high",
      tips: ["Avoid morning hours (6-9 AM) - highest pollution", "Exercise indoors when AQI > 150", "Plan outdoor activities based on AQI forecast", "Use covered routes to reduce exposure"],
    },
  ];

  const vulnerableGroups = [
    {
      group: "Children",
      icon: Users,
      risks: ["Developing lungs are more susceptible", "Higher breathing rate increases exposure", "More time spent outdoors"],
      precautions: ["Limit outdoor playtime when AQI > 100", "Ensure school has air purifiers", "Monitor for breathing difficulties", "Keep rescue medications accessible"],
    },
    {
      group: "Elderly (65+)",
      icon: Heart,
      risks: ["Weakened immune system", "Pre-existing conditions worsen", "Reduced lung capacity"],
      precautions: ["Stay indoors during high pollution days", "Keep emergency medications ready", "Regular health check-ups", "Use air purifiers in living areas"],
    },
    {
      group: "Pregnant Women",
      icon: Activity,
      risks: ["Can affect fetal development", "Increased risk of complications", "Lower oxygen levels"],
      precautions: ["Avoid outdoor exposure when AQI > 100", "Use N95 masks when necessary to go out", "Regular prenatal check-ups", "Maintain good indoor air quality"],
    },
    {
      group: "Respiratory Patients",
      icon: Wind,
      risks: ["Asthma attacks triggered", "COPD exacerbations", "Reduced lung function"],
      precautions: ["Always carry rescue inhalers", "Monitor peak flow regularly", "Keep emergency contacts handy", "Follow doctor's action plan strictly"],
    },
  ];

  const emergencyContacts = [
    { name: "National Emergency Number", number: "112", icon: Phone },
    { name: "Ambulance", number: "102", icon: Activity },
    { name: "Delhi Pollution Control", number: "011-43102110", icon: Wind },
    { name: "AIIMS Emergency", number: "011-26588500", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Comprehensive Safety Guide</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Safety <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Guidelines</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Essential information to protect yourself and your loved ones from air pollution in Delhi-NCR
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* AQI Levels Guide */}
        <Card variant="elevated" className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-warning" />
              Understanding AQI Levels
            </CardTitle>
            <CardDescription>Know what each Air Quality Index level means and how to protect yourself</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aqiLevels.map((level, idx) => (
              <Card key={level.level} variant="animated" style={{ animationDelay: `${idx * 0.05}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <Badge className={`${level.color} text-white text-lg px-4 py-2`}>{level.range}</Badge>
                      <CardTitle className="text-xl">{level.level}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base mt-2">{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm text-muted-foreground mb-2">Recommended Actions:</p>
                    <ul className="space-y-1">
                      {level.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Protection Measures */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Protection <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Measures</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protectionMeasures.map((measure, idx) => (
              <Card key={measure.title} variant="glow" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <measure.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{measure.title}</CardTitle>
                      <CardDescription>{measure.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {measure.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vulnerable Groups */}
        <Card variant="elevated" className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Heart className="w-8 h-8 text-destructive" />
              Special Care for Vulnerable Groups
            </CardTitle>
            <CardDescription>Extra precautions needed for high-risk populations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {vulnerableGroups.map((group, idx) => (
              <Card key={group.group} variant="animated" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <group.icon className="w-6 h-6 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">{group.group}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground mb-3">Health Risks:</p>
                    <ul className="space-y-2">
                      {group.risks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground mb-3">Precautions:</p>
                    <ul className="space-y-2">
                      {group.precautions.map((precaution, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card variant="gradient" className="bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Phone className="w-8 h-8 text-destructive" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>Keep these numbers handy for pollution-related health emergencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.name} className="flex items-center gap-4 p-4 rounded-lg bg-card hover-lift">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <contact.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-2xl font-bold text-destructive">{contact.number}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyGuidelines;
