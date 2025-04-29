import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Login = ({ setIsAuthenticated }) => {
    // Suporte ao TypeScript pode ser ajustado com tipagem, mas aqui mantemos JS puro
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Usado para exibir mensagens de erro ou sucesso
    const navigate = useNavigate();  // <-- Aqui você cria o `navigate`
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username, password }),
            });

            const data = await response.json();
            console.log('data:', data);
            console.log('response.status:', response.status);
            if (response.status === 200) {
                console.log('Login successful teoricamente');
                setMessage(data.message);
                console.log('Before navigate');
                //navigate('/dashboard'); // <-- Usa o hook correto aqui!
                setIsAuthenticated(true); //Chamar setIsAuthenticated após o login bem-sucedido
                navigate('/redirect');
            } else if (response.status === 401) {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('api error ' + error.message);
        }
    };

    return (
      <div className="container d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-person"></i>
          </span>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-lock"></i>
          </span>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {message && (
        <div className="alert alert-danger text-center mt-3" role="alert">
          {message} 
        </div>
      
        )}
      </div>
      </div>
    );
};

export default Login;
