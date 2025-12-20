import { Flex } from "antd";

const InfoRow = ({ icon, label, children }) => (
  <div className="info-row">
    <Flex align="center" gap={10}>
      {icon}
      <span>{label}</span>
    </Flex>

    <span>{children}</span>
  </div>
);

export default InfoRow;
