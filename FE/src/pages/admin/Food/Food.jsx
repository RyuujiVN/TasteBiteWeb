import { Button, Card, Flex, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Food = () => {
  return (
    <>
      <div className="food">
        <div className="food__header box-head">
          <h2 className="food__header--title box-head__title">Món ăn</h2>
        </div>

        <div className="food__body">
          <Card className="card">
            <div className="card__header">
              <Flex justify="space-between" align="center">
                <Input.Search
                  placeholder="Tìm kiếm..."
                  className="input__search"
                />
                <Button type="primary">
                  <Link to="/admin/food/add">Thêm món ăn</Link>
                </Button>
              </Flex>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Food;
