export default function CardMetric({ title, value, growth }) {
  return (
    <div className="card shadow-sm">
    <div className="card-body">
      <h4 className="card-title text-muted small">{title}</h4>
      <p className="card-text h4 fw-bold">{value}</p>
      <span className={`small ${growth.includes('-') ? 'text-danger' : 'text-success'}`}>
      {growth}
      </span>
    </div>
    </div>
  );
}