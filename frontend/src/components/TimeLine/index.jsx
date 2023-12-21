import "src/components/TimeLine/TimeLine.css";
import Post from "src/components/Post";
import Share from "src/components/Share";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/state/AuthContext";

const TimeLine = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const response = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);

      const sortedPosts = response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
      setPosts(sortedPosts);
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <>
      <div className="timeline">
        <div className="timelineWrapper">
          {user.username === username || username === undefined ? (
            <Share />
          ) : null}
          {posts.map((post) => {
            return (
              <Post
                post={post}
                setPosts={setPosts}
                key={post._id}
                username={username}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default TimeLine;
