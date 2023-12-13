import { MoreVert } from "@mui/icons-material";
import "src/components/Post/Post.css";
const Post = () => {
  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                src="/assets/person/6.jpeg"
                alt="プロフィール画像"
                className="postProfileImg"
              />
              <span className="postuserName">Naoki Iwai</span>
              <span className="postDate">５分前</span>
            </div>
            <span className="postTopRight">
              <MoreVert />
            </span>
          </div>
          <div className="postCenter">
            <span className="posText">SNSを自作中です...</span>
            <img src="/assets/post/1.jpeg" alt="投稿写真" className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img src="/assets/heart.png" alt="いいね" className="likeIkon" />
              <span className="postLikeCounter">5人がいいねしました</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommenText">4:コメント</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
