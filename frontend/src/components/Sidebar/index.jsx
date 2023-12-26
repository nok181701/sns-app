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

const Sidebar = ({ profile }) => {
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
                <Link
                  to={item.link}
                  style={{ textDecoration: "none", color: "black" }}
                  key={index}
                >
                  <li className="sidebarListItem">
                    {IconComponent && <IconComponent className="sidebarIcon" />}

                    <span className="sidebarListItemText">{item.text}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
          <hr className="sidebarHr" />
          {!profile ? (
            <>
              <h4 className="sidebarFriendTitle">フォローしてみませんか？</h4>
              <ul className="sidebarFriendList">
                {Users.map((user) => {
                  return (
                    <Link
                      to={`/profile/${user.username}`}
                      className="sidebarFriendLinks"
                      key={user.id}
                    >
                      <CloseFriend user={user} />
                    </Link>
                  );
                })}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
