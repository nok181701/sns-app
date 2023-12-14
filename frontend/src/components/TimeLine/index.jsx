import Post from "src/components/Post";
import Share from "src/components/Share";
import "src/components/TimeLine/TimeLine.css";
import { Posts } from "src/dummyData";

const TimeLine = () => {
  return (
    <>
      <div className="timeline">
        <div className="timelineWrapper">
          <Share />
          {Posts.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
        </div>
      </div>
    </>
  );
};
export default TimeLine;
