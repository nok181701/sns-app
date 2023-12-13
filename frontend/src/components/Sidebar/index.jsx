import {
  Bookmark,
  Home,
  MessageRounded,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import "src/components/Sidebar/Sidebar.css";

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
            <li className="sidebarFriend">
              <img
                src="/assets/person/2.jpeg"
                alt="友達のアイコン"
                className="sidebarFriendImg"
              />
              <span className="sidebarFriendName">Kevin</span>
            </li>
            <li className="sidebarFriend">
              <img
                src="/assets/person/3.jpeg"
                alt="友達のアイコン"
                className="sidebarFriendImg"
              />
              <span className="sidebarFriendName">Michael</span>
            </li>
            <li className="sidebarFriend">
              <img
                src="/assets/person/4.jpeg"
                alt="友達のアイコン"
                className="sidebarFriendImg"
              />
              <span className="sidebarFriendName">Billie</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
