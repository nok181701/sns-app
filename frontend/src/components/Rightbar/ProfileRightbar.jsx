import "src/components/Rightbar/ProfileRightbar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/state/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileRightbar = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [, setprofileUser] = useState([]);
  const { username } = useParams(); //paramのuserName
  const [friends, setFriends] = useState([]);

  const findFriends = async (user) => {
    const { followers, followings } = user || {};
    if (followers && followings) {
      const includeFriends = followers.filter((friend) =>
        followings.includes(friend)
      );
      try {
        const friendResponse = await axios.get("/users", {
          params: {
            userIds: includeFriends,
          },
        });
        const friendsData = friendResponse.data;
        setFriends([...friendsData]);
        return friendsData;
      } catch (err) {
        console.error("Failed to fetch friends:", err);
        return [];
      }
    }
    return [];
  };
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users`, {
          params: {
            username: username,
          },
        });
        if (isMounted) {
          setprofileUser(response.data);
          findFriends(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [username]);
  return (
    <>
      <h4 className="rightbarTitle">ユーザー情報</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">出身:</span>
          <span className="rightbarInfoKey">{user.city}</span>
        </div>
        <h4 className="rightbarTitle">あなたのお友達</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
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
