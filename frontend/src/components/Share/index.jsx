import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import "src/components/Share/Share.css";

const SHAREOPTIONS = [
  { img: () => <Image htmlColor="#2c517c" />, text: "写真", color: "red" },
  { img: () => <Gif htmlColor="#a380c4" />, text: "Gif", color: "red" },
  { img: () => <Face htmlColor="#d69b85" />, text: "気持ち", color: "red" },
  { img: () => <Analytics htmlColor="#d98080" />, text: "投票", color: "red" },
];
const Share = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              src={PUBLIC_FOLDER + "/person/noAvatar.png"}
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              className="shareInput"
              placeholder="今何してるの？"
            />
            <hr className="shareHr" />
          </div>
          <div className="shareButtons">
            <div className="shareOptions">
              {SHAREOPTIONS.map((option, index) => {
                const OptionImg = option.img;
                return (
                  <div className="shareOption" key={index}>
                    {OptionImg && <OptionImg className="shareIcon" />}
                    <span className="shareOptionText">{option.text}</span>
                  </div>
                );
              })}
            </div>
            <button className="shareButton">投稿</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Share;
