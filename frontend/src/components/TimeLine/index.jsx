import "src/components/TimeLine/TimeLine.css";
import Post from "src/components/Post";
import Share from "src/components/Share";
import useTimeline from "src/hooks/Timeline/useTimeLine";

const TimeLine = ({ username }) => {
  const { posts, setPosts, user } = useTimeline(username);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        {user.username === username || !username ? <Share /> : null}
        {posts.map((post) => (
          <Post
            post={post}
            setPosts={setPosts}
            key={post._id}
            username={username}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
