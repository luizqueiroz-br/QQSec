export default function CardMetric({ title, value, growth }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body text-center">
        <h5 className="card-title text-uppercase text-secondary mb-3">{title}</h5>
        <h2 className="card-text fw-bold text-primary">{value}</h2>
        <span
          className={`badge ${
            growth.includes('-') ? 'bg-danger' : 'bg-success'
          } mt-2`}
        >
          {growth.includes('-') ? '▼' : '▲'} {growth}
        </span>
      </div>
    </div>
  );
}