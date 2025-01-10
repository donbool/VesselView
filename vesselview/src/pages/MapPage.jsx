import React, { useState, useEffect } from 'react';
import { Container, Slider, TextInput, Title, Paper, Group, SegmentedControl } from '@mantine/core';
import Map from '../components/Map';

function MapPage() {
  const [filter, setFilter] = useState('all');
  const [sliderValue, setSliderValue] = useState(7);
  const [ships, setShips] = useState([]);
  const [shipHistory, setShipHistory] = useState({});

  // Fetch ship data
  useEffect(() => {
    async function fetchShipData() {
      try {
        const response = await fetch('http://localhost:8000/ships');
        if (!response.ok) {
          throw new Error('Failed to fetch ships');
        }
        const data = await response.json();
        console.log('Fetched ships:', data);
        setShips(data);
      } catch (error) {
        console.error('Error fetching ships:', error);
      }
    }
    fetchShipData();
  }, []);

  // Fetch historical data when slider changes
  useEffect(() => {
    async function fetchHistoricalData() {
      const newHistory = {};
      for (const ship of ships) {
        try {
          const response = await fetch(`http://localhost:8000/ships/${ship.id}/history?days=${sliderValue}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch history for ship ${ship.id}`);
          }
          const data = await response.json();
          newHistory[ship.id] = data;
        } catch (error) {
          console.error(`Error fetching history for ship ${ship.id}:`, error);
        }
      }
      setShipHistory(newHistory);
    }

    if (ships.length > 0) {
      fetchHistoricalData();
    }
  }, [ships, sliderValue]);

  // Filter ships based on selection
  const filteredShips = filter === 'all' ? ships : ships.filter(ship => ship.starred);

  return (
    <Container fluid>
      <Title align="center" mb="lg" style={{ fontWeight: 700, color: '#1c7ed6' }}>
        Ship Route Map
      </Title>

      <Group position="center" mb="lg">
        <TextInput
          placeholder="Search for a ship"
          label="Search Ship"
          style={{ width: '300px' }}
        />
        <SegmentedControl
          value={filter}
          onChange={setFilter}
          data={[
            { label: 'All Vessels', value: 'all' },
            { label: 'My Vessels', value: 'my-vessels' },
          ]}
        />
      </Group>

      <Paper
        shadow="md"
        radius="lg"
        style={{
          height: '75vh',
          width: '100%',
          position: 'relative',
        }}
      >
        <Map 
          ships={filteredShips} 
          shipHistory={shipHistory}
          sliderValue={sliderValue} 
        />
      </Paper>

      <Slider
        value={sliderValue}
        onChange={setSliderValue}
        label={`Last ${sliderValue} days`}
        min={1}
        max={30}
        step={1}
        marks={[
          { value: 1, label: '1 day' },
          { value: 7, label: '1 week' },
          { value: 14, label: '2 weeks' },
          { value: 30, label: '1 month' },
        ]}
        style={{ marginTop: '20px' }}
      />
    </Container>
  );
}

export default MapPage;
