import classNames from "classnames/bind";
import styles from "./Banking.module.scss";
import FooterPage from "../../component/FooterPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Banking() {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("section-header")}>
            <h3 className={cx("section-title")}>Thanh toán</h3>
          </div>
          <div className={cx("section-content")}>
            <h3>
              Quý khách ghi đúng thông tin nạp tiền thì tài khoản sẽ được cộng
              tự động sau khi giao dịch thành công.
            </h3>
            <h3>
              Khuyến cáo nạp qua bank, vì nạp Momo đôi lúc giao dịch bị delay.
              Nạp bank thì 3s - 3p tiền lên
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
              <div className={cx("item-left")}>
                <p>
                  Ngân hàng:
                  <span>Vietcombank</span>
                </p>

                <p>
                  Chủ tài khoản:
                  <br />
                  <span>DO QUANG HUNG</span>
                </p>

                <p>
                  Số tài khoản:
                  <br />
                  <span>9332630996</span>
                  <span
                    style={{ cursor: "pointer", "padding-left": "0.25rem" }}
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
                    style={{ cursor: "pointer", "padding-left": "0.25rem" }}
                    onClick={() => {
                      navigator.clipboard.writeText("0966149309");
                    }}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </span>
                </p>
                <p className={cx("content-sub")}>
                  Hệ thống sẽ tự động cộng tiền vào tài khoản của bạn sau khoảng
                  1-5 phút. Nếu quá 2 tiếng tiền chưa được cộng vui lòng liên hệ
                  admin để được hỗ trợ.
                  <br />
                  <span className="text-bold">
                    Lưu ý đối với Vietcombank: Giao dịch sẽ bị delay lúc 22h~3h
                    sáng hàng ngày, khách hàng không nạp qua VCB vào khoảng thời
                    gian này
                  </span>
                </p>
              </div>
              <div className={cx("item-right")}>
                <h3>Quét mã QR để thanh toán</h3>
                <p>
                  Sử dụng
                  <span>App Internet Banking</span>
                  hoặc ứng dụng camera hỗ trợ QR code để quét mã
                </p>
                <div className={cx("img-item")}>
                  <img
                    src="https://qr.ecaptcha.vn/api/generate/vcb/9332630996/DO%20QUANG%20HUNG?memo=VS88&is_mask=0&bg=16"
                    alt="qr_banking"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPage fix="true" />
    </>
  );
}
export default Banking;
