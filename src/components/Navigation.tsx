import { Link, useLocation } from "react-router-dom";
import { Cloud, Home, MapPin, TrendingUp, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: Cloud },
    { path: "/sources", label: "Sources", icon: MapPin },
    { path: "/forecast", label: "Forecast", icon: TrendingUp },
    { path: "/citizen", label: "Citizen App", icon: Users },
    { path: "/policy", label: "Policy", icon: FileText },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-sky flex items-center justify-center">
              <Cloud className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">AirSense NCR</span>
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
                      "gap-2 transition-smooth",
                      isActive && "shadow-glow"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
