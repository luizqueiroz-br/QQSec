import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Substitua a URL abaixo pela URL da sua API para buscar os usuários
        axios.get('/api/usuarios')
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Usuários</h1>
            {usuarios.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Criado Por</th>
                            <th>Criado Em</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.criadoPor}</td>
                                <td>{new Date(usuario.criadoEm).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(usuario.id)}>Editar</button>
                                    <button onClick={() => handleDelete(usuario.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nenhum usuário cadastrado.</p>
            )}
        </div>
    );

    const handleEdit = (id) => {
        console.log(`Editar usuário com ID: ${id}`);
        // Adicione a lógica para editar o usuário
    };

    const handleDelete = (id) => {
        console.log(`Excluir usuário com ID: ${id}`);
        // Adicione a lógica para excluir o usuário
    };
};

export default ListarUsuarios;