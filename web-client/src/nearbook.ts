import { v4 as uuid } from "uuid";

let window: any = Window;

export const createPost = async (
  title: string,
  cover: string,
  content: string
) => {
  console.log("Creating new post...");
  const payload = {
    uuid: uuid(),
    title,
    cover,
    content,
  };
  const post = await window.contract.createPost({ payload });
  console.log("post:", post);
  return post;
};

export const listPosts = async (start: number = 0, limit: number = 10) => {
  console.log("Listing all posts...");
  const posts = await window.contract.listPosts({ start, limit });
  console.log("posts:", posts);
  return posts;
};

export const getPost = async (uuid: string) => {
  console.log("Get post by id:", uuid);
  const post = await window.contract.getPost({ uuid });
  console.log("post:", post);
  return post;
};

export const likePost = async (uuid: string) => {
  return await window.contract.likePost({ uuid });
};

export const dislikePost = async (uuid: string) => {
  return await window.contract.dislikePost({ uuid });
};
