import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Cloud, AlertTriangle, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Forecast = () => {
  const forecastData = [
    { time: "Now", aqi: 312, lower: 290, upper: 335 },
    { time: "6h", aqi: 328, lower: 305, upper: 350 },
    { time: "12h", aqi: 345, lower: 320, upper: 370 },
    { time: "18h", aqi: 362, lower: 335, upper: 390 },
    { time: "24h", aqi: 378, lower: 350, upper: 405 },
    { time: "30h", aqi: 365, lower: 340, upper: 390 },
    { time: "36h", aqi: 342, lower: 320, upper: 365 },
    { time: "42h", aqi: 318, lower: 295, upper: 340 },
    { time: "48h", aqi: 295, lower: 270, upper: 320 },
  ];

  const sourceContributionForecast = [
    { time: "Today", stubble: 35, vehicular: 28, industrial: 22, construction: 15 },
    { time: "Tomorrow", stubble: 42, vehicular: 26, industrial: 20, construction: 12 },
    { time: "Day 3", stubble: 38, vehicular: 30, industrial: 19, construction: 13 },
  ];

  const predictions = [
    {
      icon: TrendingUp,
      title: "AQI Trend",
      prediction: "Increasing",
      confidence: 92,
      description: "Expected to worsen over next 24-48 hours",
      color: "destructive",
    },
    {
      icon: Cloud,
      title: "Stubble Burning",
      prediction: "+30% Activity",
      confidence: 88,
      description: "Favorable weather conditions in Punjab region",
      color: "warning",
    },
    {
      icon: AlertTriangle,
      title: "Critical Hours",
      prediction: "6 PM - 10 PM",
      confidence: 85,
      description: "Peak pollution expected during evening rush",
      color: "destructive",
    },
    {
      icon: CheckCircle,
      title: "Wind Dispersal",
      prediction: "Improvement Day 3",
      confidence: 78,
      description: "Wind speed increase will aid pollutant dispersal",
      color: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI-Powered Air Quality Forecasting</h1>
          <p className="text-muted-foreground">
            Machine learning predictions for Delhi-NCR pollution trends
          </p>
        </div>

        {/* AI Predictions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {predictions.map((pred) => {
            const Icon = pred.icon;
            return (
              <Card
                key={pred.title}
                className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border hover:shadow-glow transition-smooth"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-${pred.color}/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${pred.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">{pred.title}</h3>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-2">{pred.prediction}</div>
                <p className="text-sm text-muted-foreground mb-3">{pred.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${pred.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{pred.confidence}%</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Forecast Chart */}
        <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">48-Hour AQI Forecast</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Predicted values with confidence intervals
              </p>
            </div>
            <Badge variant="secondary" className="gap-2">
              <Calendar className="w-4 h-4" />
              Next 2 Days
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
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
              <Legend />
              <Area
                type="monotone"
                dataKey="upper"
                stroke="transparent"
                fill="url(#colorConfidence)"
                name="Upper Confidence"
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="transparent"
                fill="url(#colorConfidence)"
                name="Lower Confidence"
              />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="hsl(var(--destructive))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--destructive))", r: 5 }}
                name="Predicted AQI"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Source Contribution Forecast */}
        <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
          <h3 className="text-xl font-semibold mb-4">Predicted Source Contributions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sourceContributionForecast}>
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
              <Legend />
              <Line
                type="monotone"
                dataKey="stubble"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                name="Stubble Burning"
              />
              <Line
                type="monotone"
                dataKey="vehicular"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                name="Vehicular"
              />
              <Line
                type="monotone"
                dataKey="industrial"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                name="Industrial"
              />
              <Line
                type="monotone"
                dataKey="construction"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Construction"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Model Info */}
        <Card className="mt-8 p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
          <h3 className="text-xl font-semibold mb-4">Forecasting Model Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Model Architecture</h4>
              <p className="text-sm text-muted-foreground">
                LSTM Neural Network with attention mechanism trained on 5 years of historical data
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Input Features</h4>
              <p className="text-sm text-muted-foreground">
                AQI history, meteorological data, satellite imagery, traffic patterns, seasonal indicators
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Accuracy Metrics</h4>
              <p className="text-sm text-muted-foreground">
                24h forecast: 89% accuracy | 48h forecast: 82% accuracy | RMSE: 23.4
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Forecast;
