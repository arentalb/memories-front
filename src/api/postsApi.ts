import axios from "axios";

const url = "http://localhost:6060/posts";

async function fetchPosts() {
  const response = await axios.get(url);
  return response.data;
}

async function createPost(newPost) {
  const response = await axios.post(url, newPost);
  return response.data;
}

export { fetchPosts, createPost };
