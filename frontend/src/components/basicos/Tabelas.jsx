import React from 'react';

const Tabelas = ({ data, additionalColumns = [] }) => {
    if (!data || data.length === 0) {
        return <p>Nenhum dado disponível.</p>;
    }

    // Obtém as chaves do primeiro objeto para gerar as colunas automaticamente
    const keys = Object.keys(data[0]);

    return (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
                <tr>
                    {keys.map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                    {additionalColumns.map((col, index) => (
                        <th key={`additional-${index}`}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {keys.map((key) => (
                            <td key={key}>{row[key]}</td>
                        ))}
                        {additionalColumns.map((col, index) => (
                            <td key={`additional-${index}`}>
                                {col.render ? col.render(row) : null}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Tabelas;