import { MoreVert } from "@mui/icons-material";
import { Users } from "src/dummyData";
import "src/components/Post/Post.css";

const Post = ({ post }) => {
  const matchingUsers = Users.filter((user) => user.id === post.id);
  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                src={
                  matchingUsers.length > 0
                    ? matchingUsers[0].profilePicture
                    : "Unknown"
                }
                alt="プロフィール画像"
                className="postProfileImg"
              />
              <span className="postuserName">
                {matchingUsers.length > 0
                  ? matchingUsers[0].username
                  : "Unknown"}
              </span>
              <span className="postDate">{post.date}</span>
            </div>
            <span className="postTopRight">
              <MoreVert />
            </span>
          </div>
          <div className="postCenter">
            <span className="posText">{post.desc}</span>
            <img src={post.photo} alt="投稿写真" className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img src="/assets/heart.png" alt="いいね" className="likeIkon" />
              <span className="postLikeCounter">{`${post.like}人がいいねしました`}</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommenText">{`${post.comment}コメント`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
