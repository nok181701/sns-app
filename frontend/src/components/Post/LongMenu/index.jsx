import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { AuthContext } from "src/state/AuthContext";
import { useState } from "react";
import { useContext } from "react";

const OPTIONS = ["削除"];
const ITEM_HEIGHT = 48;

const LongMenu = ({ post, setPosts, username }) => {
  const apiUrl =
    process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_ENDPOINT_DEV;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user: currentUser } = useContext(AuthContext); //ログインしているユーザー

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    try {
      await axios.delete(`${apiUrl}/posts/${post._id}`, {
        headers: {
          "User-Id": currentUser._id,
        },
      });
      const response = username
        ? await axios.get(`${apiUrl}/posts/profile/${username}`)
        : await axios.get(`${apiUrl}/posts/timeline/${currentUser._id}`);
      const sortedPosts = response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
      setPosts(sortedPosts);
      alert("削除しました");
    } catch (err) {
      alert("自分の投稿のみ、削除できます。");
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
          component: Paper,
        }}
      >
        {OPTIONS.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleDelete}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LongMenu;
