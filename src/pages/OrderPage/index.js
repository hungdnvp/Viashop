import classNames from "classnames/bind";
import styles from "./OrderPage.module.scss";
import InfoAcc from "../../component/Account";
import PayMent from "../../component/PayMent";
import FooterPage from "../../component/FooterPage";
import { useState } from "react";

const cx = classNames.bind(styles);
function OrderPage() {
  const [amountFromPayMent, setAmountFromPayMent] = useState("1");

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
            <InfoAcc detail changeAmount={handleAmountFromPayMent} />
          </div>
          <div className={cx("right-content", "col-md-4", "col-sm-12")}>
            <PayMent
              p_name={"BM350 CỔ KHÁNG XMDT"}
              p_amount={amountFromPayMent}
              p_unitPrice={10000}
            />
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}
export default OrderPage;
