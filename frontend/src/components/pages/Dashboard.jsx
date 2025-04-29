import React from 'react';

export default function Dashboard() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bem-vindo ao Dashboard!</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Seção 1</h2>
          <p>Informações ou gráficos podem ser exibidos aqui.</p>
        </div>
        <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Seção 2</h2>
          <p>Mais informações ou widgets podem ser exibidos aqui.</p>
        </div>
      </div>
    </div>
  );
}
