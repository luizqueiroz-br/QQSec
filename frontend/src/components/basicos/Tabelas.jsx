import React from 'react';

const TabelasListUser = ({ data = [],  }) => {
    if (!data || data.length === 0) {
        return <p>Nenhum dado disponível.</p>;
    }

    // Obtém as chaves do primeiro objeto para gerar as colunas automaticamente
    const keys = Object.keys(data[0]);

    return (
    
       
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    {keys.map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                    
                        <th key={`additional-actions`}>Actions</th>
                    
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {keys.map((key) => (
                            <td key={key}>{row[key]}</td>
                        ))}
                        <td key={`additional-actions`}>
                            <button className="btn btn-primary" >
                                {row['is_active'] ? (
                                    <i className="bi bi-toggle-off"></i>
                                ) : (
                                    <i className="bi bi-toggle-on"></i>
                                )}
                            </button>   
                             <button className="btn btn-primary" >
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-danger" >
                                <i className="bi bi-trash"></i>     
                            </button>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        
    );
};

export default TabelasListUser;