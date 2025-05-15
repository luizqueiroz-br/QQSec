import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [msgErro, setMsgErro] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUsuarios = () => {
            axios.get('/api/usuarios')
                .then(response => {
                    setUsuarios(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setUsuarios([]);
                    setMsgErro('Erro ao buscar usuários:');
                    setLoading(false);
                });
        };


        const timeoutId = setTimeout(fetchUsuarios, 5000);

        return () => clearTimeout(timeoutId); // Limpa o timeout ao desmontar o componente
        console.log(usuarios.length);
        console.log(usuarios);

    }, []);

    return (
        <div>                        
        {msgErro && <p>{msgErro}</p>}
        <h1>Lista de Usuários</h1>
        {loading ? (
            <p>Carregando...</p>
        ) : (
            <p>criar um componente para tabelas</p>
            )
        }
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