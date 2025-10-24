import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  fectchDeleteCategory,
  fetchGetListCategory,
} from "~/redux/category/categorySlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import "./Category.scss";
import EditCategory from "./EditCategory";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "~/hooks/useDebounce";

const columns = [
  {
    key: "name",
    title: "Tên loại",
    dataIndex: "name",
  },

  {
    key: "updatedBy",
    title: "Người cập nhật",
    dataIndex: "updatedBy",
  },

  {
    key: "action",
    title: "Hành động",
    dataIndex: "action",
  },
];

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.currentCategory);

  const debounced = useDebounce(searchParams.get("keyword"), 500);

  const handleSet = (value, setModal) => {
    setCategory(value);
    setModal(true);
  };

  const handleDelete = (id) => {
    toast.promise(dispatch(fectchDeleteCategory(id)), {
      pending: "Đang xoá...",
    });
  };

  const handleSearch = (e) => {
    setSearchParams({
      keyword: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(fetchGetListCategory(debounced?.trim()));
  }, [debounced, dispatch]);

  console.log(categories);

  return (
    <div className="category">
      <div className="category__header box-head">
        <h2 className="category__header--title box-head__title">Loại món</h2>
      </div>

      <div className="category__body">
        <Card className="card">
          <div className="card__header">
            <Flex justify="space-between" align="center">
              <Form className="form-search">
                <Form.Item name="keyword">
                  <Input
                    placeholder="Tìm kiếm..."
                    className="input__search"
                    suffix={<IoIosSearch className="form-search__icon" />}
                    onChange={handleSearch}
                  />
                </Form.Item>
              </Form>
              <Button type="primary" onClick={() => setAddCategory(true)}>
                Thêm loại
              </Button>
            </Flex>
          </div>

          <Divider />

          <div className="card__body">
            {categories.length > 0 && (
              <Table
                className="table"
                columns={columns}
                // dataSource={categories.map((category) => (
                //   {
                //   key: category?._id,
                //   name: category?.name,
                //   updatedBy: `${category.updatedBy.}`,
                //   action: (
                //     <Space size={20}>
                //       <Tooltip title="Xem chi tiết">
                //         <MdOutlineRemoveRedEye className="table__icon" />
                //       </Tooltip>

                //       <Tooltip title="Chỉnh sửa">
                //         <AiOutlineEdit
                //           className="table__icon"
                //           onClick={() => handleSet(category, setEditCategory)}
                //         />
                //       </Tooltip>

                //       <Popconfirm
                //         title="Xoá loại"
                //         description="Bạn có chắc muốn xoá loại này"
                //         onConfirm={() => handleDelete(category._id)}
                //         okText="Xoá"
                //         cancelText="Huỷ"
                //       >
                //         <Tooltip title="Xoá">
                //           <AiOutlineDelete className="table__icon" />
                //         </Tooltip>
                //       </Popconfirm>
                //     </Space>
                //   ),
                // }))}
              />
            )}
          </div>
        </Card>
      </div>

      {addCategory && (
        <AddCategory
          addCategory={addCategory}
          setAddCategory={setAddCategory}
        />
      )}

      {editCategory && (
        <EditCategory
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          category={category}
        />
      )}
    </div>
  );
};

export default Category;
