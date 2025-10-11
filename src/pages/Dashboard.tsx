import { Card } from "@/components/ui/card";
import { Activity, AlertTriangle, TrendingDown, Wind } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Dummy data for demonstration
  const aqiData = [
    { time: "00:00", aqi: 156 },
    { time: "04:00", aqi: 178 },
    { time: "08:00", aqi: 245 },
    { time: "12:00", aqi: 289 },
    { time: "16:00", aqi: 312 },
    { time: "20:00", aqi: 267 },
  ];

  const sourceData = [
    { source: "Stubble Burning", value: 35, color: "hsl(var(--destructive))" },
    { source: "Vehicular", value: 28, color: "hsl(var(--warning))" },
    { source: "Industrial", value: 22, color: "hsl(var(--accent))" },
    { source: "Construction", value: 15, color: "hsl(var(--primary))" },
  ];

  const regionData = [
    { region: "Delhi Central", aqi: 312 },
    { region: "Gurgaon", aqi: 289 },
    { region: "Noida", aqi: 267 },
    { region: "Faridabad", aqi: 245 },
    { region: "Ghaziabad", aqi: 278 },
  ];

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "text-success" };
    if (aqi <= 100) return { label: "Moderate", color: "text-accent" };
    if (aqi <= 200) return { label: "Unhealthy", color: "text-warning" };
    return { label: "Hazardous", color: "text-destructive" };
  };

  const currentAQI = 312;
  const status = getAQIStatus(currentAQI);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Real-time Air Quality Dashboard</h1>
          <p className="text-muted-foreground">Live monitoring of Delhi-NCR air pollution</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-primary" />
              <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
            </div>
            <div className="text-3xl font-bold mb-1">{currentAQI}</div>
            <div className="text-sm text-muted-foreground">Current AQI</div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4">
              <Wind className="w-8 h-8 text-secondary" />
              <span className="text-sm font-medium text-secondary">Active</span>
            </div>
            <div className="text-3xl font-bold mb-1">42</div>
            <div className="text-sm text-muted-foreground">Monitoring Stations</div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <span className="text-sm font-medium text-destructive">Critical</span>
            </div>
            <div className="text-3xl font-bold mb-1">8</div>
            <div className="text-sm text-muted-foreground">Pollution Hotspots</div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-warning" />
              <span className="text-sm font-medium text-warning">-12%</span>
            </div>
            <div className="text-3xl font-bold mb-1">35%</div>
            <div className="text-sm text-muted-foreground">From Stubble Burning</div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <h3 className="text-xl font-semibold mb-4">24-Hour AQI Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={aqiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="aqi"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--destructive))", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <h3 className="text-xl font-semibold mb-4">Pollution Source Attribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, value }) => `${source}: ${value}%`}
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Regional Comparison */}
        <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
          <h3 className="text-xl font-semibold mb-4">Regional AQI Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="aqi" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
