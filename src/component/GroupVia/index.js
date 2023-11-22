import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./GroupVia.module.scss";
import classNames from "classnames/bind";
import InfoAcc from "../Account";

const cx = classNames.bind(styles);
function GroupVia({ groupId, groupName }) {
  const [listVia, setListVia] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchVia = async () => {
      if (groupId) {
        try {
          let response = await axiosPrivate.post("/api/getVia", { groupId });
          if (response?.status === 200) {
            setListVia(response.data.data);
          }
        } catch (e) {
          console.log("fetch groupVia error");
        }
      }
    };
    fetchVia();
  }, [groupId]);
  return (
    <>
      {listVia.length > 0 ? (
        <section className={cx("section-theme")}>
          <div className={cx("section-header")}>
            <h3 className={cx("section-title")}>{groupName || "undefined"}</h3>
          </div>
          <div className={cx("section-content")}>
            <div className={cx("block-acc")}>
              {listVia &&
                listVia.map((item, index) => {
                  return <InfoAcc key={index} data={item} />;
                })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
export default GroupVia;
