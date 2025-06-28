import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../styles/commonStyles.css';
import teacherImg from '../assets/teacher.png';
import iconImg from '../assets/icon.png';

// Define the backend server URL
const API_URL = 'http://localhost:5001/api/auth';

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'Teacher' | 'Student'>('Teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        // --- SIGNUP LOGIC ---
        const response = await axios.post(`${API_URL}/signup`, {
          email,
          password,
          role,
        });
        console.log(response.data.message); // "User created successfully!"
        // After successful signup, prompt user to log in
        alert('Signup successful! Please log in to continue.');
        setMode('login');

      } else {
        // --- LOGIN LOGIC ---
        const response = await axios.post(`${API_URL}/login`, {
          email,
          password,
          role, // Send role to backend for validation
        });
        console.log(response.data.message); // "Login successful!"
        
        // On successful login, navigate based on role
        if (response.data.user.role === 'Student') {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      // Handle errors from axios
      if (axios.isAxiosError(err) && err.response) {
        // Set error message from backend response
        setError(err.response.data.message || 'An unexpected error occurred.');
      } else {
        // Handle other errors (e.g., network error)
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('API call failed:', err);
    } finally {
      // This will run whether the try block succeeded or failed
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="centeredContainer login-flex-bg">
      <div className="card login-card">
        <div className="login-image-wrap">
          <img
            src={role === 'Teacher' ? teacherImg : iconImg}
            alt={role}
            className="login-role-image"
          />
        </div>
        <div className="login-role-toggle">
          <button
            type="button"
            className={`toggleButton${role === 'Teacher' ? ' toggleButtonSelected' : ''}`}
            onClick={() => setRole('Teacher')}
            disabled={loading} // Disable when loading
          >
            Teacher
          </button>
          <button
            type="button"
            className={`toggleButton${role === 'Student' ? ' toggleButtonSelected' : ''}`}
            onClick={() => setRole('Student')}
            disabled={loading} // Disable when loading
          >
            Student
          </button>
        </div>
        <h2 className="mainTitle">
          {mode === 'login' ? 'Login' : 'Sign Up'} as {role}
        </h2>
        <form onSubmit={handleSubmit} className="login-form-flex">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input"
            autoComplete={mode === 'login' ? 'username' : 'email'}
            disabled={loading} // Disable when loading
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            disabled={loading} // Disable when loading
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="login-toggle-text">
          <span 
            onClick={toggleMode}
            style={{ 
              fontSize: '12px', 
              color: loading ? '#ccc' : '#666', // Grey out when loading
              cursor: loading ? 'default' : 'pointer', 
              textDecoration: 'underline',
              marginTop: '10px',
              display: 'block',
              textAlign: 'center'
            }}
          >
            {mode === 'login' ? 'New user? Sign up' : 'Already have an account? Login'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;