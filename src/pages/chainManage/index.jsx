import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Table, Space, Button, Select, message, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
// api
import { ApiChainBrandsList, ApiDeleteCustomer } from "@/api";
// hook
import { useTable, usePage } from "@/hook/index.js";
import SearchIndex from "@/components/search/index.jsx";
import SearchItem from "@/components/search/item.jsx";
import SearchButton from "@/components/search/button.jsx";
import CdList from "@/layout/list/index.jsx";
import CdTabs from "@/layout/tabs/index.jsx";

const Customer = () => {
  // table
  const [loading, setLoading] = useState(false);
  const { getHeight, tableHeight } = useTable();
  const { getReq, updateReq, searchForm } = usePage({
    name: "",
    liaisonName: "",
    liaisonMobile: "",
    brandStatus: undefined,
  });
  // table ref
  const tableRef = useRef();
  // 消息
  const [messageApi, contextHolder] = message.useMessage();
  // 路由导航
  const navigate = useNavigate();
  // 搜索ref
  const searchRef = useRef();
  // 是否展示更多搜索条件
  const [open, setOpen] = useState(false);
  // 客户参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  });
  // 客户列表管理
  const [customerData, setCustomerData] = useState({
    list: [], // 客户列表
    count: 0, // 客户数量
  });
  // 状态select列表
  const [statusOptions] = useState([
    { value: "1", label: "及格" },
    { value: "0", label: "不及格" },
  ]);
  // 表格column项
  const columns = [
    {
      title: "客户名称",
      dataIndex: "brandName",
      key: "brandName",
      width: 220,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "状态",
      dataIndex: "brandStatus",
      key: "brandStatus",
      ellipsis: true,
    },
    {
      title: "服务费费率",
      dataIndex: "serviceChargeRateStr",
      key: "serviceChargeRateStr",
      width: 220,
      align: "right",
    },
    {
      title: "联系人",
      dataIndex: "liaisonName",
      key: "liaisonName",
      ellipsis: true,
    },
    {
      title: "联系人手机",
      dataIndex: "liaisonMobile",
      key: "liaisonMobile",
      ellipsis: true,
    },
    {
      title: "操作",
      width: 240,
      render: (data) => {
        return (
          <Space>
            <Button type="link" size="small" icon={<i className="iconfont icon-eye" />} onClick={() => handlerEdit(data)}>
              详情
            </Button>
            <Button type="link" size="small" icon={<i className="iconfont icon-edit" />} onClick={() => handlerEdit(data)}>
              编辑
            </Button>
            <Button type="link" size="small" icon={<DeleteOutlined />} onClick={() => handlerDel(data)}>
              删除
            </Button>
          </Space>
        );
      },
      fixed: "right",
    },
  ];
  // 获取客户列表数据
  const getList = async () => {
    setLoading(true);
    ApiChainBrandsList(getReq())
      .then((res) => {
        console.log("获取客户列表数据", res);
        setCustomerData({
          list: res.data?.records || [],
          count: res.data?.total || 0,
        });
        setLoading(false);
        tableRef.current && tableRef.current.setTotal(res.data?.total);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // 切换页码
  const changePage = () => {
    return getList();
  };
  useEffect(() => {
    getHeight().then(() => {
      getList();
    });
  }, []);
  // 展开/收起
  const handlerToggle = (value) => {
    setOpen(value);
    getHeight();
  };
  // 搜索
  const handlerSearch = () => {
    console.log("搜索", searchRef.current.getFieldValue());
    searchRef.current.getFieldValue() && updateReq(searchRef.current.getFieldValue());
    tableRef.current.reset();
    getList();
  };
  // 重置
  const handlerReset = () => {
    searchRef.current.reset();
    getList();
  };
  // 状态select下拉
  const onStatusChange = (val) => {
    searchRef.current.setFieldValue("brandStatus", val);
  };
  // 编辑
  const handlerEdit = (data) => {
    navigate(`/layout/publish?id=${data.id}`);
  };
  // 删除
  const handlerDel = async (data) => {
    ApiDeleteCustomer({ id: data.id }).then((res) => {
      // 刷新一下列表
      setParams({
        ...params,
        page: 1,
      });
      messageApi.open({
        type: "success",
        content: "删除成功",
      });
    });
  };

  return (
    <>
      {contextHolder}
      <CdList tableRef={tableRef} page={changePage}>
        {{
          tabs: (
            <CdTabs title="客户管理">
              <Space size={10}>
                <Button type="primary">新增</Button>
                <Button>导 出</Button>
              </Space>
            </CdTabs>
          ),
          search: (
            <>
              {/* 筛选区域 */}
              <SearchIndex searchRef={searchRef}>
                <SearchItem label="客户名：" name="name" labelWidth="60px">
                  <Input placeholder="请输入名称/简称" maxLength={100} />
                </SearchItem>
                <SearchItem label="联系人：" name="liaisonName" labelWidth="60px">
                  <Input placeholder="请输入" maxLength={100} />
                </SearchItem>
                <SearchItem label="联系人手机：" name="liaisonMobile" labelWidth="90px">
                  <Input placeholder="请输入" maxLength={20} />
                </SearchItem>
                {open ? (
                  <SearchItem label="状态：" name="brandStatus" labelWidth="45px">
                    <Select placeholder="请选择" options={statusOptions} onChange={onStatusChange} allowClear />
                  </SearchItem>
                ) : null}
                <SearchItem span={open ? 24 : 6}>
                  <SearchButton toggle={handlerToggle} reset={handlerReset} search={handlerSearch}></SearchButton>
                </SearchItem>
              </SearchIndex>
            </>
          ),
          default: (
            <>
              {/* 客户列表区域 */}
              <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={customerData.list}
                scroll={{
                  y: tableHeight,
                }}
                pagination={false}
              />
            </>
          ),
        }}
      </CdList>
    </>
  );
};

export default observer(Customer);
