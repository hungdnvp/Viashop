import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import BlockSearch from "../../../component/BlockSearch";
import GroupVia from "../../../component/GroupVia";

const cx = classNames.bind(styles);
function Home() {
  const [listGroup, setListGroup] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const fetchAllGroupVia = async () => {
    try {
      let response = await axiosPrivate.get("/api/getAllGroupVia");
      if (response?.status === 200) {
        const groupVias = response.data;
        // console.log(groupVias);
        setListGroup(groupVias);
      }
    } catch (e) {
      console.log("fetch group via err");
      console.log(e);
    }
  };
  useEffect(() => {
    fetchAllGroupVia();
  }, []);
  return (
    <main className={cx("main-container")}>
      <div className={cx("content")}>
        <BlockSearch />
        {listGroup &&
          listGroup.map((item, index) => {
            return (
              <GroupVia
                key={index}
                groupId={item.id}
                groupName={item.groupViaName}
              />
            );
          })}
      </div>
    </main>
  );
}
export default Home;
