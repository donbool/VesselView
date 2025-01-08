import React from 'react';
import { Table, Container, Title } from '@mantine/core';

function Alerts() {
  const mockAlerts = [
    { id: 1, ship: 'Vessel A', issue: 'Off Course', severity: 'High' },
    { id: 2, ship: 'Vessel B', issue: 'Low Fuel', severity: 'Medium' },
    { id: 3, ship: 'Vessel C', issue: 'High Speed', severity: 'Low' },
  ];

  const rows = mockAlerts.map((alert) => (
    <tr key={alert.id}>
      <td>{alert.ship}</td>
      <td>{alert.issue}</td>
      <td style={{ color: alert.severity === 'High' ? 'red' : alert.severity === 'Medium' ? 'orange' : 'green' }}>
        {alert.severity}
      </td>
    </tr>
  ));

  return (
    <Container>
      <Title order={2} align="center" mt="xl" mb="xl">
        Alerts
      </Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Ship</th>
            <th>Issue</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}

export default Alerts;
