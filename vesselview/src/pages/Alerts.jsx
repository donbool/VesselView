import React, { useState } from 'react';
import { Avatar, Badge, Checkbox, Group, ScrollArea, Table, Text, Title, Container } from '@mantine/core';
import cx from 'clsx';
import classes from './TableSelection.module.css';

function Alerts() {
  const mockAlerts = [
    {
      id: 1,
      avatar:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
      ship: 'Vessel A',
      issue: 'Off Course',
      severity: 'High',
    },
    {
      id: 2,
      avatar:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
      ship: 'Vessel B',
      issue: 'Low Fuel',
      severity: 'Medium',
    },
    {
      id: 3,
      avatar:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
      ship: 'Vessel C',
      issue: 'High Speed',
      severity: 'Low',
    },
  ];

  const [selection, setSelection] = useState([]);

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) =>
      current.length === mockAlerts.length ? [] : mockAlerts.map((item) => item.id)
    );

  const rows = mockAlerts.map((alert) => {
    const selected = selection.includes(alert.id);
    return (
      <Table.Tr key={alert.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox
            checked={selection.includes(alert.id)}
            onChange={() => toggleRow(alert.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={alert.avatar} radius={26} />
            <div>
              <Text size="sm" fw={500}>
                {alert.ship}
              </Text>
              <Text size="xs" c="dimmed">
                {alert.issue}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Badge
            color={
              alert.severity === 'High'
                ? 'red'
                : alert.severity === 'Medium'
                ? 'yellow'
                : 'green'
            }
            variant="light"
          >
            {alert.severity}
          </Badge>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Container>
      <Title order={2} align="center" mt="xl" mb="xl">
        Alerts
      </Title>
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === mockAlerts.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== mockAlerts.length
                  }
                />
              </Table.Th>
              <Table.Th>Ship</Table.Th>
              <Table.Th>Severity</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}

export default Alerts;
