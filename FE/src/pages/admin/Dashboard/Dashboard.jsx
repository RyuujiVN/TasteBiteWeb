import { Row, Col, Card, Segmented, Spin, Table, Image } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import "./Dashboard.scss";
import KpiCard from "./KpiCard";
import RevenueChart from "./RevenueChart";
import OrderStatusChart from "./OrderStatusChart";

import dashboardService from "~/services/dashboardService";
import { formatCurrency } from "~/utils/formatPrice";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderRevenueType, setOrderRevenueType] = useState("month");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dashboardService.revenue({
          orderType: orderRevenueType,
        });
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderRevenueType]);

  const revenueChartData =
    data?.revenueOrder?.map((item) => ({
      date: item.date,
      value: Number(item.total),
    })) || [];

  const topProductColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "product_title",
      key: "product_title",
      render: (_, record) => (
        <div className="dashboard__product">
          <img
            src={record.product_image_url}
            alt={record.product_title}
            style={{
              width: 48,
              height: 48,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
          <span style={{ fontWeight: 500 }}>{record.product_title}</span>
        </div>
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "total_sold",
      key: "total_sold",
      align: "center",
    },
    {
      title: "Doanh thu",
      dataIndex: "total_sale",
      key: "total_sale",
      align: "right",
      render: (value) => `${formatCurrency(value)}đ`,
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="dashboard">
        {/* ================= KPI ================= */}
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <KpiCard
              icon={<DollarOutlined />}
              value={`${formatCurrency(data?.orders)}đ`}
              label="Doanh thu năm nay"
            />
          </Col>

          <Col span={8}>
            <KpiCard
              icon={<ShoppingCartOutlined />}
              value={data?.numOfOrder}
              label="Số đơn hàng năm nay"
            />
          </Col>

          <Col span={8}>
            <KpiCard
              icon={<UserOutlined />}
              value={data?.numOfUser}
              label="Khách hàng mới tháng này"
            />
          </Col>
        </Row>

        {/* ================= CHARTS ================= */}
        <Row gutter={[24, 24]} className="dashboard__charts">
          {/* REVENUE */}
          <Col span={16}>
            <Card
              title="Tổng doanh thu"
              extra={
                <Segmented
                  value={orderRevenueType}
                  options={[
                    { value: "month", label: "Tháng" },
                    { value: "year", label: "Năm" },
                  ]}
                  onChange={(value) => setOrderRevenueType(value)}
                />
              }
            >
              <RevenueChart data={revenueChartData} />
            </Card>
          </Col>

          {/* ORDER STATUS */}
          <Col span={8}>
            <Card title="Đơn hàng trong năm">
              <OrderStatusChart data={data?.orderStatus} />

              {/* SUMMARY */}
              <div className="order-status-summary">
                <div className="order-status-summary__item completed">
                  <span className="dot" />
                  <div>
                    <div className="value">
                      {data?.orderStatus?.completed || 0}
                    </div>
                    <div className="label">Hoàn thành</div>
                  </div>
                </div>

                <div className="order-status-summary__item cancelled">
                  <span className="dot" />
                  <div>
                    <div className="value">
                      {data?.orderStatus?.cancelled || 0}
                    </div>
                    <div className="label">Đã huỷ</div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* ================= TOP PRODUCT ================= */}
        <Row gutter={[24, 24]} style={{ marginTop: 30 }}>
          <Col span={24}>
            <Card title="Top sản phẩm bán chạy">
              <Table
                rowKey="product_id"
                columns={topProductColumns}
                dataSource={data?.topSaleProducts || []}
                pagination={false}
                size="middle"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default Dashboard;
