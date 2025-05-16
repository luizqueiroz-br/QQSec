import React from 'react';

export default function ResultCard({ data }) {
  return (
    <div>
      <h4>Resultado para {data.domain}</h4>
      <pre>{data.stdout}</pre>
      {data.output_file && <a href={data.output_file} target="_blank">Baixar XML</a>}
    </div>
  );
}
