import "src/components/Post/Post.css";
import axios from "axios";
import LongMenu from "src/components/Post/LongMenu";
import { useCallback, useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { AuthContext } from "src/state/AuthContext";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const Post = ({ post, setPosts, username }) => {
  const apiUrl =
    process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_ENDPOINT_DEV;
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({}); // 投稿したuser
  const { user: currentUser } = useContext(AuthContext); // ログインしているユーザー

  const handleLike = useCallback(async () => {
    try {
      await axios.put(`${apiUrl}/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
      setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (err) {
      console.log(err);
    }
  }, [isLiked, currentUser._id, post._id, apiUrl]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/${post.userId}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [post.userId, apiUrl]);

  const memoizedFetchUser = useMemo(() => fetchUser, [fetchUser]);

  useEffect(() => {
    memoizedFetchUser();
  }, [post.userId, apiUrl, memoizedFetchUser]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? `${PUBLIC_FOLDER}/${user.profilePicture}`
                    : `${PUBLIC_FOLDER}/person/noAvatar.png`
                }
                alt="プロフィール画像"
                className="postProfileImg"
              />
            </Link>
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
            src={post.img ? `${PUBLIC_FOLDER}/${post.img}` : ""}
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PUBLIC_FOLDER}/heart.png`}
              alt="いいね"
              className="likeIkon"
              onClick={handleLike}
            />
            <span className="postLikeCounter">{`${like}人がいいねしました`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
