# AI Twin Smart City Platform

An AI-powered Smart City monitoring platform designed to provide a unified view of urban infrastructure and city operations.

The platform integrates multiple smart-city domains such as traffic, weather, air quality, water, energy, crime and public safety into a centralized dashboard.

---

## Project Overview

The AI Twin Smart City Platform acts as a digital monitoring layer for a smart city.

It collects and analyzes city infrastructure data and presents important information through an interactive dashboard.

The platform is designed to help city administrators monitor:

- Traffic and transportation
- Weather conditions
- Air quality and AQI
- Water supply and leakage
- Energy consumption and grid status
- Crime and public safety
- AI-based predictions

---

## Features

### Smart City Dashboard

The main dashboard provides a centralized overview of city conditions through KPI cards.

It currently displays important metrics such as:

- Total vehicles
- Weather conditions
- Air Quality Index (AQI)
- Water status
- Energy status
- Crime incidents

---

### Traffic Management

The traffic module provides transportation monitoring using city traffic data.

Features include:

- Total vehicle count
- Average vehicle speed
- Traffic density
- Road information
- Traffic-related statistics
- Accident-related information

---

### Weather Monitoring

The weather module provides weather-related information from the smart-city dataset.

The system can monitor parameters such as:

- Temperature
- Humidity
- Visibility
- Weather conditions
- Wind speed
- Rainfall

---

### Air Quality Monitoring

The Air Quality module monitors pollution-related parameters.

It includes:

- AQI
- AQI category
- PM2.5
- PM10
- CO
- NO2
- SO2
- O3
- Air quality status

---

### Water Management

The Water Management module monitors the city's water infrastructure.

Features include:

- Average water level
- Water consumption
- Pipeline pressure
- Water leakage records
- Water supply status
- Reservoir level
- Pipeline status
- Water quality

The system also identifies records where water leakage has been detected.

---

### Energy Management

The Energy Management module monitors energy consumption and grid-related information.

Features include:

- Average energy consumption
- Renewable energy usage
- Peak load
- Power outages
- Average voltage
- Power factor
- Energy source distribution
- Grid status

Energy sources in the dataset include:

- Grid
- Solar
- Wind
- Hybrid

---

### Crime and Public Safety

The Crime module provides public safety monitoring.

It includes:

- Total crime incidents
- Average police response time
- Crime hotspots
- Emergency alerts
- Crime type statistics
- Crime severity statistics
- Zone-based statistics

The backend provides dedicated APIs for crime summaries, crime types, severity, hotspots and zones.

---

### AI Prediction

The platform includes an AI Prediction module for future smart-city analytics.

This module is intended to provide predictive insights based on historical city data.

---

## System Architecture

```text
                    Smart City Dataset
                           |
                           v
                    PostgreSQL Database
                           |
                           v
                    FastAPI Backend
                           |
             +-------------+-------------+
             |             |             |
          Traffic       Weather       AQI
             |             |             |
          Water         Energy        Crime
             |             |             |
             +-------------+-------------+
                           |
                           v
                       REST APIs
                           |
                           v
                    React Frontend
                           |
                           v
                 Smart City Dashboard
                           |
                           v
                     AI Predictions