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
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [followingsCount, setFollowingsCount] = useState(
    currentUser.followings.length
  );
  const [followersCount] = useState(currentUser.followers.length);
  const [isFollow, setIsFollow] = useState(currentUser.isFollow);

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
  }, [username, followingsCount, followersCount, currentUser]);

  useEffect(() => {
    if (currentUser.followings.includes(user._id)) {
      const storedDataString = localStorage.getItem("user");
      const storedData = JSON.parse(storedDataString) || {};

      const newIsFollowValue = currentUser.followings.includes(user._id);
      setIsFollow(newIsFollowValue);

      storedData.isFollow = newIsFollowValue;
      localStorage.setItem("user", JSON.stringify(storedData));
    }
    return;
  }, [currentUser.followings, user._id]);

  const follow = async () => {
    try {
      const response = await axios.put(`/users/${user._id}/follow`, {
        userId: currentUser._id,
      });
      const updatedUser = response.data;
      dispatch(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setFollowingsCount((prevState) => prevState + 1);
      alert("フォローしました");
      window.location.reload();
      setIsFollow((prevState) => {
        const newFollowState = !prevState;
        localStorage.setItem(
          "user",
          JSON.stringify({ ...updatedUser, isFollow: newFollowState })
        );
        return newFollowState;
      });
      return response;
    } catch (e) {
      console.log("既にフォローしています。");
    }
  };

  return (
    <>
      <div>
        <Topbar />
        <div className="profile">
          <Sidebar profile />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  src={
                    user.coverPicture || PUBLIC_FOLDER + "/post/default.jpeg"
                  }
                  alt="背景画像"
                  className="profileCoverImg"
                />
                <img
                  src={
                    user.profilePicture
                      ? PUBLIC_FOLDER + "/" + user.profilePicture
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
                  <span className="followings">
                    {currentUser.username === user.username
                      ? `フォロー：${followingsCount}`
                      : `フォロー：${
                          Array.isArray(user.followings)
                            ? user.followings.length
                            : 0
                        }`}
                  </span>
                  <span className="followers">
                    {currentUser.username === user.username
                      ? `フォロワー：${followersCount}`
                      : `フォロワー：${
                          Array.isArray(user.followers)
                            ? user.followers.length
                            : 0
                        }`}
                  </span>
                </div>
                {currentUser.username !== username ? (
                  <button onClick={follow} className="followButton">
                    {isFollow ? (
                      <p className="followButtonText">フォロー中</p>
                    ) : (
                      <p className="followButtonText">フォローする</p>
                    )}
                  </button>
                ) : null}
              </div>
            </div>
            <div className="profileRightBottom">
              <TimeLine username={username} />
              <Rirhtbar user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
