import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// You'll need to replace this with your own Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2V2aW5jMjYiLCJhIjoiY205bmIwYjYwMG81dDJscTdyM3huN29pYSJ9.Tc5ScSg4xTPWJptsrdCLsA';

const MapboxGlobe: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: 'globe',
      center: [-122.4783, 37.8199], // Golden Gate Bridge coordinates
      zoom: 1.5
    });

    map.current.on('style.load', () => {
      if (map.current) {
        map.current.setFog({
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02
        });

        // Add marker for Golden Gate Bridge
        const marker = new mapboxgl.Marker({
          color: '#e74c3c',
          scale: 0.8
        })
          .setLngLat([-122.4783, 37.8199])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="padding: 10px;">
                  <h3 style="margin: 0 0 5px 0;">Golden Gate Bridge</h3>
                  <p style="margin: 0;">San Francisco, California</p>
                </div>
              `)
          )
          .addTo(map.current);

        // Open popup by default
        marker.togglePopup();
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
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