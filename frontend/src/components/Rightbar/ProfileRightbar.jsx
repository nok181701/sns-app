import "src/components/Rightbar/ProfileRightbar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/state/AuthContext";
import axios from "axios";

const ProfileRightbar = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [closeFriends, setCloseFriends] = useState([]);

  useEffect(() => {
    const getCloseFriends = async () => {
      if (user.followers && user.followers.length > 0) {
        const closeFriendsPromises = user.followers.map(async (followerId) => {
          const response = await axios.get(`/users/${followerId}`);
          return response.data;
        });
        const friendsData = await Promise.all(closeFriendsPromises);
        setCloseFriends(friendsData);
      }
    };
    getCloseFriends();
  }, [user.followers]);

  return (
    <>
      <h4 className="rightbarTitle">ユーザー情報</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">出身:</span>
          <span className="rightbarInfoKey">{user.city}</span>
        </div>
        <h4 className="rightbarTitle">あなたをフォローしている人</h4>
        <div className="rightbarFollowings">
          {closeFriends.map((friend) => {
            return (
              <div key={friend._id} className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PUBLIC_FOLDER + "/" + friend.profilePicture
                      : PUBLIC_FOLDER + "/person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileRightbar;
