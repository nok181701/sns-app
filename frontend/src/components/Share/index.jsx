import "src/components/Share/Share.css";
import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "src/state/AuthContext";
import axios from "axios";

const SHAREOPTIONS = [
  {
    img: () => <Image htmlColor="#2c517c" />,
    text: "写真",
    color: "red",
    type: "file",
    id: "file",
    accept: ".png, .jpeg, .jpg",
  },
  { img: () => <Gif htmlColor="#a380c4" />, text: "Gif", color: "red" },
  { img: () => <Face htmlColor="#d69b85" />, text: "気持ち", color: "red" },
  { img: () => <Analytics htmlColor="#d98080" />, text: "投票", color: "red" },
];
const Share = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext); //ログインしているユーザー
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              src={
                user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : PUBLIC_FOLDER + "/person/noAvatar.png"
              }
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              className="shareInput"
              placeholder="今何してるの？"
              ref={desc}
            />
            <hr className="shareHr" />
          </div>
          <form className="shareButtons" onSubmit={handleSubmit}>
            <div className="shareOptions">
              {SHAREOPTIONS.map((option, index) => {
                const OptionImg = option.img;
                return (
                  <label className="shareOption" key={index} htmlFor="file">
                    {OptionImg && <OptionImg className="shareIcon" />}
                    <span className="shareOptionText">{option.text}</span>
                    {option.type === "file" && (
                      <input
                        type={option.type}
                        id={option.id}
                        accept={option.accept}
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    )}
                  </label>
                );
              })}
            </div>
            <button className="shareButton" type="submit">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Share;
