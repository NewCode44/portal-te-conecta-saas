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
RUN npx nx build portal-editor

# Expose the port
EXPOSE 4201

# Start the Next.js application
CMD ["npx", "nx", "serve", "portal-editor", "--prod"]