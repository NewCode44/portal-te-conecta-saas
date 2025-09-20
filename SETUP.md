# Setup Instructions - Tu Portal Te Conecta

## Prerequisites Installation

### 1. Install Docker Desktop (Required for full setup)
- Download Docker Desktop for Windows: https://www.docker.com/products/docker-desktop
- Install and restart your computer
- Verify installation: `docker --version` and `docker compose version`

### 2. Alternative: Local Development Setup (Without Docker)

If you prefer to run without Docker initially, you can set up the services locally:

#### Install PostgreSQL
- Download PostgreSQL 15: https://www.postgresql.org/download/windows/
- Default settings: port 5432, user: postgres, password: postgres
- Create database: `tu_portal_db`

#### Install Redis
- Download Redis for Windows: https://github.com/microsoftarchive/redis/releases
- Or use WSL2 with: `sudo apt install redis-server`

## Current Status

✅ **Completed:**
- NX workspace with NestJS + Next.js
- All microservices created
- Shared libraries setup
- Docker configuration
- Basic TypeScript types

## Quick Start (Without Docker)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start individual services:**
   ```bash
   # Start API Gateway
   npx nx serve api-gateway

   # Start Admin Dashboard (in new terminal)
   npx nx serve admin-dashboard

   # Start Template Service (in new terminal)
   npx nx serve template-service
   ```

3. **Access the applications:**
   - Admin Dashboard: http://localhost:4200
   - API Gateway: http://localhost:3000
   - Template Service: http://localhost:3001

## Full Docker Setup (Recommended)

1. **Install Docker Desktop**
2. **Start services:**
   ```bash
   npm run docker:up
   ```
3. **View logs:**
   ```bash
   npm run docker:logs
   ```

## Development Commands

```bash
# Start main services (API + Dashboard)
npm start

# Start all services
npm run start:all

# Start only backend services
npm run start:backend

# Start only frontend applications
npm run start:frontend

# Build all projects
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## Project Architecture

```
Frontend Apps:
├── admin-dashboard (4200)     # Admin interface
└── portal-editor (4201)       # Template editor

Backend Services:
├── api-gateway (3000)         # Main API
├── template-service (3001)    # Templates
├── router-service (3002)      # Mikrotik routers
├── wipo-service (3010)        # WIPO business logic
├── publifi-service (3011)     # Publifi business logic
├── leer-te-conecta-service (3012) # Reading service
├── wihot-service (3013)       # Hotspot service
├── portexa-service (3014)     # Extended portal features
└── entrenatech-service (3015) # Training service

Shared Libraries:
├── shared-types              # TypeScript interfaces
├── shared-utils             # Common utilities
├── shared-database          # Database configurations
└── shared-auth              # Authentication
```

## Next Development Phases

1. **Templates System** - Portal template management
2. **Router Integration** - Mikrotik RouterBoard configuration
3. **Dashboard Development** - Admin interfaces
4. **Portal Editor** - Visual template editor
5. **CI/CD Pipeline** - GitHub Actions deployment

## Troubleshooting

### Docker Issues
- Ensure Docker Desktop is running
- Use `docker compose` instead of `docker-compose`
- Check port availability (3000-3015, 4200-4201)

### Node Dependencies
- The peer dependency warnings are normal and won't affect functionality
- Use Node.js 18+ for best compatibility

### Port Conflicts
- Check if ports are available: `netstat -an | findstr :3000`
- Modify port numbers in project.json files if needed

## Support
For development questions, check the main README.md or project documentation.