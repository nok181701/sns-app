import Online from "src/components/Online";
import "src/components/Rightbar/Rightbar.css";
import { Users } from "src/dummyData";

const Rirhtbar = () => {
  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="eventContainer">
            <img src="assets/star.png" alt="イベント" className="starImg" />
            <span className="eventText">
              <b>フォロワー</b>限定イベント開催中
            </span>
          </div>
          <img src="assets/ad.jpeg" alt="イベント画像" className="eventImg" />
          <h4 className="rightbarTitle">オンラインの友達</h4>
          <ul className="rightbarFriendList">
            {Users.map((user) => {
              return <Online user={user} key={user.id} />;
            })}
          </ul>
          <p className="promotionTitle">プロモーション広告</p>
          <img
            src="assets/promotion/promotion1.jpeg"
            alt="プロモーション画像 "
            className="rightbarPromotionImg"
          />
          <p className="promotionName">ショッピング</p>
          <img
            src="assets/promotion/promotion2.jpeg"
            alt="プロモーション画像 "
            className="rightbarPromotionImg"
          />
          <p className="promotionName">カーショップ</p>{" "}
          <img
            src="assets/promotion/promotion3.jpeg"
            alt="プロモーション画像 "
            className="rightbarPromotionImg"
          />
          <p className="promotionName">X株式会社</p>
        </div>
      </div>
    </>
  );
};

export default Rirhtbar;
