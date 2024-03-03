import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faTrashCan, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Tag, Spin, Breadcrumb } from "antd";
import styles from "./ListProduct.module.scss";
import classNames from "classnames/bind";
import { message } from "antd";

const cx = classNames.bind(styles);

const ListProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [viaId, setViaId] = useState(location.state?.viaId || 7);
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [spin, setSpin] = useState(false);

  const goBack = () => {
    navigate(-1);
  };
  // state edit item Via

  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      width: "5%",
      align: "center",
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "owner",
      width: "15%",
      align: "center",
      render: (_, { owner }) => <p>{owner === null ? "admin" : owner}</p>,
    },
    {
      title: "Tài khoản",
      dataIndex: "information",
      // width: "20%",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      align: "center",
      render: (_, { status }) => (
        <Tag color={status === "sold" ? "volcano" : "green"}>
          {status === "sold" ? "đã bán" : "đang bán"}
        </Tag>
      ),
    },
    {
      title: "Check live gần nhất",
      dataIndex: "lastCheck",
      width: "15%",
      align: "center",
    },

    {
      title: "Thời gian đưa lên",
      dataIndex: "createdAt",
      width: "15%",
      align: "center",
    },
    {
      title: "Thao tác",
      align: "center",
      dataIndex: "",
      width: "8%",
      render: (value) => (
        <Button
          type="primary"
          danger
          icon={<FontAwesomeIcon icon={faTrashCan} />}
          size={"medium"}
          onClick={() => handleDeleteProduct(value)}
        >
          Xóa
        </Button>
      ),
    },
  ];
  const handleDeleteProduct = (value) => {
    console.log(value);
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("list product fetch");
      let response = await axiosPrivate.post("/apiAdmin/viewProduct", {
        viaId: viaId,
        pagination: pagination,
      });
      if (response?.status === 200) {
        const data_response = response.data;
        console.log("listProducts: ", data_response);
        setData(data_response.data);
        setPagination({
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data_response.total,
        });
      }
    } catch (e) {
      console.log("fetch list via err");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(pagination)]);

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
  return (
    <Spin spinning={spin}>
      {
        <div className={cx("wrapper-display")}>
          {contextHolder}
          <div className={cx("block-breadcrumb")}>
            <span onClick={goBack}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </span>
            <h4>QUẢN LÝ TÀI KHOẢN</h4>
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
                  title: <Link to="#">Tài Khoản</Link>,
                },
              ]}
            />
          </div>
          <Table
            pagination={pagination}
            bordered
            columns={columns}
            dataSource={data}
            loading={loading}
            tableLayout={"auto"}
            onChange={handleTableChange}
          />
        </div>
      }
    </Spin>
  );
};
export default ListProduct;
