# Bucket List Website with Interactive 3D Globe

A modern web application for tracking and visualizing your bucket list locations on an interactive 3D globe.

## Features

- Interactive 3D globe visualization using Three.js
- Location search and management
- Media upload (images and videos) for each location
- Progress tracking and completion status
- User authentication and personal bucket lists
- Responsive design for all devices

## Technology Stack

- Frontend: React with TypeScript
- 3D Visualization: Three.js with Globe.GL
- Backend: Node.js/Express
- Database: MongoDB
- Cloud Storage: AWS S3 or Firebase Storage
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- Git

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd bucket_list_site
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Create .env files in both frontend and backend directories
# Add necessary environment variables
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Project Structure

```
bucket_list_site/
├── frontend/           # React frontend application
├── backend/            # Node.js/Express backend
├── docs/              # Documentation
└── README.md          # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Three.js for 3D visualization
- React Globe.GL for globe implementation
- All contributors and maintainers 