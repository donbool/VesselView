import React from 'react';
import {
  Avatar,
  Badge,
  Group,
  Select,
  Table,
  Text,
  Container,
  Title,
} from '@mantine/core';

const mockShips = [
  {
    id: 1,
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Vessel A',
    speed: 12,
    status: 'On Course',
    lastActive: '2 hours ago',
    role: 'Active',
  },
  {
    id: 2,
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Vessel B',
    speed: 10,
    status: 'Off Course',
    lastActive: '5 hours ago',
    role: 'Off Course',
  },
  {
    id: 3,
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Vessel C',
    speed: 15,
    status: 'On Course',
    lastActive: '1 hour ago',
    role: 'Active',
  },
];

function FleetOverview() {
  const rows = mockShips.map((ship) => (
    <Table.Tr key={ship.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={ship.avatar} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {ship.name}
            </Text>
            <Text fz="xs" c="dimmed">
              Speed: {ship.speed} knots
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge
          color={ship.status === 'On Course' ? 'green' : 'red'}
          variant="light"
        >
          {ship.status}
        </Badge>
      </Table.Td>
      <Table.Td>{ship.lastActive}</Table.Td>
      <Table.Td>
        <Select
          data={['Active', 'Off Course']}
          defaultValue={ship.role}
          variant="unstyled"
          allowDeselect={false}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
      <Title order={2} align="center" mt="xl" mb="xl">
        Fleet Overview
      </Title>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Vessel</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Last Active</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Container>
  );
}

export default FleetOverview;
