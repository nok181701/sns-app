import { MoreVert } from "@mui/icons-material";
import { Users } from "src/dummyData";
import "src/components/Post/Post.css";
import { useState } from "react";

const Post = ({ post }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const matchingUsers = Users.filter((user) => user.id === post.id);

  const handleLike = () => {
    setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                src={
                  matchingUsers.length > 0
                    ? PUBLIC_FOLDER + matchingUsers[0].profilePicture
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
            <img
              src={PUBLIC_FOLDER + post.photo}
              alt="投稿写真"
              className="postImg"
            />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                src={PUBLIC_FOLDER + "/heart.png"}
                alt="いいね"
                className="likeIkon"
                onClick={handleLike}
              />
              <span className="postLikeCounter">{`${like}人がいいねしました`}</span>
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
