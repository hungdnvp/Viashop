import { useState, useEffect } from "react";
import { Alert, Spin, Button, message } from "antd";
import classNames from "classnames/bind";
import styles from "./Banking.module.scss";
import FooterPage from "../../../component/FooterPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Banking() {
  const [isChecking, setIsChecking] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [codeBanking, setCodeBanking] = useState(makeid(5));
  useEffect(() => {
    console.log("hahah", codeBanking);
  }, []);

  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const hanleBankingClick = () => {
    setIsChecking(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbzwer4rpuceUuTPWK4wlblVymvDk74G-P6jVNQmrORZzPa7UYcyvynMdAiIginG_Edv9w/exec"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Process the retrieved user data
        console.log("data:", data);
        setIsChecking(false);
      })
      .catch((error) => {
        messageApi.error(error);
        setIsChecking(false);
      });
  };
  return (
    <>
      {contextHolder}
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("section-header")}>
            <h3 className={cx("section-title")}>Thanh toán</h3>
          </div>
          <div className={cx("section-content")}>
            <h3>
              Quý khách nạp tiền vui lòng quét mã QR hoặc nhập đúng thông tin
              nạp tiền tài khoản sẽ được cộng tự động sau khi giao dịch thành
              công.
            </h3>
            <h3>
              Nếu quý khách muốn nạp bằng phương thức khác, hoặc cần hỗ trợ vui
              lòng liên hệ Phone/Zalo :{" "}
            </h3>
          </div>
          <div className={cx("section-header")}>
            <h3 className={cx("section-title")}>THÔNG TIN NẠP TIỀN</h3>
          </div>
          <div className={cx("banking-container")}>
            <div className={cx("banking-area")}>
              <Spin tip="Loading..." size="large" spinning={isChecking}>
                <div className={cx("block-info-banking")}>
                  <div className={cx("item-left")}>
                    <p>
                      Ngân hàng:
                      <span>MB BANK</span>
                    </p>

                    <p>
                      Chủ tài khoản:
                      <br />
                      <span>DO QUANG HUNG</span>
                    </p>

                    <p>
                      Số tài khoản:
                      <br />
                      <span>0966149309</span>
                      <span
                        style={{ cursor: "pointer", paddingLeft: "0.25rem" }}
                        onClick={() => {
                          navigator.clipboard.writeText("0966149309");
                        }}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </span>
                    </p>

                    <p>
                      Nội dung chuyển khoản:
                      <br />
                      <span>VS88</span>
                      <span
                        style={{ cursor: "pointer", paddingLeft: "0.25rem" }}
                        onClick={() => {
                          navigator.clipboard.writeText("VS88");
                        }}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </span>
                    </p>

                    <p className={cx("content-sub")}>
                      <span>
                        Sau mỗi lần quý khách chuyền tiền, vui lòng ấn nút{" "}
                      </span>
                      <br />
                      <Button
                        type="primary"
                        size={"large"}
                        onClick={hanleBankingClick}
                      >
                        ĐÃ THANH TOÁN
                      </Button>
                      <br />
                      <span>
                        Hệ thống sẽ kiểm tra tự động và cộng tiền vào tài khoản
                        của bạn trong giây lát. Nếu có lỗi xảy ra vui lòng liên
                        hệ admin để được hỗ trợ.
                      </span>
                      <br />
                    </p>
                  </div>
                  <div className={cx("item-right")}>
                    <h3>Mã QR thanh toán tự động</h3>
                    <p>
                      Sử dụng
                      <span>App Internet Banking</span>
                      hoặc ứng dụng camera hỗ trợ QR code
                    </p>
                    <div className={cx("img-item")}>
                      <img
                        src="https://qr.ecaptcha.vn/api/generate/MB/0966149309/DO%20QUANG%20HUNG?memo=VS88&is_mask=0&bg=15"
                        alt="qr_banking"
                      />
                    </div>
                  </div>
                </div>
              </Spin>
            </div>
            {isChecking && (
              <Alert
                className={cx("process-banking")}
                message="Đang kiểm tra thanh toán"
                description="Vui lòng đợi trong giây lát..."
                type="info"
              />
            )}
          </div>
        </div>
      </div>
      <FooterPage fix="true" />
    </>
  );
}
export default Banking;
