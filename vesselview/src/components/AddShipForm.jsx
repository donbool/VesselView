import React, { useState } from 'react';

function AddShipForm({ onShipAdded }) {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newShip = { name, speed: parseFloat(speed), status, position_lat: 0, position_lon: 0, starred: false };
    try {
      const response = await fetch('http://localhost:8000/ships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShip),
      });
      if (!response.ok) throw new Error('Failed to add ship');
      const result = await response.json();
      console.log(result);
      onShipAdded(newShip); // Notify parent to refresh the list
    } catch (error) {
      console.error('Error adding ship:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={speed} onChange={(e) => setSpeed(e.target.value)} placeholder="Speed" required />
      <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" required />
      <button type="submit">Add Ship</button>
    </form>
  );
}

export default AddShipForm;
