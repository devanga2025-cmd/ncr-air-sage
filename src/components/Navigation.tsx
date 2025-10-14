import { Link, useLocation } from "react-router-dom";
import { Cloud, Home, MapPin, TrendingUp, Users, FileText, Wind, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: Cloud },
    { path: "/sources", label: "Sources", icon: MapPin },
    { path: "/forecast", label: "Forecast", icon: TrendingUp },
    { path: "/citizen", label: "Citizen App", icon: Users },
    { path: "/policy", label: "Policy", icon: FileText },
    { path: "/safety-guidelines", label: "Safety", icon: Shield },
  ];

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center gap-2 font-bold text-xl group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AirSense
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2 transition-all duration-300",
                      isActive ? "shadow-glow" : "hover:bg-primary/10"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            <Link to="/contact">
              <Button
                variant={location.pathname === "/contact" ? "default" : "outline"}
                size="sm"
                className="gap-2 ml-2 hover-lift shadow-glow"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
