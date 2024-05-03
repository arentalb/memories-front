import axios from "axios";
import { PostBase } from "../types/TPost.ts";

const url = "http://localhost:6060/posts";

//https://axios-http.com/docs/res_schema
async function fetchPosts() {
  const response = await axios.get(url);
  return response.data.data;
}

async function createPost(newPost: PostBase) {
  const response = await axios.post(url, newPost);
  return response.data.data;
}

async function updatePost(obj: { selectedId: string; newPost: PostBase }) {
  const { selectedId, newPost } = obj;

  const response = await axios.patch(`${url}/${selectedId}`, newPost);
  return response.data.data;
}

async function fetchPostById(id: string | null) {
  if (id === null) return null;
  const response = await axios.get(`${url}/${id}`);
  return response.data.data;
}

export { fetchPosts, createPost, updatePost, fetchPostById };
