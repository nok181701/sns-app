import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "src/components/Topbar";
import Sidebar from "src/components/Sidebar";
import TimeLine from "src/components/TimeLine";
import Rirhtbar from "src/components/Rightbar";
import { AuthContext } from "src/state/AuthContext";
import "src/pages/Profile/Profile.css";
import ProfileInfo from "src/components/Profile/ProfileInfo";

const Profile = () => {
  const apiUrl =
    process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_ENDPOINT_DEV;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [followingsCount, setFollowingsCount] = useState(
    currentUser.followings.length
  );
  const [followersCount] = useState(currentUser.followers.length);
  const [isFollow, setIsFollow] = useState(currentUser.isFollow);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`, {
          params: {
            username: username,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [username, followingsCount, followersCount, currentUser, apiUrl]);

  useEffect(() => {
    const storedDataString = localStorage.getItem("user") || "{}";
    const storedData = JSON.parse(storedDataString);

    const newIsFollowValue = currentUser.followings.includes(user._id);
    setIsFollow(newIsFollowValue);

    storedData.isFollow = newIsFollowValue;
    localStorage.setItem("user", JSON.stringify(storedData));
  }, [currentUser.followings, user._id]);

  const follow = async () => {
    try {
      const response = await axios.put(`${apiUrl}/users/${user._id}/follow`, {
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
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar profile />
        <div className="profileRight">
          <ProfileInfo
            user={user}
            currentUser={currentUser}
            follow={follow}
            followingsCount={followingsCount}
            followersCount={followersCount}
            isFollow={isFollow}
          />
          <div className="profileRightBottom">
            <TimeLine username={username} />
            <Rirhtbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
