import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CommonUtils from "../../../service/commonUtils";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button, Table, Input, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./ManageVia.module.scss";
import { message } from "antd";

const cx = classNames.bind(styles);

const FormManageGroup = ({ setdataParent }) => {
  const [groupViaName, setGroupViaName] = useState();
  const [groupViaId, setGroupViaId] = useState();
  const [imageGroupVia, setImageGroupVia] = useState();
  const [previewUrl, setPreViewUrl] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [nameBtnAdd, setNameBtnAdd] = useState("Thêm");
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handlOnclickEdit = (groupVia) => {
    setGroupViaName(groupVia.groupViaName);
    setGroupViaId(groupVia.id);
    setImageGroupVia(null);
    setPreViewUrl(groupVia.image);
    setIsEdit(true);
    setNameBtnAdd("Hủy");
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "8%",
      align: "center",
    },
    {
      title: "Nhóm Via",
      dataIndex: "groupViaName",
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "",
      align: "center",
      width: "30%",

      render: (value) => (
        <Space>
          <Button
            type="primary"
            danger
            icon={<FontAwesomeIcon icon={faPen} />}
            size={"medium"}
            style={{ marginRight: "8px" }}
            onClick={() => handlOnclickEdit(value)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            size={"medium"}
          >
            xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleOnChangeImage = async (file) => {
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      setImageGroupVia(base64);
      setPreViewUrl(objectURL);
    }
  };
  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
      // else {
      //   console.log("file: ", file);
      // }
    },
    onChange: (info) => {
      if (info.file.status === "removed") {
        console.log("img removed");
        setImageGroupVia(null);
        setPreViewUrl(null);
      } else {
        handleOnChangeImage(info.file.originFileObj);
      }
    },
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("group via fetch");
      let response = await axiosPrivate.get("/api/getAllGroupVia");
      if (response?.status === 200) {
        const groupVias = response.data;
        // console.log("groupVias: ", groupVias);
        setData(groupVias);
        setdataParent(groupVias);
        setLoading(false);
      }
    } catch (e) {
      console.log("fetch group via err");
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddGroupVia = async () => {
    if (isEdit) {
      setNameBtnAdd("Thêm");
      setIsEdit(false); // set Huy thanh Them
      setGroupViaName("");
      setPreViewUrl("");
      setImageGroupVia(null);
    } else {
      if (!groupViaName) {
        messageApi.error("Xảy ra lỗi, xin hãy thử lại!");
      } else {
        try {
          let response = await axiosPrivate.post(
            "/apiAdmin/addGroupVia?groupViaName",
            { groupViaName: groupViaName, image: imageGroupVia }
          );
          if (response?.status === 200) {
            console.log("add groupVia success");
            messageApi.success("Thêm nhóm Via thành công!");
            await fetchData();
          }
          // console.log(imageGroupVia);
          // console.log(previewUrl);
        } catch (e) {
          messageApi.error("Xảy ra lỗi, xin hãy thử lại!");
          console.log("add group via error");
        }
      }
    }

    setGroupViaName("");
  };
  const handleEditGroupVia = async () => {
    console.log("groupViaName", groupViaName);
    console.log("image", imageGroupVia);
    console.log("id", groupViaId);
    if (!groupViaName) {
      messageApi.error("có lỗi xảy ra, vui lòng thử lại!");
    } else {
      let data = {
        groupViaName: groupViaName,
        image: imageGroupVia,
        id: groupViaId,
      };
      let response = await axiosPrivate.post("/apiAdmin/editGroupVia", data);
      if (response?.status === 200) {
        messageApi.success("Sửa nhóm via thành công");
      } else {
        messageApi.error("có lỗi xảy ra, vui lòng thử lại!");
      }
    }
  };
  const divClass = isEdit ? cx("add-group", "add-border") : cx("add-group");
  const btnEditclass = isEdit ? cx("btn-edit-active") : cx("btn-edit");
  return (
    <div className={cx("wrapper-half-content")}>
      {contextHolder}

      <div className={divClass}>
        <h4>{nameBtnAdd === "Thêm" ? nameBtnAdd : "Sửa"} nhóm via</h4>
        <div className={cx("input-group")}>
          <Input
            bordered
            size="large"
            placeholder="Tên nhóm Via"
            style={{
              backgroundColor: "#e9ecef",
              borderRadius: "0.25rem",
              width: "auto",
              marginRight: "12px",
              maxHeight: "40px",
              flex: 1,
            }}
            value={groupViaName}
            onChange={(e) => setGroupViaName(e.target.value)}
          />

          <Upload {...props} maxCount={1}>
            <Button danger size="large" icon={<UploadOutlined />}>
              Chọn ảnh (*.png)
            </Button>
          </Upload>
          <img id="imageGroupVia" alt=" " src={previewUrl} />
        </div>
        <div className={cx("btn-change")}>
          <Button
            onClick={handleAddGroupVia}
            className={cx("btn-add")}
            type="primary"
            size="large"
            style={{ marginBottom: "12px" }}
          >
            {nameBtnAdd}
          </Button>
          <Button
            onClick={handleEditGroupVia}
            className={btnEditclass}
            type="primary"
            size="large"
            style={{ marginBottom: "12px" }}
          >
            Lưu lại
          </Button>
        </div>
      </div>

      <Table
        bordered={true}
        scroll={{
          y: 500,
          x: 100,
        }}
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};
export default FormManageGroup;
