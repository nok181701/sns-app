import "src/components/Sidebar/Sidebar.css";
import CloseFriend from "src/components/CloseFriend";
import {
  Bookmark,
  Home,
  MessageRounded,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Users } from "src/dummyData";
import { AuthContext } from "src/state/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const SIDEBARLISTITEM = [
    {
      icon: () => <Home />,
      link: "/",
      text: "ホーム",
    },
    {
      icon: () => <Search />,
      text: "検索",
    },
    {
      icon: () => <Notifications />,
      link: "/",
      text: "通知",
    },
    {
      icon: () => <MessageRounded />,
      link: "/",
      text: "メッセージ",
    },
    {
      icon: () => <Bookmark />,
      link: "/",
      text: "ブックマーク",
    },
    {
      icon: () => <Person />,
      link: `/profile/${user.username}`,
      text: "プロフィール",
    },
    {
      icon: () => <Settings />,
      link: "/",
      text: "設定",
    },
  ];

  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            {SIDEBARLISTITEM.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li className="sidebarListItem" key={index}>
                  {IconComponent && <IconComponent className="sidebarIcon" />}
                  <Link
                    to={item.link}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span className="sidebarListItemText">{item.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <hr className="sidebarHr" />
          <h4 className="sidebarFriendTitle">フォローしてみませんか？</h4>
          <ul className="sidebarFriendList">
            {Users.map((user) => {
              return <CloseFriend user={user} key={user.id} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
