import React, { useMemo } from "react";
import "./index.scss";

const CdTabs = (props) => {
  const tit = useMemo(() => {
    return props.title || "";
  }, [props.title]);
  return (
    <div className="tabs-menu-container">
      <div className="tabs-menu-header">
        <h4 className="title">
          <strong>{tit}</strong>
        </h4>
      </div>
      <>{props.children}</>
    </div>
  );
};

export default CdTabs;
