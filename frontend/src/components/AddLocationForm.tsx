import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

interface AddLocationFormProps {
  onClose: () => void;
  onAddLocation: (location: any) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  searchResults: any[];
  onLocationSelect: (location: any) => void;
}

const AddLocationForm: React.FC<AddLocationFormProps> = ({ 
  onClose, 
  onAddLocation,
  searchQuery,
  onSearch,
  searchResults,
  onLocationSelect
}) => {
  console.log('AddLocationForm received search results:', searchResults);
  
  const [formData, setFormData] = useState({
    name: '',
    activityType: '',
    coordinates: [0, 0],
    description: '',
    difficulty: '',
    season: '',
    duration: '',
    equipment: [] as string[]
  });
  const [newEquipment, setNewEquipment] = useState('');

  const handleLocationSelect = (location: any) => {
    setFormData(prev => ({
      ...prev,
      name: location.text,
      coordinates: location.center
    }));
    onLocationSelect(location);
  };

  const handleAddEquipment = () => {
    if (newEquipment.trim()) {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment.trim()]
      }));
      setNewEquipment('');
    }
  };

  const handleRemoveEquipment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLocation(formData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 2001
      }}>
        <h2 style={{ marginTop: 0 }}>Add New Location</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Location Search */}
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Search Location</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                console.log('Input changed:', value);
                onSearch(value);
              }}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
              placeholder="Search for a location..."
            />
            {searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 2002,
                marginTop: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleLocationSelect(result)}
                    style={{
                      padding: '8px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee',
                      backgroundColor: 'white',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    {result.place_name || result.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Type */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Activity Type</label>
            <select
              value={formData.activityType}
              onChange={(e) => setFormData(prev => ({ ...prev, activityType: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="">Select Activity Type</option>
              <option value="hiking">Hiking</option>
              <option value="climbing">Climbing</option>
              <option value="skiing">Skiing</option>
              <option value="surfing">Surfing</option>
              <option value="diving">Diving</option>
            </select>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                minHeight: '100px'
              }}
            />
          </div>

          {/* Difficulty */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          {/* Season */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Best Season</label>
            <select
              value={formData.season}
              onChange={(e) => setFormData(prev => ({ ...prev, season: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="">Select Season</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
            </select>
          </div>

          {/* Duration */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="e.g., 2-3 hours, 1 day"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          {/* Equipment */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Required Equipment</label>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <input
                type="text"
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                placeholder="Add equipment"
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginRight: '10px'
                }}
              />
              <button
                type="button"
                onClick={handleAddEquipment}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
            <div>
              {formData.equipment.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#f0f0f0',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    margin: '5px',
                    position: 'relative'
                  }}
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveEquipment(index)}
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationForm; 