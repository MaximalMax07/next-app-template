"use client"

import { useState, useEffect } from 'react';
import { Title, Group, Image, Text, AppShell, Burger, NavLink, Box, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconClock, IconSun, IconMoon } from '@tabler/icons-react';
import { Kantine } from '@/components/Kantine/Kantine';
import { Home } from '@/components/Home/Home';

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState('');
  const [opened, { toggle }] = useDisclosure();
  const [activePage, setActivePage] = useState('home');
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" style={{ width: '100%', height: '100%', padding: '0 20px' }}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group align="center" style={{ marginLeft: '20px' }}>
            <Image src="http://localhost:4000/media/images/feuerwehr.png" alt="Logo" width={40} height={40} />
            <Title order={2} style={{ margin: 0 }}>Feuerwehrwache Tegelort</Title>
          </Group>
          <Group align="center" style={{ marginLeft: 'auto', marginRight: '20px' }}>
            <ActionIcon color="red" onClick={toggleColorScheme} size="lg">
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
            <Box style={{ display: 'flex', alignItems: 'center', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '10px' }}>
              <IconClock size={16} style={{ marginRight: '5px' }} />
              <Text>{currentTime}</Text>
            </Box>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Startseite" active={activePage === 'home'} onClick={() => setActivePage('home')} />
        <NavLink label="Kantine" active={activePage === 'kantine'} onClick={() => setActivePage('kantine')} />
        <NavLink label="Settings" active={activePage === 'settings'} onClick={() => setActivePage('settings')} />
      </AppShell.Navbar>

      <AppShell.Main>
        {activePage === 'home' && <div><Home/></div>}
        {activePage === 'kantine' && <div><Kantine/></div>}
        {activePage === 'settings' && <div>Settings Content</div>}
      </AppShell.Main>
    </AppShell>
  );
}