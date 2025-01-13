interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) // Send plain password
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return {
      success: true,
      token: data.token
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};