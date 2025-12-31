import { Card } from "antd";
import "./KpiCard.scss";

const KpiCard = ({ icon, value, label, color }) => {
  return (
    <Card className="kpi-card">
      <div className="kpi-card__icon" style={{ backgroundColor: color }}>
        {icon}
      </div>

      <div className="kpi-card__content">
        <div className="kpi-card__label">{label}</div>
        <div className="kpi-card__value">{value}</div>
      </div>
    </Card>
  );
};

export default KpiCard;
