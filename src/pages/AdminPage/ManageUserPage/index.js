import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import {
  Button,
  Input,
  Space,
  Table,
  Breadcrumb,
  Tooltip,
  Modal,
  InputNumber,
} from "antd";
import { faEye, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "./ManageUserpage.module.scss";
import classNames from "classnames/bind";
import { message } from "antd";

const cx = classNames.bind(styles);
const ManageUserPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [publicMoney, setPublicMoney] = useState(1000);
  const [openModal, setOpenModal] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [messageApi, contextHolder] = message.useMessage();

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleClickPulicMoney = (value) => {
    setOpenModal(true);
    console.log(typeof value);
    setUserId(value);
  };
  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "PhoneNumber",
      dataIndex: "phonenumber",
      width: "15%",
      ...getColumnSearchProps("phonenumber"),
    },
    {
      title: "Số dư",
      dataIndex: "balance",
      sorter: (a, b) => parseInt(a.balance) - parseInt(b.balance),
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },

    {
      title: "Ngày đăng kí",
      dataIndex: "createdAt",
      width: "15%",
    },
    {
      title: "Thao tác",
      render: (value) => (
        <Space>
          <Tooltip title="Cộng tiền" color={"#1677ff"}>
            <Button
              type="primary"
              style={{
                backgroundColor: "green",
              }}
              icon={<FontAwesomeIcon icon={faPlus} />}
              size={"medium"}
              onClick={() => handleClickPulicMoney(value.id)}
            />
          </Tooltip>
          <Button
            type="primary"
            danger
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            size={"medium"}
          >
            Xóa
          </Button>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faEye} />}
            size={"medium"}
          >
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagi, filters, sorter) => {
    setPagination({
      current: pagi.current,
      pageSize: pagi.pageSize,
      total: pagi.total,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== pagination?.pageSize) {
      setData([]);
    }
  };

  const handlePublicMoney = async () => {
    try {
      let response = await axiosPrivate.get(
        `/apiAdmin/publicMoney?userId=${userId}&money=${publicMoney}`
      );
      console.log(response);
      if (response?.status === 200 && response.data.errCode === 0) {
        messageApi.success("Cộng tiền cho khách hàng thành công!");
      } else {
        messageApi.error("Lỗi xử lý!");
      }
    } catch (e) {
      console.error("loi xu li cong tien");
      messageApi.error("Lỗi xử lý!");
    } finally {
      setOpenModal(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("accout effect");
      let response = await axiosPrivate.get(
        `/adminApi/getAllUser?page=${pagination.current}&limit=${pagination.pageSize}`
      );
      if (response?.status === 200 && response.data.errCode === 0) {
        response = response.data;
        setData(response.data);
        setPagination({
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: response.total,
        });
        setLoading(false);
      }
    } catch (err) {
      console.log("throw werrror");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(pagination)]);
  return (
    <div className={cx("wraper")}>
      {contextHolder}
      <div className={cx("block-breadcrumb")}>
        <h4>KHÁCH HÀNG</h4>
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/admin" style={{ color: "#0665d0" }}>
                  Admin
                </Link>
              ),
            },
            {
              title: <Link to="#">Khách Hàng</Link>,
            },
          ]}
        />
      </div>
      <Table
        bordered
        pagination={pagination}
        columns={columns}
        dataSource={data}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="Nạp tiền thủ công"
        centered
        open={openModal}
        onOk={() => handlePublicMoney()}
        onCancel={() => setOpenModal(false)}
        // width={1000}
      >
        <div className={cx("input-group-item")}>
          <span>Tiền cộng thêm :</span>
          <InputNumber
            size="large"
            min={1000}
            step={1000}
            formatter={(value) =>
              `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/VNĐ\s?|(,*)/g, "")}
            style={{
              backgroundColor: "#e9ecef",
              borderRadius: "0.25rem",
              width: "60%",
            }}
            value={publicMoney}
            onChange={(value) => setPublicMoney(value)}
          />
        </div>
      </Modal>
    </div>
  );
};
export default ManageUserPage;
