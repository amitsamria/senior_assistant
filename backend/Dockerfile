# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Note: static directory should be populated with frontend build before Docker build
# Run: cd ../frontend && npm run build && xcopy dist ..\backend\static /E /I /Y

# Expose port 8000
EXPOSE 8000

# Set environment variables
ENV PORT=8000
ENV DB_PATH=/tmp/senior_assistant.db

# Run the application
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT}
