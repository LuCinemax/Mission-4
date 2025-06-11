FROM node:20

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend ./backend

# Copy frontend files
COPY frontend ./frontend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Serve frontend and start backend
WORKDIR /app/backend
EXPOSE 3001
CMD ["node", "server.js"]