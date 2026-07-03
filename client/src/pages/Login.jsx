import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert("Invalid Credentials", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-2xl w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">Hexar CMS Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full p-3 mb-4 border rounded-lg focus:outline-blue-500"
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-6 border rounded-lg focus:outline-blue-500"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button className="w-full py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}