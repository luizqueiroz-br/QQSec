import React, { useEffect, useState } from 'react';
import Tabelas from "../basicos/Tabelas";
import axios from 'axios';

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([{"id": 1, "nome": "João", "email": ""}]);
    const [msgErro, setMsgErro] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = () => {
            axios.get('http://localhost:5000/admin/api/users', {
                withCredentials: true
            })
                .then(response => {
                    console.log(response);
                    if (response.status == 200) {
                        setUsuarios(response.data);

                    } else {
                        setUsuarios([]);

                        setMsgErro('Erro ao buscar usuários, não foi possível conectar ao servidor.');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setUsuarios([]);
                    setMsgErro('Erro ao buscar usuários:'+ error.message);
                    setLoading(false);
                });
        };


        const timeoutId = setTimeout(fetchUsuarios, 5000);

        return () => clearTimeout(timeoutId); // Limpa o timeout ao desmontar o componente


    }, []);

    return (
        <div>                        
        {msgErro && <p>{msgErro}</p>}
        <h1>Lista de Usuários</h1>
        {loading ? (
            <p>Carregando...</p>
        ) : (
            <Tabelas data={usuarios}></Tabelas>
            )
        }
        </div>
    );


};

export default ListarUsuarios;