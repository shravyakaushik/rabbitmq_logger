import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // The server responded with a status other than 2xx
        setMessage(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        setMessage('No response from the server');
      } else {
        // Something happened in setting up the request
        setMessage('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetRequest = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get('http://localhost:5000/status'); // Change to your GET API endpoint
      setMessage(response.data.status); // Adjust based on your response structure
    } catch (error) {
      if (error.response) {
        // The server responded with a status other than 2xx
        setMessage(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        setMessage('No response from the server');
      } else {
        // Something happened in setting up the request
        setMessage('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <br />
    </div>
  );
}

export default Login;
