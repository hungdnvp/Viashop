import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import BlockSearch from "../../component/BlockSearch";
import ListAccount from "../../component/ListAccount";
const cx = classNames.bind(styles);
function Home() {
  return (
    <main className={cx("main-container")}>
      <div className={cx("content")}>
        <BlockSearch />
        <ListAccount />
      </div>
    </main>
  );
}
export default Home;
