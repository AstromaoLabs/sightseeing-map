# Use official Python image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install Python dependencies
# Install Python dependencies
COPY ./requirements.txt /app/requirements.txt
RUN echo 'nameserver 8.8.8.8' > /etc/resolv.conf \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt


# Copy project
COPY . /app

# Create a non-root user
RUN useradd -m appuser

# Set ownership and permissions
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose Django port
EXPOSE 8000

# Default command to run Django app
CMD ["gunicorn", "sightseeing_map.wsgi:application", "--bind", "0.0.0.0:8000"]
