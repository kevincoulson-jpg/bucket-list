import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import D3Globe from './components/D3Globe'
import MapboxGlobe from './components/MapboxGlobe'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/globe" element={<D3Globe />} />
          <Route path="/mapbox-globe" element={<MapboxGlobe />} />
          <Route path="/locations" element={<LocationsList />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return <div>Welcome to Bucket List Globe!</div>
}

function LocationsList() {
  return <div>Locations List</div>
}

export default App 