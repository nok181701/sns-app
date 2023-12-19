import "./Topbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { Chat, Notifications, Search } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "src/state/AuthContext";
import { logoutCall } from "src/actionCalls";

const Topbar = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    // ローカルストレージからデータを削除
    localStorage.removeItem("user");
    localStorage.removeItem("user_timestamp");

    logoutCall(dispatch);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SNS-APP</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物は何ですか？"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : PUBLIC_FOLDER + "/person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
        <div className="logout" onClick={logout}>
          <p>ログアウト</p>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
