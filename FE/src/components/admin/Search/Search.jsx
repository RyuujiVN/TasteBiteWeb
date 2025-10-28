import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Search.scss";

const SearchBar = ({ placeholder = "Tìm kiếm", onSearch }) => {
  return (
    <div className="search">
      <Input
        className="search__input"
        placeholder={placeholder}
        prefix={<SearchOutlined className="search__icon" />}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
