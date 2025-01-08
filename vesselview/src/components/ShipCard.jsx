import React from 'react';
import { Card, Text, Badge, Button, Group, ActionIcon } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

function ShipCard({ ship, onClick, onStarToggle }) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onClick={() => onClick(ship)}
    >
      <Group position="apart">
        <Text size="lg" weight={500}>
          {ship.name}
        </Text>
        <ActionIcon
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onClick
            onStarToggle(ship.id);
          }}
        >
          {ship.starred ? (
            <IconStarFilled size={20} color="gold" />
          ) : (
            <IconStar size={20} />
          )}
        </ActionIcon>
      </Group>
      <Badge
        color={ship.status === 'On Course' ? 'green' : 'red'}
        variant="light"
        mt="sm"
      >
        {ship.status}
      </Badge>
      <Text size="sm" color="dimmed" mt="xs">
        Speed: {ship.speed} knots
      </Text>
      <Button fullWidth mt="md" variant="outline" color="blue">
        View Details
      </Button>
    </Card>
  );
}

export default ShipCard;
