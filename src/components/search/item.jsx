import React, { useState, useRef, useEffect, useMemo } from "react";
import { Form, Col } from "antd";
import "./item.scss";

const SearchItem = (props) => {
  const labelWidthStyle = useMemo(() => {
    return props.labelWidth ? { width: props.labelWidth } : {};
  }, [props.labelWidth]);
  return (
    <Col className="gutter-row" span={props?.span || 6}>
      <Form.Item name={props?.name}>
        <div className="search-item">
          <label style={labelWidthStyle}>{props?.label}</label>
          <div>{props.children}</div>
        </div>
      </Form.Item>
    </Col>
  );
};
export default SearchItem;
