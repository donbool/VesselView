import React, { useState, useEffect } from 'react';
import { Paper, Title, Text, Group, Stack } from '@mantine/core';

function Statistics() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/statistics')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Received stats:', data);  // Debug log
        setStats(data);
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
        setError(error.message);
      });
  }, []);

  if (error) return <Paper p="md"><Text color="red">{error}</Text></Paper>;
  if (!stats) return <Paper p="md"><Text>Loading statistics...</Text></Paper>;

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Stack spacing="xs">
        <Title order={4}>Fleet Statistics</Title>
        <Group position="apart">
          <Text>Total Ships: {stats.total_ships || 0}</Text>
          <Text>Average Speed: {stats.average_speed?.toFixed(1) || 0} knots</Text>
          <Text>Starred Vessels: {stats.starred_count || 0}</Text>
        </Group>
        {stats.ships_by_status?.length > 0 && (
          <>
            <Title order={5} mt="sm">Ships by Status</Title>
            {stats.ships_by_status.map(([status, count]) => (
              <Text key={status}>
                {status}: {count}
              </Text>
            ))}
          </>
        )}
      </Stack>
    </Paper>
  );
}

export default Statistics; 