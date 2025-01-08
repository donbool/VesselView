import React from 'react';
import { Burger, Drawer, Stack, Text, Box, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '../styles.css';

function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/', label: 'Dashboard' },
    { href: '/alerts', label: 'Alerts' },
    { href: '/fleet-overview', label: 'Fleet Overview' },
  ];

  return (
    <>
      {/* Navbar Header */}
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-logo">
            <img
              src="/logo.png"
              alt="ShipMonitor Logo"
              className="navbar-logo-img"
            />
            <div className="navbar-logo">
          <a href="/" className="navbar-logo-link" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="navbar-logo-text">ShipMonitor</h1>
          </a>
        </div>

          </div>

          {/* Burger for All Screens */}
          <Burger
            opened={opened}
            onClick={toggle}
            className="navbar-burger"
            color="white"
            size="sm"
            aria-label="Toggle navigation"
          />
        </div>
      </header>

      {/* Left-Side Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="250px"
        position="left" // Drawer slides from the left
        padding="lg"
        // overlayOpacity={0.5} // Dim the background when opened
        withOverlay
        styles={{
          drawer: {
            backgroundColor: '#00274d',
            color: 'white',
            zIndex: 1100,
          },
        //   overlay: {
        //     zIndex: 1000, // Make sure overlay covers the map
        //   },
        }}
      >
        <Stack spacing="md">
          {links.map((link) => (
            <Text
              key={link.label}
              component="a"
              href={link.href}
              onClick={close}
              sx={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 500,
                color: 'white',
                padding: '10px 0',
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'background-color 150ms ease',
                '&:hover': {
                  backgroundColor: '#004080',

                },
              }}
            >
              {link.label}
            </Text>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}

export default Navbar;
