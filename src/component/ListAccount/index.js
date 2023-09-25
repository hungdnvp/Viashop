import styles from "./ListAccount.module.scss";
import classNames from "classnames/bind";
import InfoAcc from "../Account";

const cx = classNames.bind(styles);
function ListAccount() {
  return (
    <section className={cx("section-theme")}>
      <div className={cx("section-header")}>
        <h3 className={cx("section-title")}>Via Việt Nam</h3>
      </div>
      <div className={cx("section-content")}>
        <div className={cx("block-acc")}>
          <InfoAcc />
          <InfoAcc />
          <InfoAcc />
          <InfoAcc />
          <InfoAcc />
        </div>
      </div>
    </section>
  );
}
export default ListAccount;
