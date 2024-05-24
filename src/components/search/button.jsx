import React, { useState } from "react";
import { Space, Button } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import useStore from "@/store";
const SearchButton = (props) => {
  const { TableStore } = useStore();
  const collapseStyle = { padding: "0 5px" };
  const collapseMargin = { marginRight: "10px" };
  const [open, setOpen] = useState(false);
  // 展开收起
  const toggleSearchItem = () => {
    setOpen(!open);
    props?.toggle(!open);
  };
  // 搜索
  const search = () => {
    TableStore.SET_FILTER_ACTION("search");
    props?.search();
  };
  // 重置
  const reset = () => {
    TableStore.SET_FILTER_ACTION("reset");
    props?.reset();
  };
  return (
    <Space className="pull-right dis-flex">
      <Button type="primary" style={collapseMargin} onClick={() => search()}>
        查 询
      </Button>
      <Button style={collapseMargin} onClick={() => reset()}>
        重 置
      </Button>
      <Button type="link" style={collapseStyle} onClick={() => toggleSearchItem()}>
        {open ? "收起" : "展开"}
        {open ? <UpOutlined /> : <DownOutlined />}
      </Button>
    </Space>
  );
};

export default SearchButton;
