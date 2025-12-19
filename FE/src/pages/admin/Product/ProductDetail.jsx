import React from "react";
import { Drawer, Descriptions, Image, Tag, Flex } from "antd";
import { formatCurrency } from "~/utils/formatPrice";

const ProductDetail = ({ open, onClose, product }) => {
  if (!product) return null;

  return (
    <Drawer title="Chi tiết sản phẩm" width={500} onClose={onClose} open={open}>
      <Flex justify="center">
        <Image
          src={product.image_url}
          width={220}
          style={{ borderRadius: 10, marginBottom: 20 }}
        />
      </Flex>

      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{product.id}</Descriptions.Item>

        <Descriptions.Item label="Tên sản phẩm">
          {product.title}
        </Descriptions.Item>

        <Descriptions.Item label="Giá">
          {formatCurrency(product.price)}
        </Descriptions.Item>
        <Descriptions.Item label="Giảm giá">
          {product.discount}%
        </Descriptions.Item>
        <Descriptions.Item label="Giá sau giảm">
          {formatCurrency(product.new_price)}
        </Descriptions.Item>

        <Descriptions.Item label="Slug">{product.slug}</Descriptions.Item>

        <Descriptions.Item label="Nổi bật">
          {product.is_featured ? (
            <Tag color="green">Có</Tag>
          ) : (
            <Tag color="red">Không</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Tạo lúc">
          {product.created_at}
        </Descriptions.Item>
        <Descriptions.Item label="Cập nhật">
          {product.updated_at}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ProductDetail;
