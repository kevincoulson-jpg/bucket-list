import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// You'll need to replace this with your own Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2V2aW5jMjYiLCJhIjoiY205bmIwYjYwMG81dDJscTdyM3huN29pYSJ9.Tc5ScSg4xTPWJptsrdCLsA';

interface Activity {
  id: string;
  name: string;
  activityType: string;
  status: 'completed' | 'not yet';
  coordinates: {
    longitude: number;
    latitude: number;
  };
  metadata: {
    elevation?: string;
    grade?: string;
  };
  description: string;
  media: {
    type: 'image' | 'video' | 'weblink';
    url: string;
    title?: string;
  }[];
}

interface MapboxGlobeProps {
  activities: Activity[];
  selectedActivityId: string | null;
  onActivitySelect: (activity: Activity) => void;
}

const MapboxGlobe: React.FC<MapboxGlobeProps> = ({ activities, selectedActivityId, onActivitySelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: 'globe',
      center: [0, 0],
      zoom: 1.5
    });

    newMap.on('load', () => {
      newMap.setFog({
        color: 'rgb(186, 210, 235)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02
      });
      map.current = newMap;
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Add markers when map is ready and activities change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    activities.forEach(activity => {
      const marker = new mapboxgl.Marker({
        color: activity.status === 'completed' ? '#4CAF50' : '#e74c3c',
        scale: 0.8
      })
        .setLngLat([activity.coordinates.longitude, activity.coordinates.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 10px;">
                <h3 style="margin: 0 0 5px 0;">${activity.name}</h3>
                <p style="margin: 0;">${activity.metadata.elevation} • ${activity.metadata.grade}</p>
              </div>
            `)
        )
        .addTo(map.current);

      marker.getElement().addEventListener('click', () => {
        onActivitySelect(activity);
      });

      markers.current.push(marker);
    });
  }, [activities, onActivitySelect]);

  // Handle selected activity changes
  useEffect(() => {
    if (!map.current || !selectedActivityId) return;

    const selectedActivity = activities.find(a => a.id === selectedActivityId);
    if (!selectedActivity) return;

    // Clear any existing animation timeout
    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
    }

    // Step 1: Zoom out to see the whole globe
    map.current.flyTo({
      center: [selectedActivity.coordinates.longitude, selectedActivity.coordinates.latitude],
      zoom: 1.5,
      duration: 1000,
      curve: 1,
      essential: true
    });

    // Step 2: After zooming out, fly to the location with a dramatic zoom in
    animationTimeout.current = setTimeout(() => {
      if (map.current) {
        map.current.flyTo({
          center: [selectedActivity.coordinates.longitude, selectedActivity.coordinates.latitude],
          zoom: 6,
          duration: 2000,
          curve: 1.5,
          essential: true
        });
      }
    }, 1000);

    // Open the popup for the selected marker
    const selectedMarker = markers.current.find(m => {
      const lngLat = m.getLngLat();
      return lngLat.lng === selectedActivity.coordinates.longitude &&
             lngLat.lat === selectedActivity.coordinates.latitude;
    });

    if (selectedMarker) {
      selectedMarker.togglePopup();
    }

    return () => {
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, [selectedActivityId, activities]);

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      right: 0,
      width: '66.67%',
      height: '100%'
    }}>
      <div 
        ref={mapContainer}
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute'
        }} 
      />
    </div>
  );
};

export default MapboxGlobe; 