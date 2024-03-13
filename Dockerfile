# Use a lightweight Node.js image
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your source code
COPY . .

# Build your TypeScript code (adjust based on your build process)
RUN npm run build

# Create a new image for serving the application
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy the built files from the builder stage 
COPY --from=builder /app/dist/ ./dist
COPY --from=builder /app/node_modules ./node_modules

# RUN npm install

# Expose the port your application listens on (replace 3000 with your actual port)
EXPOSE 3000

# Start the application (replace "start" with your actual start command)
CMD [ "node", "dist/server.js" ]
