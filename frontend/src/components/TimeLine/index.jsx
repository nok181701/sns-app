import { useEffect, useState } from "react";
import Post from "src/components/Post";
import Share from "src/components/Share";
import "src/components/TimeLine/TimeLine.css";
import axios from "axios";

const TimeLine = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = username
        ? something //後で修正
        : await axios.get("/posts/timeline/6576cd23aaededceb032c094");
      setPosts(response.data);
    };
    fetchPost();
  }, []);

  return (
    <>
      <div className="timeline">
        <div className="timelineWrapper">
          <Share />
          {posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
      </div>
    </>
  );
};
export default TimeLine;
