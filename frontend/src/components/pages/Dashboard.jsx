import CardMetric from "../basicos/CardMetric";

export default function Dashboard() {
  return (
    <div className="container py-4">
      <h1 className="text-center my-4">Dashboard</h1>
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-md-3">
          <CardMetric title="Sales" value="3450" growth="+25%" />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <CardMetric title="Revenue" value="$35,256" growth="+15%" />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <CardMetric title="Avg. Price" value="$10.22" growth="-5%" />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <CardMetric title="Operations" value="15893" growth="+8%" />
        </div>
      </div>
    </div>
  );
}
