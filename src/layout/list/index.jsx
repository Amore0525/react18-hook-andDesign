import React, { useRef, useImperativeHandle } from "react";
import { Pagination } from "antd";
import "./index.scss";
import useStore from "@/store";
import { usePage } from "@/hook/index.js"; // hook
import { checkDataType } from "@/utils/common"; // utils
import Config from "@/config";

const CdList = (props) => {
  const { TableStore } = useStore();
  const { getReq } = usePage();
  const state = useRef({
    pageIndex: getReq()?.pageIndex,
    pageSize: getReq()?.pageSize,
    total: 0,
    disabled: false,
  });
  const pageChange = (page, pageSize) => {
    const isFunction = checkDataType().isFunction(props?.page);
    if (!isFunction) {
      return false;
    }
    state.current.disabled = true;
    // 记录页码
    TableStore.SET_FILTER_ACTION("page");
    TableStore.SET_PAGE({ size: pageSize, index: page });
    state.current.pageIndex = page;
    state.current.pageSize = pageSize;
    props?.page(page, pageSize).finally(() => {
      state.current.disabled = false;
    });
  };
  const setTotal = (val) => {
    state.current.total = val * 1;
  };
  const reset = () => {
    state.current.pageIndex = Config.pageIndex;
  };
  // 暴露给父组件的方法放在这里
  useImperativeHandle(props?.tableRef, () => ({
    setTotal,
    reset,
  }));
  return (
    <div id="render-content">
      <div id="render-content-header">
        {props.children.tabs ? (
          <>
            <div id="render-tabs">{props.children.tabs}</div>
          </>
        ) : null}
      </div>
      <div id="render-content-main">
        {props.children.tabschecked ? (
          <>
            <div id="render-tabs-checked">{props.children.tabschecked}</div>
          </>
        ) : null}
        {props.children.search ? (
          <>
            <div id="render-search">{props.children.search}</div>
          </>
        ) : null}
        {props.children.control ? (
          <>
            <div id="render-control">{props.children.control}</div>
          </>
        ) : null}
        <div id="render-body">
          <div>{props.children.default ? props.children.default : null}</div>
        </div>
        <div id="render-footer">
          <Pagination className="pull-right" size="small" disabled={state.current.disabled} defaultCurrent={state.current.pageIndex} current={state.current.pageIndex} pageSize={state.current.pageSize} total={state.current.total} showSizeChanger onChange={pageChange} />
        </div>
      </div>
    </div>
  );
};

export default CdList;
