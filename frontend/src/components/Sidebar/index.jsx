import {
  Bookmark,
  Home,
  MessageRounded,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import CloseFriend from "src/components/CloseFriend";
import "src/components/Sidebar/Sidebar.css";
import { Users } from "src/dummyData";

const SIDEBARLISTITEM = [
  {
    icon: () => <Home />,
    text: "ホーム",
  },
  {
    icon: () => <Search />,
    text: "検索",
  },
  {
    icon: () => <Notifications />,
    text: "通知",
  },
  {
    icon: () => <MessageRounded />,
    text: "メッセージ",
  },
  {
    icon: () => <Bookmark />,
    text: "ブックマーク",
  },
  {
    icon: () => <Person />,
    text: "プロフィール",
  },
  {
    icon: () => <Settings />,
    text: "設定",
  },
];

const Sidebar = () => {
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
                  <span className="sidebarListItemText">{item.text}</span>
                </li>
              );
            })}
          </ul>
          <hr className="sidebarHr" />
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
