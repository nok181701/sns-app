const Online = ({ user }) => {
  const { profilePicture, username } = user;
  return (
    <>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img src={profilePicture} alt="友達" className="rightbarProfileImg" />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{username}</span>
      </li>
    </>
  );
};
export default Online;
