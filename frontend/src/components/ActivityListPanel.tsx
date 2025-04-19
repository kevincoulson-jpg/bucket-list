import React, { useState } from 'react';
import AddLocationForm from './AddLocationForm';
import MapboxGlobe from './MapboxGlobe';
import mapboxgl from 'mapbox-gl';

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
    depth?: string;
    grade?: string;
    difficulty?: string;
    season?: string;
    duration?: string;
    distance?: string;
    bestTime?: string;
    equipment?: string[];
  };
  description: string;
  media: {
    type: 'image' | 'video' | 'weblink';
    url: string;
    title?: string;
  }[];
}

export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    name: 'Mount Everest',
    activityType: 'Mountaineering',
    status: 'not yet',
    coordinates: {
      longitude: 86.9250,
      latitude: 27.9881
    },
    metadata: {
      elevation: '29,032ft',
      grade: 'III',
      difficulty: 'Extreme',
      season: 'Spring',
      duration: '2 months',
      distance: '12.5 miles',
      bestTime: 'April-May',
      equipment: ['Ice axe', 'Crampons', 'Oxygen tanks', 'High-altitude gear']
    },
    description: 'The highest peak in the world, located in the Mahalangur Himal sub-range of the Himalayas.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/everest.jpg',
        title: 'Mount Everest Summit'
      }
    ]
  },
  {
    id: '2',
    name: 'El Capitan',
    activityType: 'Rock Climbing',
    status: 'completed',
    coordinates: {
      longitude: -119.6364,
      latitude: 37.7338
    },
    metadata: {
      elevation: '7,573ft',
      grade: '5.13',
      difficulty: 'Advanced',
      season: 'Spring-Fall',
      duration: '3-5 days',
      distance: '3,000ft',
      bestTime: 'April-October',
      equipment: ['Climbing shoes', 'Harness', 'Ropes', 'Cams', 'Nuts']
    },
    description: 'A vertical rock formation in Yosemite National Park, known for its challenging climbing routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/elcap.jpg',
        title: 'El Capitan Face'
      }
    ]
  },
  {
    id: '3',
    name: 'Chamonix',
    activityType: 'Backcountry Skiing',
    status: 'not yet',
    coordinates: {
      longitude: 6.8694,
      latitude: 45.9237
    },
    metadata: {
      elevation: '12,605ft',
      grade: 'Advanced',
      difficulty: 'Expert',
      season: 'Winter',
      duration: '1 day',
      distance: 'Varies',
      bestTime: 'December-March',
      equipment: ['Skis', 'Avalanche gear', 'Beacon', 'Probe', 'Shovel']
    },
    description: 'A world-famous ski resort in the French Alps, offering challenging backcountry routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/chamonix.jpg',
        title: 'Chamonix Valley'
      }
    ]
  },
  {
    id: '4',
    name: 'Great Barrier Reef',
    activityType: 'Scuba Diving',
    status: 'not yet',
    coordinates: {
      longitude: 147.6992,
      latitude: -18.2871
    },
    metadata: {
      depth: '100ft',
      difficulty: 'Intermediate',
      season: 'Year-round',
      duration: '1-2 hours',
      bestTime: 'June-October',
      equipment: ['Scuba gear', 'Wetsuit', 'Camera', 'Dive computer']
    },
    description: 'The world\'s largest coral reef system, offering incredible marine biodiversity.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/reef.jpg',
        title: 'Coral Reef'
      }
    ]
  },
  {
    id: '5',
    name: 'Grand Canyon',
    activityType: 'Hiking',
    status: 'completed',
    coordinates: {
      longitude: -112.1129,
      latitude: 36.1069
    },
    metadata: {
      elevation: '7,000ft',
      difficulty: 'Moderate',
      season: 'Spring-Fall',
      duration: '2-3 days',
      distance: '24 miles',
      bestTime: 'March-May, September-November',
      equipment: ['Hiking boots', 'Tent', 'Water filter', 'Backpack']
    },
    description: 'A massive canyon carved by the Colorado River, offering stunning views and challenging hikes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/canyon.jpg',
        title: 'Grand Canyon View'
      }
    ]
  },
  {
    id: '6',
    name: 'Mount Kilimanjaro',
    activityType: 'Mountaineering',
    status: 'not yet',
    coordinates: {
      longitude: 37.3556,
      latitude: -3.0674
    },
    metadata: {
      elevation: '19,341ft',
      grade: 'II',
      difficulty: 'Advanced',
      season: 'Year-round',
      duration: '7-9 days',
      distance: '35 miles',
      bestTime: 'January-March, June-October',
      equipment: ['Hiking boots', 'Trekking poles', 'Warm clothing', 'Tent']
    },
    description: 'Africa\'s highest peak, offering a challenging but non-technical climb.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/kilimanjaro.jpg',
        title: 'Kilimanjaro Summit'
      }
    ]
  },
  {
    id: '7',
    name: 'Patagonia',
    activityType: 'Trekking',
    status: 'not yet',
    coordinates: {
      longitude: -73.2461,
      latitude: -51.6226
    },
    metadata: {
      elevation: 'Varies',
      difficulty: 'Advanced',
      season: 'Summer',
      duration: '4-8 days',
      distance: '50 miles',
      bestTime: 'November-March',
      equipment: ['Hiking boots', 'Tent', 'Water filter', 'Warm clothing']
    },
    description: 'A region of stunning natural beauty in South America, known for its challenging treks.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/patagonia.jpg',
        title: 'Patagonia Landscape'
      }
    ]
  },
  {
    id: '8',
    name: 'Mount Fuji',
    activityType: 'Hiking',
    status: 'completed',
    coordinates: {
      longitude: 138.7274,
      latitude: 35.3606
    },
    metadata: {
      elevation: '12,389ft',
      difficulty: 'Moderate',
      season: 'Summer',
      duration: '1-2 days',
      distance: '8 miles',
      bestTime: 'July-August',
      equipment: ['Hiking boots', 'Warm clothing', 'Headlamp', 'Water']
    },
    description: 'Japan\'s highest peak, offering a challenging but accessible climb.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/fuji.jpg',
        title: 'Mount Fuji'
      }
    ]
  },
  {
    id: '9',
    name: 'Great Wall of China',
    activityType: 'Hiking',
    status: 'not yet',
    coordinates: {
      longitude: 116.5704,
      latitude: 40.4319
    },
    metadata: {
      elevation: 'Varies',
      difficulty: 'Moderate',
      season: 'Spring-Fall',
      duration: 'Multiple days',
      distance: '13,171 miles',
      bestTime: 'April-May, September-October',
      equipment: ['Hiking shoes', 'Water', 'Camera']
    },
    description: 'An ancient wonder of the world, offering incredible hiking opportunities.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/greatwall.jpg',
        title: 'Great Wall'
      }
    ]
  },
  {
    id: '10',
    name: 'Machu Picchu',
    activityType: 'Hiking',
    status: 'completed',
    coordinates: {
      longitude: -72.5449,
      latitude: -13.1631
    },
    metadata: {
      elevation: '7,972ft',
      difficulty: 'Moderate',
      season: 'Year-round',
      duration: '4 days',
      distance: '26 miles',
      bestTime: 'April-October',
      equipment: ['Hiking boots', 'Tent', 'Water filter', 'Camera']
    },
    description: 'An ancient Incan city in the Andes, accessible via the famous Inca Trail.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/machu.jpg',
        title: 'Machu Picchu'
      }
    ]
  },
  {
    id: '11',
    name: 'Mount Rainier',
    activityType: 'Mountaineering',
    status: 'not yet',
    coordinates: {
      longitude: -121.7584,
      latitude: 46.8523
    },
    metadata: {
      elevation: '14,411ft',
      grade: 'II',
      difficulty: 'Advanced',
      season: 'Summer',
      duration: '2-3 days',
      distance: '9 miles',
      bestTime: 'June-September',
      equipment: ['Ice axe', 'Crampons', 'Rope', 'Helmet']
    },
    description: 'An iconic volcano in Washington state, offering challenging mountaineering routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/rainier.jpg',
        title: 'Mount Rainier'
      }
    ]
  },
  {
    id: '12',
    name: 'Yosemite Falls',
    activityType: 'Rock Climbing',
    status: 'not yet',
    coordinates: {
      longitude: -119.5336,
      latitude: 37.7561
    },
    metadata: {
      elevation: '2,425ft',
      grade: '5.12',
      difficulty: 'Expert',
      season: 'Spring-Fall',
      duration: '1-2 days',
      distance: '1,430ft',
      bestTime: 'April-October',
      equipment: ['Climbing shoes', 'Harness', 'Ropes', 'Cams']
    },
    description: 'One of the tallest waterfalls in North America, with challenging climbing routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/yosemite.jpg',
        title: 'Yosemite Falls'
      }
    ]
  },
  {
    id: '13',
    name: 'Mount Blanc',
    activityType: 'Mountaineering',
    status: 'not yet',
    coordinates: {
      longitude: 6.8651,
      latitude: 45.8326
    },
    metadata: {
      elevation: '15,774ft',
      grade: 'II',
      difficulty: 'Advanced',
      season: 'Summer',
      duration: '2-3 days',
      distance: '12 miles',
      bestTime: 'June-September',
      equipment: ['Ice axe', 'Crampons', 'Rope', 'Helmet']
    },
    description: 'The highest peak in the Alps, offering classic mountaineering routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/blanc.jpg',
        title: 'Mount Blanc'
      }
    ]
  },
  {
    id: '14',
    name: 'Half Dome',
    activityType: 'Hiking',
    status: 'completed',
    coordinates: {
      longitude: -119.5336,
      latitude: 37.7456
    },
    metadata: {
      elevation: '8,839ft',
      difficulty: 'Advanced',
      season: 'Spring-Fall',
      duration: '1 day',
      distance: '16 miles',
      bestTime: 'May-October',
      equipment: ['Hiking boots', 'Gloves', 'Headlamp', 'Water']
    },
    description: 'An iconic granite dome in Yosemite National Park, known for its challenging cables route.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/halfdome.jpg',
        title: 'Half Dome'
      }
    ]
  },
  {
    id: '15',
    name: 'Mount Denali',
    activityType: 'Mountaineering',
    status: 'not yet',
    coordinates: {
      longitude: -151.0070,
      latitude: 63.0692
    },
    metadata: {
      elevation: '20,310ft',
      grade: 'III',
      difficulty: 'Extreme',
      season: 'Summer',
      duration: '2-3 weeks',
      distance: 'Varies',
      bestTime: 'May-July',
      equipment: ['Ice axe', 'Crampons', 'Oxygen', 'High-altitude gear']
    },
    description: 'The highest peak in North America, offering extreme mountaineering challenges.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/denali.jpg',
        title: 'Mount Denali'
      }
    ]
  },
  {
    id: '16',
    name: 'Mount Whitney',
    activityType: 'Hiking',
    status: 'completed',
    coordinates: {
      longitude: -118.2923,
      latitude: 36.5785
    },
    metadata: {
      elevation: '14,505ft',
      difficulty: 'Advanced',
      season: 'Summer',
      duration: '1-2 days',
      distance: '22 miles',
      bestTime: 'June-September',
      equipment: ['Hiking boots', 'Tent', 'Water filter', 'Warm clothing']
    },
    description: 'The highest peak in the contiguous United States, offering challenging hiking routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/whitney.jpg',
        title: 'Mount Whitney'
      }
    ]
  },
  {
    id: '17',
    name: 'Mount Cook',
    activityType: 'Mountaineering',
    status: 'not yet',
    coordinates: {
      longitude: 170.1419,
      latitude: -43.5944
    },
    metadata: {
      elevation: '12,218ft',
      grade: 'II',
      difficulty: 'Advanced',
      season: 'Summer',
      duration: '2-3 days',
      distance: 'Varies',
      bestTime: 'December-February',
      equipment: ['Ice axe', 'Crampons', 'Rope', 'Helmet']
    },
    description: 'The highest peak in New Zealand, offering challenging mountaineering routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/cook.jpg',
        title: 'Mount Cook'
      }
    ]
  },
  {
    id: '18',
    name: 'Mount Aconcagua',
    activityType: 'Mountaineering',
    status: 'not yet',
    coordinates: {
      longitude: -70.0109,
      latitude: -32.6532
    },
    metadata: {
      elevation: '22,837ft',
      grade: 'II',
      difficulty: 'Advanced',
      season: 'Summer',
      duration: '2-3 weeks',
      distance: 'Varies',
      bestTime: 'December-February',
      equipment: ['Ice axe', 'Crampons', 'Oxygen', 'High-altitude gear']
    },
    description: 'The highest peak in South America, offering challenging mountaineering routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/aconcagua.jpg',
        title: 'Mount Aconcagua'
      }
    ]
  },
  {
    id: '19',
    name: 'Mount Vinson',
    activityType: 'Mountaineering',
    status: 'not yet',
    coordinates: {
      longitude: -85.6172,
      latitude: -78.5254
    },
    metadata: {
      elevation: '16,050ft',
      grade: 'II',
      difficulty: 'Advanced',
      season: 'Summer',
      duration: '2-3 weeks',
      distance: 'Varies',
      bestTime: 'December-January',
      equipment: ['Ice axe', 'Crampons', 'Cold weather gear', 'Tent']
    },
    description: 'The highest peak in Antarctica, offering extreme mountaineering challenges.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/vinson.jpg',
        title: 'Mount Vinson'
      }
    ]
  },
  {
    id: '20',
    name: 'Mount Kosciuszko',
    activityType: 'Hiking',
    status: 'completed',
    coordinates: {
      longitude: 148.2633,
      latitude: -36.4564
    },
    metadata: {
      elevation: '7,310ft',
      difficulty: 'Moderate',
      season: 'Summer',
      duration: '1 day',
      distance: '8.5 miles',
      bestTime: 'December-March',
      equipment: ['Hiking boots', 'Water', 'Sunscreen', 'Camera']
    },
    description: 'The highest peak in Australia, offering accessible hiking routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/kosciuszko.jpg',
        title: 'Mount Kosciuszko'
      }
    ]
  }
];

interface ActivityListPanelProps {
  onActivitySelect: (activity: Activity) => void;
  selectedActivityId: string | null;
  previewLocation?: [number, number];
}

const ActivityListPanel: React.FC<ActivityListPanelProps> = ({ 
  onActivitySelect, 
  selectedActivityId,
  previewLocation 
}) => {
  const [expandedActivityId, setExpandedActivityId] = useState<string | null>(null);
  const [selectedActivityType, setSelectedActivityType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'not yet'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activities, setActivities] = useState(SAMPLE_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [previewCoordinates, setPreviewCoordinates] = useState<[number, number] | undefined>(undefined);
  // Search query for filtering the activity list by name
  const [listSearchQuery, setListSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      console.log('Searching for:', query);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      );
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Search results:', data.features);
      setSearchResults(data.features);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
    }
  };

  const handleLocationSelect = (location: any) => {
    setPreviewCoordinates(location.center);
    setSearchQuery(location.place_name || location.text);
    setSearchResults([]);
  };

  const handleAddLocation = (newLocation: any) => {
    const newActivity: Activity = {
      ...newLocation,
      id: Date.now().toString(),
      status: 'not yet',
      media: []
    };
    setActivities(prev => [...prev, newActivity]);
    setShowAddForm(false);
    setPreviewCoordinates(undefined);
  };

  const handleActivityClick = (activity: Activity) => {
    if (expandedActivityId === activity.id) {
      setExpandedActivityId(null);
    } else {
      setExpandedActivityId(activity.id);
      onActivitySelect(activity);
    }
  };

  const handleActivityTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivityType(e.target.value);
  };

  const handleStatusChange = (status: 'all' | 'completed' | 'not yet') => {
    setSelectedStatus(status);
  };

  const filteredActivities = activities.filter(activity => {
    const matchesType = !selectedActivityType || activity.activityType.toLowerCase() === selectedActivityType.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
    const matchesSearch = !listSearchQuery.trim() || activity.name.toLowerCase().includes(listSearchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '33.33%',
      height: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1000
    }}>
      {/* Top Section - Add Location and Filters */}
      <div style={{
        marginBottom: '20px'
      }}>
        <button 
          onClick={() => setShowAddForm(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '15px',
            width: '100%'
          }}
        >
          Add New Location
        </button>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <select 
            value={selectedActivityType}
            onChange={handleActivityTypeChange}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value="">All Activity Types</option>
            <option value="mountaineering">Mountaineering</option>
            <option value="rock climbing">Rock Climbing</option>
            <option value="backcountry skiing">Backcountry Skiing</option>
            <option value="hiking">Hiking</option>
            <option value="scuba diving">Scuba Diving</option>
            <option value="trekking">Trekking</option>
          </select>
          
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <button 
              onClick={() => handleStatusChange('all')}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: selectedStatus === 'all' ? '#e0e0e0' : '#f5f5f5',
                cursor: 'pointer'
              }}
            >
              All
            </button>
            <button 
              onClick={() => handleStatusChange('completed')}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: selectedStatus === 'completed' ? '#e0e0e0' : '#f5f5f5',
                cursor: 'pointer'
              }}
            >
              Completed
            </button>
            <button 
              onClick={() => handleStatusChange('not yet')}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: selectedStatus === 'not yet' ? '#e0e0e0' : '#f5f5f5',
                cursor: 'pointer'
              }}
            >
              Not Yet
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search locations..."
            value={listSearchQuery}
            onChange={(e) => setListSearchQuery(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
      </div>

      {/* Middle Section - Activity List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '20px'
      }}>
        {filteredActivities.map(activity => (
          <div
            key={activity.id}
            style={{
              padding: '15px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              backgroundColor: selectedActivityId === activity.id ? '#f0f8ff' : 'transparent',
              transition: 'background-color 0.2s'
            }}
            onClick={() => handleActivityClick(activity)}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '5px'
            }}>
              <h3 style={{ margin: 0 }}>{activity.name}</h3>
              <span style={{
                color: activity.status === 'completed' ? '#4CAF50' : '#666',
                fontSize: '20px'
              }}>
                {activity.status === 'completed' ? '✓' : '○'}
              </span>
            </div>
            <p style={{
              margin: 0,
              color: '#666'
            }}>
              {activity.activityType}
            </p>
            
            {/* Expanded Content */}
            {expandedActivityId === activity.id && (
              <div style={{
                marginTop: '15px',
                padding: '10px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px'
              }}>
                <p style={{ margin: '0 0 10px 0' }}>{activity.description}</p>
                
                {/* Metadata Table */}
                <div style={{
                  marginBottom: '15px',
                  overflowX: 'auto'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                  }}>
                    <tbody>
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <tr key={key} style={{
                          borderBottom: '1px solid #eee'
                        }}>
                          <td style={{
                            padding: '8px',
                            fontWeight: 'bold',
                            color: '#666',
                            textTransform: 'capitalize'
                          }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </td>
                          <td style={{
                            padding: '8px',
                            color: '#333'
                          }}>
                            {Array.isArray(value) ? value.join(', ') : value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Media Section */}
                {activity.media.map((media, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    {media.type === 'image' && (
                      <img
                        src={media.url}
                        alt={media.title || 'Activity media'}
                        style={{
                          width: '100%',
                          borderRadius: '4px'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section - Statistics */}
      <div style={{
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Statistics</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px'
        }}>
          <div>
            <div style={{ color: '#666' }}>Total Locations</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{filteredActivities.length}</div>
          </div>
          <div>
            <div style={{ color: '#666' }}>Completed</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {filteredActivities.filter(a => a.status === 'completed').length}
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <AddLocationForm
          onClose={() => {
            setShowAddForm(false);
            setPreviewCoordinates(undefined);
          }}
          onAddLocation={handleAddLocation}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          searchResults={searchResults}
          onLocationSelect={handleLocationSelect}
        />
      )}

      <MapboxGlobe
        activities={activities}
        selectedActivityId={selectedActivityId}
        onActivitySelect={onActivitySelect}
        previewLocation={previewCoordinates}
      />
    </div>
  );
};

export default ActivityListPanel; 