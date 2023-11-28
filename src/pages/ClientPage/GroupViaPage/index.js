import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import styles from "../HomePage/HomePage.module.scss";
import classNames from "classnames/bind";
import BlockSearch from "../../../component/BlockSearch";
import GroupVia from "../../../component/GroupVia";

const cx = classNames.bind(styles);
function GroupViaPage() {
  const [groupViaName, setGroupViaName] = useState("");
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const groupViaId = location.pathname.match(/\/group-page\/(\d+)/)[1];
  useEffect(() => {
    const getGroupVia = async () => {
      try {
        let response = await axiosPrivate.get(
          `/api/getAllGroupVia?groupId=${groupViaId}`
        );
        // console.log(response);
        if (response?.status === 200) {
          const groupVia = response.data;
          setGroupViaName(groupVia.groupViaName);
        }
      } catch (e) {
        console.log("fetch group via err");
        console.log(e);
      }
    };
    console.log("ak");
    getGroupVia();
  }, [groupViaId]);
  return (
    <main className={cx("main-container")}>
      <div className={cx("content")}>
        <BlockSearch />
        <GroupVia groupId={groupViaId} groupName={groupViaName} />
      </div>
    </main>
  );
}
export default GroupViaPage;
