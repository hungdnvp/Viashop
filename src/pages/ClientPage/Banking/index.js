import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Alert, Spin, Modal, message, Result } from "antd";
import classNames from "classnames/bind";
import styles from "./Banking.module.scss";
import FooterPage from "../../../component/FooterPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Banking() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isBankingOK, setIsBankingOk] = useState(false);
  const [codeBanking, setCodeBanking] = useState(makeid(5));
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút = 600 giây
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const currentDate = new Date(); // Lấy ngày hiện tại
  const currentDateString = currentDate.toISOString().slice(0, 10);
  const [result, setResult] = useState({
    isOpenModal: false,
    statusModal: "error",
    title: null,
    subTitle: null,
  }); // ket qua giao dich
  // Đếm thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timer); // Dừng timer khi thời gian hết
          setResult({
            isOpenModal: true,
            statusModal: "error",
            title: "Hết thời gian nạp tiền. Vui lòng thử lại sau!!!",
            subTitle: null,
          });
          setTimeout(() => handleclickModal(), 3000);
          return 0;
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);
    // Hàm cleanup, dừng timer khi component bị unmount hoặc khi thời gian còn lại bằng 0
    return () => clearInterval(timer);
  }, []); // Không có dependencies, sẽ chạy một lần sau khi component mount
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=-20pCt6lFkYxAZTDQb3cwaFDtUcYplpAiCk1x1HKaS3ngUY3EkHA0V-EzTNz-XyDyeZxsVUaLyeEhx8DqISQDMAUmI2-HiHbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHuFFYjDWkkMrYpJ2zzkpEpBVzvwxOkliXdC7QcnYWbhaE84BSjNDTErJkBs8TsxCshloYGBeBNBrGardF1NZVKZkImz23Yb1A&lib=Mn6a554qa580A8iQJ8pLI1y6jZtVphQAW"
        );
        const result = await response.json();
        // Kiểm tra dữ liệu ở đây
        if (!result.error) {
          let data = result.data;
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            const item = data[i];
            let date_banking = item["Ngày diễn ra"].split(" ")[0];
            let description = item["Mô tả"];
            if (
              date_banking === currentDateString &&
              description.includes(codeBanking)
            ) {
              console.log("cộng tiền");
              let money = item["Giá trị"];
              axiosPrivate.get(
                `/api/publicMoney?money=${money}&codeBanking=${codeBanking}`
              );
              clearInterval(interval); // Dừng gọi API nếu dữ liệu thỏa mãn
              setResult({
                isOpenModal: true,
                statusModal: "success",
                title: "Nạp tiền thành công",
                subTitle: null,
              });
              setTimeout(() => handleclickModal(), 4000);
              break;
            }
          }
        }
      } catch (error) {
        messageApi.error("Kiểm tra thanh toán không thành công!!!");
        clearInterval(interval); // Dừng gọi API nếu dữ liệu thỏa mãn
      }
    };

    const interval = setInterval(fetchData, 5000); // Gọi API sau mỗi 5 giây

    return () => clearInterval(interval); // Hàm cleanup để dừng interval khi component unmount
  }, []);
  const handleclickModal = () => {
    navigate("/history-deposit");
  };
  function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  // const hanleBankingClick = () => {
  //   fetch(
  //     "https://script.google.com/macros/s/AKfycbzwer4rpuceUuTPWK4wlblVymvDk74G-P6jVNQmrORZzPa7UYcyvynMdAiIginG_Edv9w/exec"
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Process the retrieved user data
  //       console.log("data:", data);
  //       setIsBankingOk(true);
  //     })
  //     .catch((error) => {
  //       messageApi.error(error);
  //     });
  // };
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
              Qúy khách vui lòng nạp tiền trong khoảng thời gian. Nếu hết thời
              gian, vui lòng làm mới trang để tải lại !!
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
              <Spin tip="Đang xử lí..." size="large" spinning={true}>
                <Alert
                  className={cx("process-banking")}
                  message="Đang kiểm tra thanh toán"
                  description="Vui lòng đợi trong giây lát..."
                  type="info"
                />
              </Spin>
              <div className={cx("timmer")}>
                Thời gian còn lại: {minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </div>
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
                    <span>{codeBanking}</span>
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
                      Sau khi quý khách chuyển tiền. Hệ thống sẽ kiểm tra tự
                      động và cộng tiền vào tài khoản của bạn trong giây lát.
                      Nếu có lỗi xảy ra vui lòng liên hệ admin để được hỗ trợ.
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
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Kết quả giao dịch"
        open={result.isOpenModal}
        onOk={() => handleclickModal()}
        onCancel={() => handleclickModal()}
      >
        <Result
          status={result.statusModal}
          title={result.title || "Successfully Payment "}
          subTitle={result.subTitle}
        />
      </Modal>
      <FooterPage fix="true" />
    </>
  );
}
export default Banking;
