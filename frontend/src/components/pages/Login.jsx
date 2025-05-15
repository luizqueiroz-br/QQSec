import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { login } from '../services/authService';
import logo from '../../assets/logo.png';

const Login = ({ setIsAuthenticated }) => {
  // Suporte ao TypeScript pode ser ajustado com tipagem, mas aqui mantemos JS puro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Usado para exibir mensagens de erro ou sucesso
  const navigate = useNavigate();  // <-- Aqui você cria o `navigate`
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setMessage('erro');
      return;
    }

    if (password.length < 2) {
      setMessage('erro');
      return;
    }
    const sucess = await login(username, password);
    if (sucess) {
      setIsAuthenticated(true); //Chamar setIsAuthenticated após o login bem-sucedido
      navigate('/redirect');
    } else {
      setMessage("Erro ao se autenticar, verifique seu usuário e senha.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>

        <h2 className="text-center mb-4">
          <img src={logo} alt="Logo" style={{ alignContent: 'center', width: '150px', height: '150px' }} />
          <br />
          Login
        </h2>
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
                placeholder="entre com o usuário"
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
          <button type="submit" className="btn btn-primary w-100">Acessar</button>
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
