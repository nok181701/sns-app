import Rirhtbar from "src/components/Rightbar";
import Sidebar from "src/components/Sidebar";
import TimeLine from "src/components/TimeLine";
import Topbar from "src/components/Topbar";
import "src/pages/Home/Home.css";
const Home = () => {
  return (
    <>
      <Topbar home />
      <div className="homeContainer">
        <Sidebar />
        <TimeLine />
        <Rirhtbar />
      </div>
    </>
  );
};

export default Home;
