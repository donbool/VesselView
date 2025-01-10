import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import { Grid, Title, Container, Paper, SegmentedControl } from '@mantine/core';
import ShipCard from '../components/ShipCard';
import AddShipForm from '../components/AddShipForm';
import Statistics from '../components/Statistics';


function Dashboard() {
  const [ships, setShips] = useState([]);
  const [filter, setFilter] = useState('all'); // "all" or "your-vessels"
  const navigate = useNavigate();

  // Fetch ship data from API
  useEffect(() => {
    async function fetchShipData() {
      try {
        const response = await fetch('http://localhost:8000/ships');
        if (!response.ok) {
          throw new Error('Failed to fetch ships');
        }
        const data = await response.json();
        console.log('Fetched ships:', data); // Debug log
        setShips(data); // Use the raw data without transformation
      } catch (error) {
        console.error('Error fetching ships:', error);
      }
    }
    fetchShipData();
  }, []);
  

  // Handle ship card click
  const handleShipClick = (ship) => {
    console.log('Ship clicked:', ship);
    navigate(`/ship/${ship.id}`);
  };

  // Toggle star status for a ship
  const handleStarToggle = (shipId) => {
    setShips((prevShips) =>
      prevShips.map((ship) =>
        ship.id === shipId ? { ...ship, starred: !ship.starred } : ship
      )
    );
  };

  // Filter displayed ships based on the filter value
  const displayedShips = filter === 'all' ? ships : ships.filter((ship) => ship.starred);

  return (
    <Container size="lg" py="md">
      {/* Dashboard Header */}
      <Title align="center" mb="lg" style={{ fontWeight: 700, color: '#1c7ed6' }}>
        Ship Monitoring Dashboard
      </Title>

      {/* Add Statistics component */}
      <Statistics />

      {/* Map Section */}
      <Paper shadow="md" radius="lg" p="lg" withBorder mt="md">
        <Map ships={ships} />
      </Paper>

      
      {/* Toggle for All Ships vs Your Vessels */}
      <SegmentedControl
        fullWidth
        value={filter}
        onChange={setFilter}
        data={[
          { label: 'All Ships', value: 'all' },
          { label: 'Your Vessels', value: 'your-vessels' },
        ]}
        mt="lg"
      />

      {/* Ship Cards */}
      <Title order={3} mt="xl" mb="md" style={{ fontWeight: 600 }}>
        {filter === 'all' ? 'All Ships' : 'Your Vessels'}
      </Title>
      <Grid gutter="md">
        {displayedShips.length > 0 ? (
          displayedShips.map((ship) => (
            <Grid.Col span={4} key={ship.id}>
              <ShipCard ship={ship} onClick={handleShipClick} onStarToggle={handleStarToggle} />
            </Grid.Col>
          ))
        ) : (
          <Title align="center" order={4} mt="lg" color="gray">
            No ships available to display.
          </Title>
        )}
      </Grid>
    </Container>
  );
}

export default Dashboard;
