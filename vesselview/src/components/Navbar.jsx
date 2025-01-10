import React, { useState } from 'react';
import {
  IconBellRinging,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { Code, Group, Burger, Drawer } from '@mantine/core';
import { Link } from 'react-router-dom'; // Import Link from React Router
import classes from './NavbarSimple.module.css';

const data = [
  { link: '/', label: 'Dashboard', icon: IconBellRinging },
  { link: '/map', label: 'Map', icon: IconBellRinging },
  { link: '/alerts', label: 'Alerts', icon: IconBellRinging },
  { link: '/fleet-overview', label: 'Fleet Overview', icon: IconBellRinging },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Dashboard');
  const [opened, setOpened] = useState(false);

  const links = data.map((item) => (
    <Link
      to={item.link} // Use Link's "to" attribute for navigation
      className={`${classes.link} ${
        active === item.label ? classes.active : ''
      }`}
      key={item.label}
      onClick={() => {
        setActive(item.label);
        setOpened(false); // Close the drawer on link click
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <>
      <Burger
        opened={opened}
        onClick={() => setOpened(!opened)}
        className="fixed top-4 left-4 z-30"
        size="sm"
        aria-label="Toggle navigation"
      />

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        size={300}
        padding={0}
        withCloseButton={false}
      >
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <Code fw={700}>v3.1.2</Code>
            </Group>
            {links}
          </div>

          <div className={classes.footer}>
            <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Change account</span>
            </a>

            <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </div>
        </nav>
      </Drawer>
    </>
  );
}

export default NavbarSimple;
