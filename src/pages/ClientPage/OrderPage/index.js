import classNames from "classnames/bind";
import styles from "./OrderPage.module.scss";
import InfoAcc from "../../../component/Account";
import PayMent from "../../../component/PayMent";
import FooterPage from "../../../component/FooterPage";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Result } from "antd";

const cx = classNames.bind(styles);
function OrderPage() {
  const [amountFromPayMent, setAmountFromPayMent] = useState(0);
  const [result, setResult] = useState({
    isOpenModal: false,
    statusModal: "error",
    title: null,
    subTitle: null,
  }); // ket qua giao dich
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [viaData, setViaData] = useState(location.state?.via || {});

  const handleAmountFromPayMent = (data) => {
    setAmountFromPayMent(data);
  };
  const handleclickModal = async (type) => {
    if (type === "onOk") {
      navigate("/history-transaction");
    } else {
      try {
        let response = await axiosPrivate.get(
          `/api/getViaInfor?idVia=${viaData.id}`
        );
        if (response.status === 200) {
          let via_Old = response.data?.data;
          console.log("response via after buy", via_Old);
          setViaData(via_Old);
        }
      } catch (e) {
        console.log("err get VIa after buy");
      }
    }
    setResult((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("padding-header")}>
          <div className={cx("heading-order")}>
            <h4 className={cx("title-order")}>
              Thông tin mua hàng và thanh toán
            </h4>
          </div>
        </div>
        <div className={cx("block-content")}>
          <div className={cx("left-content", "col-md-8", "col-sm-12")}>
            <InfoAcc
              detail
              changeAmount={handleAmountFromPayMent}
              data={viaData}
            />
          </div>
          <div className={cx("right-content", "col-md-4", "col-sm-12")}>
            <PayMent
              via={viaData}
              p_amount={amountFromPayMent}
              resultPayment={setResult}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Kết quả giao dịch"
        open={result.isOpenModal}
        onOk={() => handleclickModal("onOk")}
        onCancel={() => handleclickModal("onCancel")}
      >
        <Result
          status={result.statusModal}
          title={result.title || "Successfully Purchased "}
          subTitle={result.subTitle}
        />
      </Modal>
      <FooterPage />
    </>
  );
}
export default OrderPage;
