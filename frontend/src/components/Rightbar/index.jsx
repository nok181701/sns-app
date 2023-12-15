import HomeRightbar from "src/components/Rightbar/HomeRightbar";
import ProfileRightbar from "src/components/Rightbar/ProfileRightbar";
import "src/components/Rightbar/Rightbar.css";

const Rightbar = ({ profile }) => {
  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          {profile ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    </>
  );
};

export default Rightbar;
