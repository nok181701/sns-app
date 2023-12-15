import "src/components/Rightbar/ProfileRightbar.css";
const ProfileRightbar = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <h4 className="rightbarTitle">ユーザー情報</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">出身:</span>
          <span className="rightbarInfoKey">東京</span>
        </div>
        <h4 className="rightbarTitle">あなたの友達</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={PUBLIC_FOLDER + "/person/1.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">ShinCode</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PUBLIC_FOLDER + "/person/2.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Yamaki</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PUBLIC_FOLDER + "/person/3.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Koga</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PUBLIC_FOLDER + "/person/4.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Matukubo</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileRightbar;
