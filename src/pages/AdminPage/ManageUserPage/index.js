import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ManageUserPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
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
  const columns = [
    {
      key: "username",
      title: "Tên tài khoản",
      dataIndex: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      key: "phonenumber",
      title: "PhoneNumber",
      dataIndex: "phonenumber",
      width: "15%",
      ...getColumnSearchProps("phonenumber"),
    },
    {
      key: "balance",
      title: "Số dư",
      dataIndex: "balance",
      sorter: (a, b) => parseInt(a.balance) - parseInt(b.balance),
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },

    {
      key: "createdAt",
      title: "Ngày đăng kí",
      dataIndex: "createdAt",
      width: "15%",
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "",
      render: () => (
        <Space>
          <Button
            type="primary"
            danger
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            size={"medium"}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("accout effect");
      let response = await axiosPrivate.get("/adminApi/getAllUser");
      if (response?.status === 200) {
        let users = response.data;
        console.log(users);
        setData(users);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: users.length,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      }
    } catch (err) {
      console.log("throw werrror");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={tableParams.pagination}
      onChange={handleTableChange}
    />
  );
};
export default ManageUserPage;
