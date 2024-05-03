import axios from "axios";
import { PostBase } from "../types/TPost.ts";

const url = "http://localhost:6060/posts";

async function fetchPosts() {
  const response = await axios.get(url);
  return response.data.data;
}

async function createPost(newPost: PostBase) {
  const response = await axios.post(url, newPost);
  return response.data;
}

async function updatePost(obj: { selectedId: string; newPost: PostBase }) {
  const { selectedId, newPost } = obj;

  const response = await axios.patch(`${url}/${selectedId}`, newPost);
  return response.data;
}

async function fetchPostById(id: string) {
  const response = await axios.get(`${url}/${id}`);
  return response.data.data;
}

export { fetchPosts, createPost, updatePost, fetchPostById };
