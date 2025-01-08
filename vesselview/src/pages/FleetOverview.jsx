import React from 'react';
import { Table, Container, Title } from '@mantine/core';

function FleetOverview() {
  const mockShips = [
    { id: 1, name: 'Vessel A', speed: 12, status: 'On Course' },
    { id: 2, name: 'Vessel B', speed: 10, status: 'Off Course' },
    { id: 3, name: 'Vessel C', speed: 15, status: 'On Course' },
  ];

  const rows = mockShips.map((ship) => (
    <tr key={ship.id}>
      <td>{ship.name}</td>
      <td>{ship.speed} knots</td>
      <td style={{ color: ship.status === 'On Course' ? 'green' : 'red' }}>{ship.status}</td>
    </tr>
  ));

  return (
    <Container>
      <Title order={2} align="center" mt="xl" mb="xl">
        Fleet Overview
      </Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Speed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}

export default FleetOverview;
