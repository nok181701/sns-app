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
          src={user.coverPicture || PUBLIC_FOLDER + "/post/default.jpeg"}
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
                  Array.isArray(user.followings) ? user.followings.length : 0
                }`}
          </span>
          <span className="followers">
            {currentUser.username === user.username
              ? `フォロワー：${followersCount}`
              : `フォロワー：${
                  Array.isArray(user.followers) ? user.followers.length : 0
                }`}
          </span>
        </div>
        {currentUser.username !== user.username ? (
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
  );
};

export default ProfileInfo;
