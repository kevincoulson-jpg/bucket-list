import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to Your Bucket List</h1>
      <p>Track your travel dreams and adventures around the world</p>
      <div className="navigation-links">
        <Link to="/globe" className="nav-link">D3 Globe</Link>
        <Link to="/mapbox-globe" className="nav-link">Mapbox Globe</Link>
        <Link to="/locations" className="nav-link">View Your Locations</Link>
      </div>
    </div>
  );
};

export default Home; 