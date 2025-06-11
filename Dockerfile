FROM node:20

# Set working directory
WORKDIR /app

# Copy backend files
COPY Backend ./Backend

# Copy frontend files
COPY Frontend ./Frontend

# Install backend dependencies
WORKDIR /app/Backend
RUN npm install

# Install frontend dependencies and build
WORKDIR /app/Frontend
RUN npm install
RUN npm run build

# Serve frontend and start backend
WORKDIR /app/Backend
EXPOSE 3001
CMD ["node", "server.js"]