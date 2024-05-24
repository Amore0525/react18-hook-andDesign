import React, { useState, useImperativeHandle } from "react";
import { Form, Row } from "antd";
import "./index.scss";
const SearchIndex = (props) => {
  const [formLayout, setFormLayout] = useState("outline");
  const formItemLayout = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const [form] = Form.useForm();
  const reset = () => {
    form.resetFields();
  };
  // 获取搜索参数值
  const getFieldValue = () => {
    return form.getFieldValue();
  };
  // 设置form表单某个字段值
  const setFieldValue = (field, value) => {
    form.setFieldsValue({
      [field]: value,
    });
  };
  // 暴露给父组件的方法放在这里
  useImperativeHandle(props?.searchRef, () => ({
    reset,
    getFieldValue,
    setFieldValue,
  }));
  return (
    <div className="search-container">
      <Form form={form} {...formItemLayout} layout={formLayout}>
        <Row gutter={16} style={{ width: "100%" }}>
          {props.children}
        </Row>
      </Form>
    </div>
  );
};

export default SearchIndex;
