import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

const CitizenMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [77.2090, 28.6139], // Delhi coordinates
      zoom: 11,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for nearby areas with AQI - High pollution areas highlighted
    const locations = [
      { name: "Nehru Place", coords: [77.2507, 28.5494], aqi: 312, color: '#dc2626', status: 'Hazardous' },
      { name: "Connaught Place", coords: [77.2195, 28.6304], aqi: 298, color: '#dc2626', status: 'Hazardous' },
      { name: "Anand Vihar", coords: [77.3161, 28.6469], aqi: 356, color: '#991b1b', status: 'Hazardous' },
      { name: "Karol Bagh", coords: [77.1906, 28.6517], aqi: 245, color: '#ea580c', status: 'Very Unhealthy' },
      { name: "Rajouri Garden", coords: [77.1219, 28.6414], aqi: 267, color: '#dc2626', status: 'Hazardous' },
      { name: "Dwarka", coords: [77.0469, 28.5921], aqi: 278, color: '#dc2626', status: 'Hazardous' },
      { name: "Rohini", coords: [77.0688, 28.7488], aqi: 189, color: '#f59e0b', status: 'Unhealthy' },
      { name: "Punjabi Bagh", coords: [77.1314, 28.6742], aqi: 301, color: '#dc2626', status: 'Hazardous' },
      { name: "ITO", coords: [77.2419, 28.6289], aqi: 289, color: '#dc2626', status: 'Hazardous' },
      { name: "Mayur Vihar", coords: [77.2975, 28.6078], aqi: 267, color: '#dc2626', status: 'Hazardous' },
    ];

    locations.forEach(location => {
      // Create a custom marker element with pulsing effect for high pollution
      const el = document.createElement('div');
      el.className = 'custom-marker';
      const isHighPollution = location.aqi > 250;
      
      el.style.width = isHighPollution ? '50px' : '40px';
      el.style.height = isHighPollution ? '50px' : '40px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = location.color;
      el.style.border = '3px solid white';
      el.style.boxShadow = isHighPollution 
        ? '0 0 20px rgba(220, 38, 38, 0.8), 0 4px 12px rgba(0,0,0,0.3)' 
        : '0 4px 12px rgba(0,0,0,0.3)';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.color = 'white';
      el.style.fontWeight = 'bold';
      el.style.fontSize = isHighPollution ? '13px' : '11px';
      el.style.cursor = 'pointer';
      el.style.animation = isHighPollution ? 'pulse 2s infinite' : 'none';
      el.textContent = location.aqi.toString();

      // Add CSS animation for pulsing effect
      if (isHighPollution && !document.getElementById('marker-pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'marker-pulse-animation';
        style.textContent = `
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.9; }
          }
        `;
        document.head.appendChild(style);
      }

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(location.coords as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<div style="padding: 12px; min-width: 150px;">
                <h3 style="font-weight: bold; margin-bottom: 6px; font-size: 16px; color: ${location.color};">${location.name}</h3>
                <p style="margin: 4px 0; font-size: 15px;">AQI: <strong style="color: ${location.color};">${location.aqi}</strong></p>
                <p style="margin: 4px 0; font-size: 13px; color: ${location.color}; font-weight: 600;">${location.status}</p>
                ${isHighPollution ? '<p style="margin: 4px 0; font-size: 11px; color: #666;">⚠️ High pollution area</p>' : ''}
              </div>`
            )
        )
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken]);

  const handleSetToken = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      toast.success("Map loaded successfully!");
    } else {
      toast.error("Please enter a valid Mapbox token");
    }
  };

  if (!isTokenSet) {
    return (
      <div className="p-8 border-2 border-dashed border-border rounded-lg bg-gradient-card backdrop-blur-sm">
        <div className="max-w-md mx-auto text-center">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Interactive AQI Map</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your Mapbox public token to view an interactive map showing real-time AQI data across Delhi-NCR.
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline mt-2 inline-block"
            >
              Get your free token at mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijo..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSetToken} className="gap-2">
              <MapPin className="w-4 h-4" />
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-elevated border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-card border border-border">
        <h4 className="text-sm font-semibold mb-2">Live AQI Map</h4>
        <p className="text-xs text-muted-foreground mb-2">Click markers for details</p>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#991b1b] animate-pulse"></div>
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#dc2626]"></div>
            <span>Hazardous</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ea580c]"></div>
            <span>Very Unhealthy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenMap;
