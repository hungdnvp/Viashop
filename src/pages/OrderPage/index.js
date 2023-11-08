import classNames from "classnames/bind";
import styles from "./OrderPage.module.scss";
import InfoAcc from "../../component/Account";
import PayMent from "../../component/PayMent";
import FooterPage from "../../component/FooterPage";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button, Result } from "antd";

const cx = classNames.bind(styles);
function OrderPage() {
  const [amountFromPayMent, setAmountFromPayMent] = useState("1");
  const [result, setResult] = useState();
  const location = useLocation();
  const viaData = location.state?.via || {};
  const handleAmountFromPayMent = (data) => {
    setAmountFromPayMent(data);
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
              p_name={viaData?.nameVia || "undefined"}
              p_amount={amountFromPayMent}
              p_unitPrice={viaData?.price}
              resultPayment={setResult}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Giao dịch thành công"
        open={result?.isOpen || false}
        // onOk={() => handleEditVia()}
        onCancel={() => setResult(false)}
      >
        <Result
          status="error"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        />
      </Modal>
      <FooterPage />
    </>
  );
}
export default OrderPage;
