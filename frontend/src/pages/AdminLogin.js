import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Point vers le port 5001 (ou 5000) selon ton backend
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
      });

      // Stocker le token localement
      localStorage.setItem('adminToken', res.data.token);
      
      // Rediriger vers le dashboard
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fdfbfa' }}>
      <form onSubmit={handleLogin} style={{ padding: '2rem', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'Lora', color: '#cbaa8f' }}>Connexion Admin</h2>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Mot de passe</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#cbaa8f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Se connecter
        </button>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <a href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>← Retour au site</a>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
