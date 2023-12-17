import HomeRightbar from "src/components/Rightbar/HomeRightbar";
import ProfileRightbar from "src/components/Rightbar/ProfileRightbar";
import "src/components/Rightbar/Rightbar.css";

const Rightbar = ({ user }) => {
  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    </>
  );
};

export default Rightbar;
