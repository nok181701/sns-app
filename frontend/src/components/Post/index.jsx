import "src/components/Post/Post.css";
import axios from "axios";
import { MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const handleLike = () => {
    setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img
                  src={
                    user.profilePicture ||
                    PUBLIC_FOLDER + "/person/noAvatar.png"
                  }
                  alt="プロフィール画像"
                  className="postProfileImg"
                />
              </Link>
              <span className="postuserName">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <span className="postTopRight">
              <MoreVert />
            </span>
          </div>
          <div className="postCenter">
            <span className="posText">{post.desc}</span>
            <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
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
