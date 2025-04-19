import React, { useState } from 'react';

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
      grade: 'III'
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
      grade: '5.13'
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
      grade: 'Advanced'
    },
    description: 'A world-famous ski resort in the French Alps, offering challenging backcountry routes.',
    media: [
      {
        type: 'image',
        url: 'https://example.com/chamonix.jpg',
        title: 'Chamonix Valley'
      }
    ]
  }
];

interface ActivityListPanelProps {
  onActivitySelect: (activity: Activity) => void;
  selectedActivityId: string | null;
}

const ActivityListPanel: React.FC<ActivityListPanelProps> = ({ onActivitySelect, selectedActivityId }) => {
  const [expandedActivityId, setExpandedActivityId] = useState<string | null>(null);

  const handleActivityClick = (activity: Activity) => {
    if (expandedActivityId === activity.id) {
      setExpandedActivityId(null);
    } else {
      setExpandedActivityId(activity.id);
      onActivitySelect(activity);
    }
  };

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
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Top Section - Add Location and Filters */}
      <div style={{
        marginBottom: '20px'
      }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '15px',
          width: '100%'
        }}>
          Add New Location
        </button>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <select style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <option value="">All Activity Types</option>
            <option value="mountaineering">Mountaineering</option>
            <option value="rock-climbing">Rock Climbing</option>
            <option value="backcountry-skiing">Backcountry Skiing</option>
          </select>
          
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <button style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5'
            }}>
              All
            </button>
            <button style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5'
            }}>
              Completed
            </button>
            <button style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5'
            }}>
              Not Yet
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search locations..."
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
        {SAMPLE_ACTIVITIES.map(activity => (
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
              {activity.metadata.elevation} • {activity.metadata.grade}
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
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{SAMPLE_ACTIVITIES.length}</div>
          </div>
          <div>
            <div style={{ color: '#666' }}>Completed</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {SAMPLE_ACTIVITIES.filter(a => a.status === 'completed').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityListPanel; 