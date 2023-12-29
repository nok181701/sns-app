import React from "react";

const ProfileInfo = ({
  user,
  currentUser,
  follow,
  followingsCount,
  followersCount,
  isFollow,
}) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="profileRightTop">
      <div className="profileCover">
        <img
          src={
            user.coverPicture
              ? `${PUBLIC_FOLDER}/${user.coverPicture}`
              : `${PUBLIC_FOLDER}/post/default.jpeg`
          }
          alt="背景画像"
          className="profileCoverImg"
        />
        <img
          src={
            user.profilePicture
              ? `${PUBLIC_FOLDER}/${user.profilePicture}`
              : `${PUBLIC_FOLDER}/person/noAvatar.png`
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
            <span className="followings">
              フォロー：
              {currentUser.username === user.username
                ? followingsCount
                : user.followings?.length || 0}
            </span>
          </span>
          <span className="followers">
            フォロワー：
            {currentUser.username === user.username
              ? followersCount
              : user.followers?.length || 0}
          </span>
        </div>
        {currentUser.username !== user.username && (
          <button onClick={follow} className="followButton">
            <p className="followButtonText">
              {isFollow ? "フォロー中" : "フォローする"}
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
