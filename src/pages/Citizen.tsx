import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Heart,
  Activity,
  Navigation,
  AlertTriangle,
  Info,
  Camera,
  Shield,
  Wind,
  Droplets,
  Sun,
  Thermometer,
} from "lucide-react";
import { toast } from "sonner";
import AirQualityChat from "@/components/AirQualityChat";
import AirQualityNews from "@/components/AirQualityNews";

const Citizen = () => {
  const nearbyAreas = [
    { name: "Connaught Place", distance: "2.3 km", aqi: 298, status: "unhealthy" },
    { name: "Karol Bagh", distance: "4.1 km", aqi: 245, status: "unhealthy" },
    { name: "Rajouri Garden", distance: "5.8 km", aqi: 267, status: "unhealthy" },
    { name: "Rohini", distance: "12.5 km", aqi: 189, status: "moderate" },
  ];

  const healthRecommendations = [
    {
      icon: Shield,
      title: "Wear N95 Mask",
      description: "Use certified masks when outdoors",
      priority: "high",
    },
    {
      icon: Activity,
      title: "Avoid Outdoor Exercise",
      description: "Indoor activities recommended",
      priority: "high",
    },
    {
      icon: Heart,
      title: "Stay Hydrated",
      description: "Drink plenty of water",
      priority: "medium",
    },
    {
      icon: Info,
      title: "Check AQI Regularly",
      description: "Monitor air quality throughout the day",
      priority: "medium",
    },
  ];

  const getAQIColor = (aqi: number): "destructive" | "secondary" => {
    if (aqi <= 50) return "secondary";
    if (aqi <= 100) return "secondary";
    if (aqi <= 200) return "destructive";
    return "destructive";
  };

  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 200) return "Unhealthy";
    return "Hazardous";
  };

  const handleChangeLocation = () => {
    toast.info("Location change feature coming soon! You'll be able to select any area in Delhi-NCR.");
  };

  const handleFindRoute = () => {
    toast.success("Analyzing air quality data to find the cleanest route for you...");
  };

  const handleReportPollution = () => {
    toast.success("Camera opened! Take a photo of the pollution incident to report.");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Citizen Air Quality App</h1>
          <p className="text-muted-foreground">
            Real-time hyperlocal pollution data and personalized health guidance
          </p>
        </div>

        {/* Current Location AQI */}
        <Card className="p-8 shadow-glow bg-gradient-card backdrop-blur-sm border-border mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium text-muted-foreground">Your Location</h2>
              </div>
              <h3 className="text-3xl font-bold mb-1">Nehru Place, Delhi</h3>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleChangeLocation}>
              <Navigation className="w-4 h-4" />
              Change Location
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="text-6xl font-bold text-destructive mb-2">312</div>
              <Badge variant="destructive" className="text-base px-3 py-1">
                Hazardous
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: 5 minutes ago
              </p>
            </div>

            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Health Alert: High Risk</h4>
                  <p className="text-sm text-muted-foreground">
                    Air quality is hazardous. Everyone should avoid all outdoor physical activity.
                    Stay indoors and keep windows closed.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 border border-border rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">PM2.5</div>
                  <div className="text-xl font-bold">156</div>
                </div>
                <div className="p-3 border border-border rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">PM10</div>
                  <div className="text-xl font-bold">287</div>
                </div>
                <div className="p-3 border border-border rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">O₃</div>
                  <div className="text-xl font-bold">98</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Health Recommendations */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Personalized Health Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthRecommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <Card
                  key={rec.title}
                  className="p-4 shadow-card bg-gradient-card backdrop-blur-sm border-border"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${rec.priority === 'high' ? 'bg-destructive/10' : 'bg-primary/10'} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${rec.priority === 'high' ? 'text-destructive' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                          {rec.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Nearby Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Nearby Areas AQI</h3>
            <div className="space-y-3">
              {nearbyAreas.map((area) => (
                <Card
                  key={area.name}
                  className="p-4 shadow-card bg-gradient-card backdrop-blur-sm border-border hover:shadow-glow transition-smooth cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{area.name}</h4>
                      <p className="text-sm text-muted-foreground">{area.distance} away</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${area.aqi > 200 ? 'text-destructive' : 'text-secondary'}`}>
                        {area.aqi}
                      </div>
                      <Badge variant={getAQIColor(area.aqi)} className="mt-1">
                        {getAQILabel(area.aqi)}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Safe Route Finder</h3>
            <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Destination</label>
                <input
                  type="text"
                  placeholder="Enter destination address"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <Button className="w-full gap-2 shadow-glow" onClick={handleFindRoute}>
                <Navigation className="w-4 h-4" />
                Find Cleanest Route
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                We'll suggest routes with lower AQI levels for your journey
              </p>
            </Card>

            <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border mt-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Report Pollution
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Help improve air quality by reporting pollution incidents in your area
              </p>
              <Button variant="outline" className="w-full gap-2" onClick={handleReportPollution}>
                <Camera className="w-4 h-4" />
                Take Photo & Report
              </Button>
            </Card>
          </div>
        </div>

        {/* Weather Impact */}
        <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border mb-8">
          <h3 className="text-2xl font-semibold mb-4">Weather Impact on AQI</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Wind className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Wind Speed & Direction</h4>
                <p className="text-sm text-muted-foreground">
                  Strong winds help disperse pollutants. Wind from Punjab/Haryana can bring stubble burning smoke.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Droplets className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Humidity & Rain</h4>
                <p className="text-sm text-muted-foreground">
                  Rain washes away pollutants temporarily. High humidity can trap pollutants near the ground.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Thermometer className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Temperature Inversion</h4>
                <p className="text-sm text-muted-foreground">
                  Cold winter mornings trap pollution close to ground. AQI typically improves by afternoon.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sun className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Seasonal Patterns</h4>
                <p className="text-sm text-muted-foreground">
                  October-January: Worst pollution due to stubble burning, firecrackers, and low wind. March-September: Better air quality.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Community Stats */}
        <Card className="p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border">
          <h3 className="text-2xl font-semibold mb-4">Community Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Active Users Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">89</div>
              <div className="text-sm text-muted-foreground">Pollution Reports</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">3,421</div>
              <div className="text-sm text-muted-foreground">Safe Routes Found</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-1">156K</div>
              <div className="text-sm text-muted-foreground">People Protected</div>
            </div>
          </div>
        </Card>

        {/* News Section */}
        <div className="mt-8">
          <AirQualityNews />
        </div>
      </div>

      {/* AI Chat Assistant */}
      <AirQualityChat />
    </div>
  );
};

export default Citizen;
