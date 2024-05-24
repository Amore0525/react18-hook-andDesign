import React from "react";
import { Col, Row } from "antd";
import Bar from "@/components/echarts/bar";
import "./index.scss";

const Workbench = () => {
  return (
    <div className="workbench">
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          {/* 渲染Bar组件 */}
          <Bar title="ECharts 入门示例" xData={["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]} yData={[5, 20, 36, 10, 10, 20]} style={{ width: "500px", height: "400px" }} />
        </Col>
        <Col className="gutter-row" span={12}>
          {/* 渲染Bar组件 */}
          <Bar title="ECharts 入门示例" xData={["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]} yData={[5, 20, 36, 10, 10, 20]} style={{ width: "500px", height: "400px" }} />
        </Col>
      </Row>
    </div>
  );
};

export default Workbench;
