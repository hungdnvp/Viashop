import Header from "../DefaultLayout/Header";
import styles from "./LayoutHeaderOnly.module.scss";
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
function LayoutHeaderOnly({ children }) {
    return (
        <div>
            <Header transparent={true} />
            <div className={cx("wrapper")}>
                <div className={cx("content")}> {children} </div>
            </div>
        </div>
    )
}
export default LayoutHeaderOnly;