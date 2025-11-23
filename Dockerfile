# Build Frontend
FROM node:18-alpine as build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build Backend
FROM python:3.10-slim
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy Frontend Build to Backend Static
# Vite builds to 'dist' by default. We copy it to 'static' for FastAPI.
COPY --from=build /app/frontend/dist /app/static

# Expose port
EXPOSE 8080

# Run
# Cloud Run expects the app to listen on the PORT environment variable (default 8080)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
