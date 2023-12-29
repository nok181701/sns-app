import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "src/state/AuthContext";

const useTimeline = (username) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = username
          ? await axios.get(`/posts/profile/${username}`)
          : await axios.get(`/posts/timeline/${user._id}`);

        const sortedPosts = response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        });
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPost();
  }, [username, user._id]);

  return { posts, setPosts, user };
};

export default useTimeline;
