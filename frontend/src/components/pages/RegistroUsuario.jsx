import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistroUsuario = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'confirmPassword' || name === 'password') {
            if (name === 'confirmPassword' && formData.password !== value) {
                setPasswordError('As senhas não coincidem!');
            } else if (name === 'password' && formData.confirmPassword && formData.confirmPassword !== value) {
                setPasswordError('As senhas não coincidem!');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordError) {
            alert('Corrija os erros antes de enviar o formulário.');
            return;
        }
        console.log('Form Data:', formData);
        // Aqui você pode adicionar a lógica para enviar os dados para o backend
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Registro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                    {passwordError && <small className="text-danger">{passwordError}</small>}
                </div>
                <div className="mb-3">
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="form-select mt-3"
                    >
                        <option value="">Selecione o papel</option>
                        <option value="admin">Admin</option>
                        <option value="user">Usuário</option>
                        <option value="guest">Convidado</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default RegistroUsuario;
