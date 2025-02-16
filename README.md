# WildDex

A wildlife encounter tracking application that gamifies conservation data collection, created at Calgary Hacks 2025.

## Overview

WildDex transforms wildlife encounters into memorable experiences while contributing to conservation efforts. Inspired by Pokémon, users can "capture" wildlife sightings using their smartphone, creating their personal wildlife index while helping researchers track animal habits and patterns.

## Features

- Image-based wildlife identification using machine learning
- Geolocation tracking for wildlife encounters
- Community feed for sharing discoveries
- Achievement system with special badges
- Secure user authentication
- Interactive map integration

## Installation

### Prerequisites

- Docker Desktop
- Node.js
- npm

### Setup

1. Clone the repository

```bash
git clone https://github.com/suxxmjz/calgary-hacks-2025
```

2. Install dependencies in both client and server directories

```bash
cd client && npm install
cd ../server && npm install
```

3. Start the application

```bash
docker compose up --build
```

## Technology Stack

- **Frontend**: React
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Authentication**: Clerk
- **Storage**: Supabase
- **Machine Learning**: TensorFlow
- **Maps**: Google Maps API
- **Containerization**: Docker

## Technical Implementation

### Machine Learning Model

Our image classification system uses TensorFlow to identify wildlife species. The model has been fine-tuned to handle various wildlife categories, focusing on accuracy and real-world application.

### Data Storage

- PostgreSQL database for application data
- Supabase bucket for image storage and retrieval
- Secure user data management through Clerk

### Location Services

Integrated Google Maps API enables precise geo-tagging of wildlife encounters, contributing to valuable location-based data for conservation research.

## Challenges Overcome

- Developed sophisticated image classification models capable of identifying multiple species
- Successfully deployed machine learning models in a production environment
- Integrated complex systems including authentication, storage, and mapping services

## Future Development

- Research portal for authorized users to access wildlife sighting data
- Enhanced classification capabilities for more species
- Extended geographical coverage
- Advanced analytics for conservation researchers

## Team Achievements

- Created an intuitive and user-friendly interface
- Successfully integrated multiple complex technologies
- Developed a practical solution for wildlife conservation data collection
- Implemented secure and scalable architecture

---

_WildDex: Turning wildlife encounters into conservation data, one capture at a time._
