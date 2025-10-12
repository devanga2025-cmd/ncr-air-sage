import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Calendar, TrendingUp, AlertTriangle, Info } from "lucide-react";

const AirQualityNews = () => {
  const news = [
    {
      id: 1,
      category: "Alert",
      icon: AlertTriangle,
      title: "Delhi AQI Reaches 'Severe' Category - Stage 4 GRAP Measures Activated",
      summary: "Air quality index crosses 400 mark in multiple areas. Construction activities banned, odd-even vehicle scheme under consideration.",
      date: "Today, 9:00 AM",
      priority: "critical",
      color: "destructive",
    },
    {
      id: 2,
      category: "Update",
      icon: TrendingUp,
      title: "Stubble Burning Incidents Increase by 30% in Punjab",
      summary: "Satellite data shows spike in farm fires. Wind direction expected to carry pollutants towards Delhi-NCR over next 48 hours.",
      date: "Today, 7:30 AM",
      priority: "high",
      color: "warning",
    },
    {
      id: 3,
      category: "Advisory",
      icon: Info,
      title: "Health Advisory Issued for Sensitive Groups",
      summary: "Children, elderly, and people with respiratory conditions advised to stay indoors. Use N95 masks if outdoor activity is necessary.",
      date: "Today, 6:00 AM",
      priority: "medium",
      color: "accent",
    },
    {
      id: 4,
      category: "Policy",
      icon: Newspaper,
      title: "Supreme Court Orders Emergency Meeting on Air Pollution",
      summary: "Delhi government directed to submit action plan. Focus on vehicular emissions and industrial compliance.",
      date: "Yesterday, 4:00 PM",
      priority: "high",
      color: "secondary",
    },
    {
      id: 5,
      category: "Update",
      icon: TrendingUp,
      title: "Wind Speed to Increase - Slight Improvement Expected",
      summary: "Meteorological department predicts better wind conditions from tomorrow afternoon. AQI may improve by 10-15%.",
      date: "Yesterday, 2:30 PM",
      priority: "low",
      color: "primary",
    },
    {
      id: 6,
      category: "Alert",
      icon: AlertTriangle,
      title: "Schools Shift to Online Classes Till Further Notice",
      summary: "Delhi and NCR schools announce temporary closure due to hazardous air quality. Virtual learning resumes from tomorrow.",
      date: "Yesterday, 11:00 AM",
      priority: "high",
      color: "destructive",
    },
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "destructive" | "secondary" | "outline"> = {
      critical: "destructive",
      high: "destructive",
      medium: "secondary",
      low: "outline",
    };
    return variants[priority] || "outline";
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Newspaper className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Latest Air Quality Updates</h2>
          <p className="text-sm text-muted-foreground">Real-time news and alerts for Delhi-NCR</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {news.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className="p-5 shadow-card bg-gradient-card backdrop-blur-sm border-border hover:shadow-glow transition-smooth hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-${item.color}/10 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 text-${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getPriorityBadge(item.priority)} className="text-xs">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-5 shadow-card bg-gradient-card backdrop-blur-sm border-border border-primary/20">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-1 text-sm">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              This news section is updated every hour with the latest air quality information, policy changes, 
              and health advisories. Enable notifications to receive critical alerts about severe pollution events.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AirQualityNews;
