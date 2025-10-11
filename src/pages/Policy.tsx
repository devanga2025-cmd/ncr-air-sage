import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Download,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "sonner";

const Policy = () => {
  const interventionData = [
    { date: "Oct 15", baseline: 310, withOddEven: 278, withConstructionBan: 265 },
    { date: "Oct 20", baseline: 325, withOddEven: 289, withConstructionBan: 275 },
    { date: "Oct 25", baseline: 342, withOddEven: 298, withConstructionBan: 285 },
    { date: "Oct 30", baseline: 358, withOddEven: 312, withConstructionBan: 298 },
  ];

  const effectivenessData = [
    { intervention: "Odd-Even", effectiveness: 85, cost: 45, feasibility: 70 },
    { intervention: "Construction Ban", effectiveness: 78, cost: 30, feasibility: 85 },
    { intervention: "Industrial Curbs", effectiveness: 72, cost: 60, feasibility: 65 },
    { intervention: "Traffic Diversion", effectiveness: 65, cost: 40, feasibility: 80 },
  ];

  const aiRecommendations = [
    {
      icon: Lightbulb,
      title: "Immediate Action Required",
      recommendation: "Implement odd-even vehicle scheme for next 72 hours",
      impact: "Expected 12-15% AQI reduction",
      confidence: 89,
      priority: "critical",
    },
    {
      icon: AlertCircle,
      title: "Construction Site Enforcement",
      recommendation: "Focus on Gurgaon and Noida construction sites",
      impact: "Target 8% reduction from dust control",
      confidence: 82,
      priority: "high",
    },
    {
      icon: TrendingDown,
      title: "Industrial Emission Control",
      recommendation: "Temporary production limits for Faridabad industries",
      impact: "Projected 6% improvement in industrial zones",
      confidence: 76,
      priority: "medium",
    },
    {
      icon: CheckCircle,
      title: "Green Corridor Expansion",
      recommendation: "Prioritize tree plantation in high-traffic areas",
      impact: "Long-term 4-5% AQI improvement",
      confidence: 71,
      priority: "low",
    },
  ];

  const getPriorityColor = (priority: string): "destructive" | "secondary" => {
    const colors: Record<string, "destructive" | "secondary"> = {
      critical: "destructive",
      high: "destructive",
      medium: "secondary",
      low: "secondary",
    };
    return colors[priority] || "secondary";
  };

  const handleExportReport = () => {
    toast.success("Report exported successfully! Check your downloads folder.");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Policy Dashboard</h1>
            <p className="text-muted-foreground">
              Data-driven insights and AI recommendations for evidence-based policymaking
            </p>
          </div>
          <Button className="gap-2 shadow-glow" onClick={handleExportReport}>
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-primary" />
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">12</div>
            <div className="text-sm text-muted-foreground">Policy Interventions</div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-success" />
              <Badge variant="secondary" className="bg-success/10 text-success">-8.5%</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">289</div>
            <div className="text-sm text-muted-foreground">Current AQI (vs Baseline)</div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-secondary" />
              <Badge variant="secondary">Verified</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">₹45L</div>
            <div className="text-sm text-muted-foreground">Cost Savings (Health)</div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-warning" />
              <Badge variant="secondary">Monitored</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">156</div>
            <div className="text-sm text-muted-foreground">Compliance Checks</div>
          </Card>
        </div>

        {/* AI Recommendations */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            AI-Generated Policy Recommendations
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {aiRecommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <Card
                  key={rec.title}
                  className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border hover:shadow-glow transition-smooth"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-${getPriorityColor(rec.priority)}/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${getPriorityColor(rec.priority)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge variant={getPriorityColor(rec.priority)}>
                          {rec.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{rec.recommendation}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{rec.impact}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Confidence:</span>
                          <span className="font-medium">{rec.confidence}%</span>
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Intervention Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <h3 className="text-xl font-semibold mb-4">Policy Intervention Impact</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interventionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Baseline (No Action)"
                />
                <Line
                  type="monotone"
                  dataKey="withOddEven"
                  stroke="hsl(var(--warning))"
                  strokeWidth={2}
                  name="With Odd-Even"
                />
                <Line
                  type="monotone"
                  dataKey="withConstructionBan"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="With Construction Ban"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
            <h3 className="text-xl font-semibold mb-4">Policy Effectiveness Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={effectivenessData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="intervention" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="effectiveness" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Effectiveness %" />
                <Bar dataKey="feasibility" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} name="Feasibility %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Historical Performance */}
        <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
          <h3 className="text-xl font-semibold mb-4">Historical Policy Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Odd-Even Scheme</h4>
                <Badge variant="secondary">2023</Badge>
              </div>
              <div className="text-2xl font-bold text-secondary mb-1">12% ↓</div>
              <p className="text-sm text-muted-foreground">Average AQI reduction during implementation period</p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Construction Ban</h4>
                <Badge variant="secondary">2022-23</Badge>
              </div>
              <div className="text-2xl font-bold text-secondary mb-1">8% ↓</div>
              <p className="text-sm text-muted-foreground">Reduction in PM10 levels in targeted zones</p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Industrial Limits</h4>
                <Badge variant="secondary">2023</Badge>
              </div>
              <div className="text-2xl font-bold text-secondary mb-1">6% ↓</div>
              <p className="text-sm text-muted-foreground">Impact on industrial zone air quality</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Policy;
