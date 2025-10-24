import { Form, Input } from 'antd';
import React from 'react'

const AddFood = () => {
  return (
    <div className="add-food">
      <div className="add-food__header box-head">
        <h2 className="add-food__header--title box-head__title">Thêm món ăn</h2>
      </div>

      <div className="add-food__body">
        <Form className="form add-food__form">
          <Form.Item label="Tên món ăn" name="name">
            <Input />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddFood