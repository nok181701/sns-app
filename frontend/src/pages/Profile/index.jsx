import "src/pages/Profile/Profile.css";
import Rirhtbar from "src/components/Rightbar";
import Sidebar from "src/components/Sidebar";
import TimeLine from "src/components/TimeLine";
import Topbar from "src/components/Topbar";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "src/state/AuthContext";

const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users`, {
        params: {
          username: username,
        },
      });
      setUser(response.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"}
                alt="背景画像"
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt="プロフィール画像"
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="prfileInfoDesc">{user.desc}</span>
              <div className="followWrapper">
                <span className="followings">{`フォロー：${currentUser.followings.length}`}</span>
                <span className="followers">{`フォロワー：${currentUser.followers.length}`}</span>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username={username} />
            <Rirhtbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
