const CloseFriend = ({ user }) => {
  const { profilePicture, username } = user;
  return (
    <>
      <li className="sidebarFriend">
        <img
          src={profilePicture}
          alt="友達のアイコン"
          className="sidebarFriendImg"
        />
        <span className="sidebarFriendName">{username}</span>
      </li>
    </>
  );
};

export default CloseFriend;
