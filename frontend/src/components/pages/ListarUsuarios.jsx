import React, { useEffect, useState } from 'react';
import TabelasListUser from "../basicos/Tabelas";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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


    

        return fetchUsuarios();

    }, []);

    return (
        <div>                        
        {msgErro && <p>{msgErro}</p>}
        <h1>Lista de Usuários</h1>
        {loading ? (
            <p>Carregando...</p>
        ) : (
            <div>
                <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-primary" >
                        <i className="bi bi-database-fill-add"></i> Novo usuário
                    </button>
                </div>
                <TabelasListUser data={usuarios}></TabelasListUser>
            </div>
            )
        }
        </div>
    );


};

export default ListarUsuarios;