import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import MapboxGlobe from './components/MapboxGlobe'
import ActivityListPanel from './components/ActivityListPanel'

// Import the sample activities
import { SAMPLE_ACTIVITIES } from './components/ActivityListPanel'

function App() {
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  const handleActivitySelect = (activity: any) => {
    setSelectedActivityId(activity.id);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapbox-globe" element={
            <>
              <ActivityListPanel
                onActivitySelect={handleActivitySelect}
                selectedActivityId={selectedActivityId}
              />
              <MapboxGlobe
                activities={SAMPLE_ACTIVITIES}
                selectedActivityId={selectedActivityId}
                onActivitySelect={handleActivitySelect}
              />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return <div>Welcome to Bucket List Globe!</div>
}

export default App 