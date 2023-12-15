const Online = ({ user }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { profilePicture, username } = user;
  return (
    <>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={PUBLIC_FOLDER + profilePicture}
            alt="友達"
            className="rightbarProfileImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{username}</span>
      </li>
    </>
  );
};
export default Online;
