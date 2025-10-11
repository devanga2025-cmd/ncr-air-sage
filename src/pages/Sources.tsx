import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, Car, Construction, Flame, MapPin, AlertCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const Sources = () => {
  const sourceContributions = [
    { month: "Oct", stubble: 42, vehicular: 28, industrial: 18, construction: 12 },
    { month: "Nov", stubble: 48, vehicular: 25, industrial: 16, construction: 11 },
    { month: "Dec", stubble: 35, vehicular: 30, industrial: 22, construction: 13 },
    { month: "Jan", stubble: 15, vehicular: 35, industrial: 28, construction: 22 },
  ];

  const hourlyData = [
    { time: "Morning", stubble: 65, vehicular: 45, industrial: 30, construction: 20 },
    { time: "Afternoon", stubble: 55, vehicular: 75, industrial: 60, construction: 50 },
    { time: "Evening", stubble: 80, vehicular: 85, industrial: 55, construction: 40 },
    { time: "Night", stubble: 45, vehicular: 30, industrial: 40, construction: 15 },
  ];

  const sources = [
    {
      icon: Flame,
      title: "Crop Stubble Burning",
      contribution: 35,
      severity: "critical",
      description: "Agricultural burning in Punjab & Haryana",
      regions: ["Punjab", "Haryana", "Western UP"],
      status: "Peak season detected",
      color: "destructive",
    },
    {
      icon: Car,
      title: "Vehicular Emissions",
      contribution: 28,
      severity: "high",
      description: "Traffic congestion and vehicle pollution",
      regions: ["Delhi Central", "Gurgaon", "Noida"],
      status: "Rush hour spike",
      color: "warning",
    },
    {
      icon: Factory,
      title: "Industrial Emissions",
      contribution: 22,
      severity: "moderate",
      description: "Factory emissions and power plants",
      regions: ["Faridabad", "Ghaziabad", "Sonipat"],
      status: "Monitoring active",
      color: "accent",
    },
    {
      icon: Construction,
      title: "Construction Dust",
      contribution: 15,
      severity: "moderate",
      description: "Building sites and road work",
      regions: ["All NCR regions"],
      status: "Multiple sites flagged",
      color: "primary",
    },
  ];

  const getSeverityBadge = (severity: string): "destructive" | "secondary" => {
    const variants: Record<string, "destructive" | "secondary"> = {
      critical: "destructive",
      high: "destructive",
      moderate: "secondary",
    };
    return variants[severity] || "secondary";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Pollution Source Analysis</h1>
          <p className="text-muted-foreground">
            AI-powered identification and tracking of pollution sources across Delhi-NCR
          </p>
        </div>

        {/* Source Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {sources.map((source) => {
            const Icon = source.icon;
            return (
              <Card
                key={source.title}
                className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border hover:shadow-glow transition-smooth"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-${source.color}/10 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${source.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{source.title}</h3>
                      <p className="text-sm text-muted-foreground">{source.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{source.contribution}%</div>
                    <Badge variant={getSeverityBadge(source.severity)} className="mt-1">
                      {source.severity}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Active in: {source.regions.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{source.status}</span>
                  </div>
                </div>

                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${source.color}`}
                    style={{ width: `${source.contribution}%` }}
                  />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <h3 className="text-xl font-semibold mb-4">Monthly Source Contribution Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceContributions}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="stubble" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vehicular" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="industrial" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="construction" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <h3 className="text-xl font-semibold mb-4">Hourly Source Pattern Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={hourlyData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar
                  name="Stubble"
                  dataKey="stubble"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Vehicular"
                  dataKey="vehicular"
                  stroke="hsl(var(--warning))"
                  fill="hsl(var(--warning))"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Data Sources Info */}
        <Card className="mt-8 p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
          <h3 className="text-xl font-semibold mb-4">Data Integration Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Satellite Data</h4>
              <p className="text-sm text-muted-foreground">NASA MODIS & ISRO NRSC</p>
              <Badge variant="secondary" className="mt-2">Active</Badge>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Ground Monitors</h4>
              <p className="text-sm text-muted-foreground">CPCB & DPCC Stations</p>
              <Badge variant="secondary" className="mt-2">Active</Badge>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Weather API</h4>
              <p className="text-sm text-muted-foreground">IMD & OpenWeather</p>
              <Badge variant="secondary" className="mt-2">Active</Badge>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Traffic Data</h4>
              <p className="text-sm text-muted-foreground">Google Maps API</p>
              <Badge variant="secondary" className="mt-2">Active</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Sources;
