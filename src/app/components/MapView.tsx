"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue
const fixLeafletIcons = async () => {
  const L = await import("leaflet");
  
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

interface Community {
  name: string;
  location: string;
  slug: string;
  tier: string;
  score: number;
  lat: number;
  lng: number;
}

interface MapViewProps {
  communities: Community[];
}

export default function MapView({ communities }: MapViewProps) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  // Center on New Jersey
  const center: [number, number] = [40.3573, -74.6672];

  return (
    <div className="h-[600px] w-full rounded overflow-hidden" style={{ background: 'var(--color-background-secondary)' }}>
      <MapContainer 
        center={center} 
        zoom={8} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {communities.map((community) => (
          <Marker 
            key={community.slug} 
            position={[community.lat, community.lng]}
          >
            <Popup>
              <div className="text-sm">
                <strong>{community.name}</strong>
                <br />
                <span className="text-muted">{community.location}</span>
                <br />
                Score: {community.score} · {community.tier}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
