# Bucket List Globe - Data Model

## Core Location Model
```typescript
interface Location {
  _id: string;                    // MongoDB ID
  userId: string;                 // Reference to user who created it
  name: string;                   // Location name
  description: string;            // Free-form description
  coordinates: {
    longitude: number;
    latitude: number;
  };
  status: 'completed' | 'not yet';
  dates: {
    added: Date;
    completed?: Date;             // Only present if status is 'completed'
  };
  media: MediaItem[];
  customFields: CustomField[];
  activityType: string;           // Can be predefined or user-defined
  activityTemplate?: string;      // Reference to activity template if used
}

interface MediaItem {
  type: 'image' | 'video' | 'weblink';
  url: string;
  embedId?: string;              // For YouTube videos
  title?: string;                // Optional title for the media
}

interface CustomField {
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  value: any;
  unit?: string;                 // For numeric fields (e.g., 'ft', 'm')
}
```

## Predefined Activity Templates

### Mountaineering Template
```typescript
{
  name: "Mountaineering",
  fields: [
    { name: "Route Name", type: "text" },
    { name: "Summit Elevation", type: "number", unit: "ft" },
    { name: "Base Elevation", type: "number", unit: "ft" },
    { name: "Difficulty", type: "select", options: ["PD", "AD", "D", "TD", "ED"] },
    { name: "Grade", type: "text" },
    { name: "Pitch Count", type: "number" }
  ]
}
```

### Rock Climbing Template
```typescript
{
  name: "Rock Climbing",
  fields: [
    { name: "Route Name", type: "text" },
    { name: "Grade", type: "text" },
    { name: "Pitch Count", type: "number" },
    { name: "Protection", type: "select", options: ["Sport", "Trad", "Mixed"] },
    { name: "Style", type: "select", options: ["Onsight", "Flash", "Redpoint", "Pinkpoint"] }
  ]
}
```

### Backcountry Skiing Template
```typescript
{
  name: "Backcountry Skiing",
  fields: [
    { name: "Route Name", type: "text" },
    { name: "Max Gradient", type: "number", unit: "degrees" },
    { name: "Aspect", type: "select", options: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] },
    { name: "Vertical Gain", type: "number", unit: "ft" },
    { name: "Distance", type: "number", unit: "miles" }
  ]
}
```

## Notes
- Users can create their own activity types and templates
- Templates can be modified by users
- No validation on field values
- Media items support:
  - Images (direct upload)
  - YouTube videos (with embedding)
  - Other weblinks (as hyperlinks)
- All numeric fields support unit selection
- Custom fields can be added to any location regardless of activity type 