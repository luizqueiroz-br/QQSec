import React, { useState } from 'react';

const Login = () => {
    // Suporte ao TypeScript pode ser ajustado com tipagem, mas aqui mantemos JS puro
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Usado para exibir mensagens de erro ou sucesso

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username, password }),
            });

            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                setMessage('Login successful');
                window.location.href = '/dashboard';
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('api error ' + error.message);
        }
    };

    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
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
          {message && <p className="text-danger text-center mt-3">{message}</p>}
        </div>
      </div>
    );
};

export default Login;