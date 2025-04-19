# Bucket List Globe - Wireframe Descriptions

## Page 1: Sign In Page

### Header
- Left: Site logo and name "Bucket List Globe"
- Right: "Sign In" and "Sign Up" buttons
- Clean, minimal design with subtle background

### Main Content
- Large hero section with app screenshot showing the globe and activity list
- Feature highlights section with 3-4 key features:
  - Interactive 3D globe visualization
  - Adventure-specific metadata tracking
  - Media integration (photos, videos, links)
  - Progress tracking and statistics
- Each feature includes:
  - Icon or small screenshot
  - Brief description
  - Visual emphasis on adventure sports focus

## Page 2: Main Application

### Layout
- Split into two main sections:
  - Left (1/3): Activity list and controls
  - Right (2/3): Interactive globe

### Left Panel Components
1. Top Section:
   - "Add New Location" button
   - Filter controls:
     - Activity type dropdown (Mountaineering, Rock Climbing, etc.)
     - Status toggle (All/Completed/Not Yet)
     - Search box for filtering list

2. Activity List:
   - Scrollable list of locations
   - Each item shows:
     - Location name
     - Activity type icon
     - Completion status (checkmark)
     - Brief metadata preview (e.g., "14,411ft • Grade III")
   - Items are expandable/collapsible
   - Visual hierarchy with subtle shadows and spacing

3. Bottom Section:
   - Statistics panel showing:
     - Total locations
     - Completed count
     - Activity type distribution
     - Visual progress indicators

### Right Panel (Globe)
- Interactive 3D globe using Mapbox
- Custom markers for locations:
  - Different colors/styles for completed vs. pending
  - Subtle animation on hover
- Smooth transitions when:
  - Rotating/zooming
  - Centering on selected location
  - Expanding/collapsing details

### Location Details View
When a location is selected (via marker or list):
1. Globe transitions to right 1/3 of viewport
2. Selected list item expands to show:
   - Location name and activity type
   - Metadata grid:
     - Clean, aligned columns
     - Activity-specific fields
     - Custom fields
     - Units clearly displayed
   - Description section
   - Media slideshow:
     - Images and videos in carousel
     - Thumbnail navigation
     - Full-screen option
     - External links as cards
3. Close button returns to full view

### Add Location Flow
1. User clicks "Add New Location"
2. New item appears in list with:
   - Location search field
   - Real-time suggestions as user types
3. After selecting location:
   - Item expands to show form
   - Same layout as details view
   - Fields pre-populated where possible
   - Activity type selection
   - Metadata fields based on activity
   - Media upload section
4. Save button adds to list
5. Globe updates with new marker

### Visual Design Principles
- Clean, modern aesthetic
- Consistent spacing and alignment
- Subtle animations for state changes
- Clear visual hierarchy
- Adventure-focused color scheme
- High contrast for readability
- Professional typography
- Responsive to user interactions 