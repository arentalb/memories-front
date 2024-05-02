import axios from "axios";

const url = "http://localhost:6060/posts";

const fetchPosts = async () => {
  const response = await axios.get(url);
  return response.data;
};
export { fetchPosts };
