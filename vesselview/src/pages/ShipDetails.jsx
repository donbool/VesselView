import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Paper } from '@mantine/core';

function ShipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample ship data for demonstration
  const ships = [
    { id: 1, name: 'Vessel A', speed: 12, status: 'On Course', position: [51.5, -0.1] },
    { id: 2, name: 'Vessel B', speed: 10, status: 'Off Course', position: [51.6, -0.2] },
    { id: 3, name: 'Vessel C', speed: 15, status: 'On Course', position: [51.7, -0.3] },
  ];

  const ship = ships.find((ship) => ship.id === parseInt(id));

  if (!ship) {
    return <Text>No ship found with ID {id}</Text>;
  }

  return (
    <Container size="sm" py="md">
      <Paper shadow="md" radius="lg" p="lg" withBorder>
        <Title align="center" mb="lg" style={{ fontWeight: 700, color: '#1c7ed6' }}>
          {ship.name}
        </Title>
        <Text size="lg">Speed: {ship.speed} knots</Text>
        <Text size="lg">Status: {ship.status}</Text>
        <Text size="lg">Position: [{ship.position.join(', ')}]</Text>
        <Button mt="lg" color="blue" onClick={() => navigate(-1)}>
          Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
}

export default ShipDetails;
