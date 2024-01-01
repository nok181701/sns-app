import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "src/state/AuthContext";

const useTimeline = (username) => {
  const apiUrl =
    process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_ENDPOINT_DEV;
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = username
          ? await axios.get(`${apiUrl}/posts/profile/${username}`)
          : await axios.get(`${apiUrl}/posts/timeline/${user._id}`);

        const sortedPosts = response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        });
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPost();
  }, [username, user._id, apiUrl]);

  return { posts, setPosts, user };
};

export default useTimeline;
