import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from '../../components/basicos/ResultCard';

export default function Dnsenum() {
  const [domain, setDomain] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [result, setResult] = useState(null);

  const startScan = () => {
    axios.post('http://localhost:5000/api/dnsenum', { domain })
      .then(res => setTaskId(res.data.task_id))
      .catch(err => alert('Erro ao iniciar scan: ' + err.message));
  };

  const fetchResult = () => {
    axios.get(`http://localhost:5000/api/dnsenum/result/${taskId}`)
      .then(res => {
        if (res.data.status === 'pending') {
          setTimeout(fetchResult, 3000); // Poll
        } else {
          setResult(res.data);
        }
      });
  };

  return (
    <div>
      <h2>DNSenum Scanner</h2>
      <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="exemplo.com" />
      <button onClick={startScan}>Iniciar Scan</button>
      {taskId && !result && <button onClick={fetchResult}>Ver Resultado</button>}
      {result && <ResultCard data={result} />}
    </div>
  );
}

