import classNames from "classnames/bind";
import styles from "./OrderPage.module.scss";
import InfoAcc from "../../component/Account";
import PayMent from "../../component/PayMent";
import FooterPage from "../../component/FooterPage";

const cx = classNames.bind(styles);
function OrderPage() {
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
            <InfoAcc detail />
          </div>
          <div className={cx("right-content", "col-md-4", "col-sm-12")}>
            <PayMent />
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}
export default OrderPage;
