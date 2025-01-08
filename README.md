# Ship Monitoring Dashboard

## **Project Overview**
The Ship Monitoring Dashboard is a web application designed to track ships in real-time. It visualizes ship positions, displays key metrics, and provides tools for monitoring fleet performance and detecting anomalies. This project aims to showcase skills in **Python**, **React**, and **FastAPI** while building a functional and valuable maritime tech product.

---

## **Goal**
To create a real-time ship monitoring dashboard that:
- Tracks ship positions on an interactive map.
- Displays metrics such as speed, heading, fuel consumption, and environmental data.
- Provides alerts for anomalies (e.g., off-course ships).
- Optionally visualizes historical data and predicts future routes.

---

## **Tech Stack**
### **Frontend (React)**
- **Interactive Map**: Built with [Leaflet.js](https://leafletjs.com/) to visualize ship locations.
- **Real-Time Updates**: Implemented using WebSockets for dynamic data refresh.
- **Data Visualization**: Charts created with [Chart.js](https://www.chartjs.org/) or [D3.js](https://d3js.org/).

### **Backend (Python + FastAPI)**
- API endpoints for ship data (real-time and historical).
- WebSocket connections to stream updates to the frontend.
- Simulated AIS data (or live AIS data integration).

### **Database**
- **PostgreSQL**: Used to store ship logs, metrics, and user settings.

### **Deployment (Optional)**
- Deployable with **AWS** or **Docker** for cloud hosting.

---

## **Features**

### **Core Features**
1. **Real-Time Ship Position Tracking**:
   - Displays ships on an interactive map with real-time updates.
2. **Metrics Visualization**:
   - Shows speed, heading, fuel consumption, and environmental conditions.
3. **Anomaly Alerts**:
   - Triggers alerts for off-course ships or other anomalies.

### **Additional Features (Optional)**
1. **Historical Data Visualization**:
   - Displays past routes or incidents.
2. **Predictive Analytics**:
   - Estimates arrival times based on speed and weather conditions.

---

## **Pages**
1. **Home / Dashboard**:
   - Displays an interactive map with ship positions.
   - Provides key fleet metrics and summary widgets.
2. **Ship Details Page**:
   - Shows detailed ship information, historical routes, and metric trends.
3. **Fleet Overview**:
   - A table or grid of all ships with filters and search functionality.
4. **Alerts Page**:
   - Displays triggered alerts and allows users to configure custom alert rules.
5. **Settings Page**:
   - Configures API integrations and update frequency.

---

## **How to Start**

### **Backend Setup (FastAPI)**
1. Set up API endpoints:
   - `/ships`: Fetch all ship data.
   - `/ships/<id>`: Fetch detailed data for a specific ship.
   - `/alerts`: Fetch triggered alerts.
   - `/historical/<id>`: Fetch historical data for a specific ship.
2. Simulate or fetch AIS data:
   - Generate random positions, metrics, and status updates if no live feed is available.

### **Frontend Setup (React)**
1. Create a navbar with links to all pages.
2. Design components:
   - Map component for ship positions.
   - Card widgets for summary metrics.
   - Tables and charts for detailed data.

---

## **Getting Started**
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ship-monitoring-dashboard

## **Getting Started**
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ship-monitoring-dashboard
uvicorn main:app --reload
cd frontend

npm install

npm run dev

http://localhost:5173.
The backend API will run at http://127.0.0.1:8000
