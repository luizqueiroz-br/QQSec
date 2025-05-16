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
    <div className="container mt-5">
        <div className="card shadow">
            <div className="card-header bg-dark text-white">
                <h2 className="mb-0">DNSenum Scanner</h2>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="domainInput" className="form-label">Digite o domínio:</label>
                    <input
                        id="domainInput"
                        type="text"
                        className="form-control"
                        value={domain}
                        onChange={e => setDomain(e.target.value)}
                        placeholder="exemplo.com"
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-success" onClick={startScan}>Iniciar Scan</button>
                    {taskId && !result && (
                        <button className="btn btn-warning" onClick={fetchResult}>Ver Resultado</button>
                    )}
                </div>
                {result && (
                    <div className="mt-4">
                        <ResultCard data={result} />
                    </div>
                )}
            </div>
        </div>
    </div>
);
}

