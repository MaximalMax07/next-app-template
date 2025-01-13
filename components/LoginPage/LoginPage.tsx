import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Stack, Container, Divider, Title, Button, Text, Loader } from '@mantine/core';
import { login } from '../../services/authService';

interface LoginPageProps {
  onLogin: (status: boolean) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    const response = await login(values.username, values.password);
    if (response.success) {
      setLoading(true);
      setError(null);
      onLogin(true);
      // Simulate page load
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the timeout as needed
    } else {
      setError('Invalid username or password');
      onLogin(false);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Divider my="sm" />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Username" {...form.getInputProps('username')} />
          <PasswordInput label="Password" {...form.getInputProps('password')} />
          {error && <Text color="red">{error}</Text>}
          <Button type="submit" disabled={loading}>
            {loading ? <Loader size="sm" /> : 'Login'}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};