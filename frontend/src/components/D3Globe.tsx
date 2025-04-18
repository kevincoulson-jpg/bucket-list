import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const D3Globe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const sensitivity = 150;

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    // Create projection
    const projection = d3.geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([0, 0])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Create globe container
    const globe = svg.append('g');

    // Add graticule
    const graticule = d3.geoGraticule();
    globe.append('path')
      .datum(graticule)
      .attr('class', 'graticule')
      .attr('d', path)
      .style('fill', 'none')
      .style('stroke', '#777')
      .style('stroke-width', 0.5)
      .style('stroke-opacity', 0.3);

    // Add ocean background
    globe.append('path')
      .datum({ type: 'Sphere' } as d3.GeoSphere)
      .attr('class', 'ocean')
      .attr('d', path)
      .style('fill', '#1a5276')
      .style('stroke', 'none');

    // Load and draw world map
    d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
      .then((data: any) => {
        const countries = topojson.feature(data, data.objects.countries);
        
        // Draw countries
        globe.append('path')
          .datum(countries)
          .attr('class', 'countries')
          .attr('d', path)
          .style('fill', '#d2b48c')
          .style('stroke', '#808080')
          .style('stroke-width', 0.5);

        // Add Golden Gate Bridge marker
        const marker = globe.append('g')
          .attr('class', 'marker')
          .attr('transform', `translate(${projection([-122.4783, 37.8199])})`);

        // Add circle
        marker.append('circle')
          .attr('r', 5)
          .style('fill', '#e74c3c')
          .style('stroke', 'white')
          .style('stroke-width', 1);

        // Add text bubble
        const bubble = marker.append('g')
          .attr('class', 'bubble')
          .attr('transform', 'translate(0, -20)');

        bubble.append('rect')
          .attr('x', -50)
          .attr('y', -20)
          .attr('width', 100)
          .attr('height', 40)
          .style('fill', 'white')
          .style('stroke', '#34495e')
          .style('stroke-width', 1)
          .style('rx', 5)
          .style('ry', 5);

        bubble.append('text')
          .text('Golden Gate Bridge')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.3em')
          .style('fill', '#2c3e50')
          .style('font-size', '12px')
          .style('font-weight', 'bold');

        // Add rotation interaction
        let rotation: [number, number, number] = [0, 0, 0];
        let isDragging = false;

        svg.on('mousedown', () => {
          isDragging = true;
        });

        svg.on('mousemove', (event) => {
          if (isDragging) {
            const dx = event.movementX || 0;
            const dy = event.movementY || 0;
            rotation[0] += dx * sensitivity / width;
            rotation[1] -= dy * sensitivity / height;
            projection.rotate(rotation);
            globe.selectAll('path').attr('d', path);
            marker.attr('transform', `translate(${projection([-122.4783, 37.8199])})`);
          }
        });

        svg.on('mouseup', () => {
          isDragging = false;
        });

        // Add zoom interaction
        svg.on('wheel', (event) => {
          event.preventDefault();
          const scale = projection.scale();
          const newScale = scale * (event.deltaY > 0 ? 0.9 : 1.1);
          projection.scale(newScale);
          globe.selectAll('path').attr('d', path);
          marker.attr('transform', `translate(${projection([-122.4783, 37.8199])})`);
        });
      });

    return () => {
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default D3Globe; 