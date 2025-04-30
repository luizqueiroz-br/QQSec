import CardMetric from "../basicos/CardMetric";

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-3">
        <CardMetric title="Sales" value="3450" growth="+25%" />
      </div>
      <div className="col-md-3">
        <CardMetric title="Revenue" value="$35,256" growth="+15%" />
      </div>
      <div className="col-md-3">
        <CardMetric title="Avg. Price" value="$10.22" growth="-5%" />
      </div>
      <div className="col-md-3">
        <CardMetric title="Operations" value="15893" growth="+8%" />
      </div>
    </div>
  );
}
