FROM node:18-alpine

WORKDIR /usr/src/app

# Copy workspace configuration
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Copy all source files (needed for Nx workspace)
COPY . .

# Install dependencies
RUN npm ci

# Build the specific service
RUN npx nx build router-service

# Expose the port
EXPOSE 3002

# Start the service
CMD ["npx", "nx", "serve", "router-service", "--prod"]