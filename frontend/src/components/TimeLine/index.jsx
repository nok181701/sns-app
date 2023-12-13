import Post from "src/components/Post";
import Share from "src/components/Share";
import "src/components/TimeLine/TimeLine.css";
const TimeLine = () => {
  return (
    <>
      <div className="timeline">
        <div className="timelineWrapper">
          <Share />
          <Post />
        </div>
      </div>
    </>
  );
};
export default TimeLine;
