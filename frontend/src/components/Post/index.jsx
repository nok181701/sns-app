import "src/components/Post/Post.css";
import axios from "axios";
import LongMenu from "src/components/Post/LongMenu";
import { useCallback, useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { AuthContext } from "src/state/AuthContext";

const Post = ({ post, setPosts, username }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({}); //投稿したuser
  const { user: currentUser } = useContext(AuthContext); //ログインしているユーザー

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = useCallback(async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
    setIsLiked(!isLiked);
  }, [isLiked, currentUser._id, post._id]);

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + "/" + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt="プロフィール画像"
                className="postProfileImg"
              />
              <span className="postuserName">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <span className="postTopRight">
              <LongMenu post={post} setPosts={setPosts} username={username} />
            </span>
          </div>
          <div className="postCenter">
            <span className="posText">{post.desc}</span>
            <img
              src={post.img ? PUBLIC_FOLDER + post.img : ""}
              alt=""
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
