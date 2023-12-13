import Rirhtbar from "src/components/Rirhtbar/Rirhtbar";
import Sidebar from "src/components/Sidebar";
import TimeLine from "src/components/TimeLine";
import Topbar from "src/components/Topbar";
import "./Home.css";
const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <TimeLine />
        <Rirhtbar />
      </div>
    </>
  );
};

export default Home;
