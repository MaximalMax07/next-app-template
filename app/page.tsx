"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginPage } from '@/components/LoginPage/LoginPage';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard'); // Redirect to the dashboard page after login
    }
  }, [isLoggedIn, router]);

  const handleLogin = (status: boolean) => {
    setIsLoggedIn(status);
  };

  return (
    <>
      <LoginPage onLogin={handleLogin} />
    </>
  );
}