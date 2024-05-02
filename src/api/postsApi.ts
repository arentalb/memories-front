import axios from "axios";
import { PostBase } from "../types/TPost.ts";

const url = "http://localhost:6060/posts";

async function fetchPosts() {
  const response = await axios.get(url);
  return response.data;
}

async function createPost(newPost: PostBase) {
  const response = await axios.post(url, newPost);
  return response.data;
}

export { fetchPosts, createPost };
