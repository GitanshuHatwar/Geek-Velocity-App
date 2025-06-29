import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/commonStyles.css';
import teacherImg from '../assets/teacher.png';
import iconImg from '../assets/icon.png';

const API_BASE_URL = 'http://192.168.22.99:5001';

const Login: React.FC = () => {
  const [role, setRole] = useState<'Teacher' | 'Student'>('Teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    if (role === 'Student') {
      navigate('/onboarding');
    } else {
      // Teacher login
      try {
        const response = await axios.post(`${API_BASE_URL}/teachers/login`, {
          username: email,
          password,
        });
        if (response.data.success) {
          navigate('/dashboard');
        } else {
          setError(response.data.message || 'Invalid credentials');
        }
      } catch (err) {
        setError('Server error. Please try again later.');
        console.log(err);
      }
    }
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
          >
            Teacher
          </button>
          <button
            type="button"
            className={`toggleButton${role === 'Student' ? ' toggleButtonSelected' : ''}`}
            onClick={() => setRole('Student')}
          >
            Student
          </button>
        </div>
        <h2 className="mainTitle">Login as {role}</h2>
        <form onSubmit={handleSubmit} className="login-form-flex">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input"
            autoComplete="current-password"
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="loginButton">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
