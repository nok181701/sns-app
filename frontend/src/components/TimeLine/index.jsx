import { useContext, useEffect, useState } from "react";
import Post from "src/components/Post";
import Share from "src/components/Share";
import "src/components/TimeLine/TimeLine.css";
import axios from "axios";
import { AuthContext } from "src/state/AuthContext";

const TimeLine = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const response = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);

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
