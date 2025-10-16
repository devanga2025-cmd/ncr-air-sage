import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AlertCircle, Wind, Factory, Car, Flame } from "lucide-react";
import { getLatestData, getRecentTrend, getPollutantStatus } from "@/utils/airQualityData";
import { useMemo } from "react";

const PollutantBreakdown = () => {
  const latestData = useMemo(() => getLatestData(), []);
  const trendData = useMemo(() => getRecentTrend(24), []);
  
  const pollutantLevels = useMemo(() => [
    { 
      name: "PM2.5", 
      current: latestData.pm25, 
      safe: 60, 
      icon: Wind,
      status: getPollutantStatus(latestData.pm25, "pm25"),
      health: "Primary cause of respiratory issues",
      source: "Vehicles, burning, dust",
    },
    { 
      name: "PM10", 
      current: latestData.pm10, 
      safe: 100, 
      icon: Factory,
      status: getPollutantStatus(latestData.pm10, "pm10"),
      health: "Causes lung inflammation",
      source: "Construction, industrial dust",
    },
    { 
      name: "NO2", 
      current: latestData.no2, 
      safe: 80, 
      icon: Car,
      status: getPollutantStatus(latestData.no2, "no2"),
      health: "Aggravates asthma",
      source: "Vehicle emissions",
    },
    { 
      name: "SO2", 
      current: latestData.so2, 
      safe: 80, 
      icon: Factory,
      status: getPollutantStatus(latestData.so2, "so2"),
      health: "Respiratory irritant",
      source: "Industrial emissions",
    },
    { 
      name: "CO", 
      current: latestData.co, 
      safe: 2.0, 
      icon: Car,
      status: getPollutantStatus(latestData.co, "co"),
      health: "Reduces oxygen delivery",
      source: "Incomplete combustion",
    },
    { 
      name: "O3", 
      current: latestData.ozone, 
      safe: 100, 
      icon: Flame,
      status: getPollutantStatus(latestData.ozone, "ozone"),
      health: "Lung tissue damage",
      source: "Sunlight + pollutants",
    },
  ], [latestData]);

  const hourlyPollutants = useMemo(() => {
    return trendData.map((d) => ({
      time: `${d.date}/${d.month}`,
      pm25: Math.round(d.pm25),
      pm10: Math.round(d.pm10),
      no2: Math.round(d.no2),
    }));
  }, [trendData]);

  const pollutantComparison = useMemo(() => [
    { pollutant: "PM2.5", Delhi: Math.round(latestData.pm25), Mumbai: 98, Bangalore: 65, safe: 60 },
    { pollutant: "PM10", Delhi: Math.round(latestData.pm10), Mumbai: 145, Bangalore: 89, safe: 100 },
    { pollutant: "NO2", Delhi: Math.round(latestData.no2), Mumbai: 62, Bangalore: 48, safe: 80 },
    { pollutant: "O3", Delhi: Math.round(latestData.ozone), Mumbai: 72, Bangalore: 58, safe: 100 },
  ], [latestData]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Severe: "destructive",
      Moderate: "warning",
      Good: "success",
    };
    return colors[status] || "secondary";
  };

  return (
    <div className="space-y-6">
      {/* Pollutant Cards */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Pollutant-wise Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pollutantLevels.map((pollutant) => {
            const Icon = pollutant.icon;
            const exceedance = ((pollutant.current / pollutant.safe) * 100 - 100).toFixed(0);
            return (
              <Card
                key={pollutant.name}
                className="p-4 shadow-card bg-gradient-card backdrop-blur-sm border-border hover-lift transition-smooth"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-${getStatusColor(pollutant.status)}/10 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${getStatusColor(pollutant.status)}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{pollutant.name}</h4>
                      <Badge variant={getStatusColor(pollutant.status) === "destructive" ? "destructive" : "secondary"} className="text-xs">
                        {pollutant.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold">{pollutant.current}</span>
                    <span className="text-sm text-muted-foreground">Safe: {pollutant.safe}</span>
                  </div>
                  {pollutant.current > pollutant.safe && (
                    <div className="text-xs font-medium text-destructive">
                      ⚠️ {exceedance}% above safe limit
                    </div>
                  )}
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${getStatusColor(pollutant.status)}`}
                      style={{ width: `${Math.min((pollutant.current / pollutant.safe) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{pollutant.health}</p>
                  <p className="text-xs text-muted-foreground">Source: {pollutant.source}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Hourly Trends */}
      <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
        <h3 className="text-xl font-semibold mb-4">24-Hour Pollutant Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={hourlyPollutants}>
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
              dataKey="pm25"
              stroke="hsl(var(--destructive))"
              strokeWidth={3}
              name="PM2.5 (μg/m³)"
              dot={{ fill: "hsl(var(--destructive))", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="pm10"
              stroke="hsl(var(--warning))"
              strokeWidth={3}
              name="PM10 (μg/m³)"
              dot={{ fill: "hsl(var(--warning))", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="no2"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              name="NO2 (μg/m³)"
              dot={{ fill: "hsl(var(--accent))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* City Comparison */}
      <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
        <h3 className="text-xl font-semibold mb-4">Delhi vs Other Cities</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={pollutantComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="pollutant" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="Delhi" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Mumbai" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Bangalore" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="safe" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Safe Limit" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default PollutantBreakdown;
