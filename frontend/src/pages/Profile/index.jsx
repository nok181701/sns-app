import React from "react";
import Rirhtbar from "src/components/Rightbar";
import Sidebar from "src/components/Sidebar";
import TimeLine from "src/components/TimeLine";
import Topbar from "src/components/Topbar";
import "src/pages/Profile/Profile.css";

const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={PUBLIC_FOLDER + "/post/3.jpeg"}
                alt="背景画像"
                className="profileCoverImg"
              />
              <img
                src={PUBLIC_FOLDER + "/person/6.jpeg"}
                alt="プロフィール画像"
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Iwai Naoki</h4>
              <span className="prfileInfoDesc">26歳、Webエンジニアです。</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username="IwaiNaoki" />
            <Rirhtbar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
