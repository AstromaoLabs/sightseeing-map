# Use official Python image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Fix DNS issue
RUN echo 'nameserver 8.8.8.8' > /etc/resolv.conf

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m appuser

# Install Python dependencies as root
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy project and set permissions
COPY . /app
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose Django port
EXPOSE 8000

# Default command to run Django app
CMD ["gunicorn", "sightseeing_map.wsgi:application", "--bind", "0.0.0.0:8000"]
