# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .env ./

# Install dependencies
RUN npm ci

# Copy entire project
COPY . .

# Expose port (for documentation only)
EXPOSE 8080

# Set environment variable for GCP (Cloud Run uses PORT)
ENV PORT=8080

# Start the app
CMD ["npm", "start"]
