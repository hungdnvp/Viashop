import { React } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button } from "antd";
import styles from "./AccountPage.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function AccountPage() {
  const navigate = useNavigate();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState();
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const location = useLocation();
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(newPass));
  }, [newPass]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        console.log("accout effect");
        const response = await axiosPrivate.get(
          `/api/getAccountInfo?email=${auth.email}`
        );
        if (response && response.data && isMounted) {
          setUserInfo(response.data.data);
        }
      } catch (err) {
        console.log("throw werrror");
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const confirmChangePass = async () => {
    setCurrentPass("");
    setConfirmPass("");
    setNewPass("");
    const v2 = PWD_REGEX.test(newPass);
    if (!currentPass || !newPass || !confirmPass || !v2) {
      messageApi.error("Vui lòng nhập mật khẩu đúng yêu cầu");
    } else {
      if (newPass !== confirmPass) {
        messageApi.error("Vui lòng xác nhận mật khẩu trùng với mật khẩu mới");
      } else {
        try {
          const response = await axiosPrivate.post("/api/changePassword", {
            email: auth.email,
            currentPass,
            newPass,
          });
          if (response && response.data) {
            messageApi.info(response.data.errMessage);
          }
        } catch (err) {
          messageApi.error("Đổi mật khẩu thất bại");
        }
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      {contextHolder}
      <div className={cx("container")}>
        <div className={cx("section-header")}>
          <h3 className={cx("section-title")}>Cài đặt</h3>
        </div>
        <div className={cx("section-content")}>
          <div className={cx("info-account")}>
            <h3>Thông tin tài khoản</h3>
          </div>
          <div className={cx("detail-account")}>
            <div className={cx("item-info", "date-register")}>
              <h4>Ngày đăng kí:</h4>
              <span>{userInfo && userInfo.createdAt}</span>
            </div>
            <div className={cx("item-info", "name-accout")}>
              <h4>Tài khoản:</h4>
              <span>{userInfo && userInfo.username}</span>
            </div>
            <div className={cx("item-info", "email-accoutn")}>
              <h4>Email:</h4>
              <span>{userInfo && userInfo.email}</span>
            </div>
            <div className={cx("item-info", "balance")}>
              <h4>Số dư:</h4>
              <span className={cx("text-strong")}>
                {userInfo && userInfo.balance} VNĐ
              </span>
            </div>
          </div>
        </div>
        <div className={cx("section-content")}>
          <div className={cx("info-account")}>
            <h3>Đổi mật khẩu</h3>
          </div>
          <div className={cx("detail-account")}>
            <div className={cx("item-info")}>
              <h4>Mật khẩu hiện tại</h4>
              <Input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
              />
            </div>
            <div className={cx("item-info")}>
              <h4>
                Mật khẩu mới
                <span style={{ paddingLeft: "1.5rem" }}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? cx("valid") : cx("hide")}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validPwd || !newPass ? cx("hide") : cx("invalid")
                    }
                  />
                </span>
              </h4>
              <Input
                type="password"
                value={newPass}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd ? cx("instructions") : cx("offscreen")
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 đến 24 kí tự.
              <br />
              Bao gồm ít nhất một kí tự in hoa và thường, một số và một kí tự
              đặc biệt.
              <br />
              cho phép kí tự đặc biệt:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <div className={cx("item-info")}>
              <h4>Xác nhận lại mật khẩu</h4>
              <Input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
            <div className={cx("item-info", "btn-changePass")}>
              <Button type="primary" size={"large"} onClick={confirmChangePass}>
                Lưu lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountPage;
