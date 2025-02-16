# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Install system dependencies required by OpenCV (libGL.so.1)
# Install system dependencies required by OpenCV (libGL and GLib)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1 \
 && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt requirements.txt
COPY animal_classification_model.keras animal_classification_model.keras

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose port 6000 for the Flask app
EXPOSE 6000

# Run the app with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:6000", "app:app"]
