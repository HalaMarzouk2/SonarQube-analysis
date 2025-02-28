# Stage 1: Build dependencies
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package.json (No need for package-lock.json)
COPY package.json ./

# Install dependencies inside the container
RUN npm install --only=production

# Copy application files
COPY . .

# Stage 2: Create a minimal production image
FROM node:18-alpine

# Set a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set working directory
WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app /app

# Expose application port
EXPOSE 3000

# Run application
CMD ["node", "server.js"]

