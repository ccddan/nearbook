import { Context, context, logging, storage } from "near-sdk-as";
import { POSTS, POSTS_BY_ACCOUNT_ID, POST_OWNER } from "./store";
import { Post, PostCreatePayload } from "./models";

export function createPost(payload: PostCreatePayload): Post {
  let post = new Post(payload);

  logging.log("validate if post uuid exists");
  if (POST_OWNER.get(post.uuid)) {
    throw new Error("Post already exists");
  }

  logging.log("storing new post's owner");
  POST_OWNER.set(post.uuid, context.sender);
  logging.log("post's owner saved");

  if (!POSTS_BY_ACCOUNT_ID.get(context.sender)) {
    POSTS_BY_ACCOUNT_ID.set(context.sender, []);
  }

  logging.log("updating account's posts");
  const accountPosts = POSTS_BY_ACCOUNT_ID.get(context.sender);
  accountPosts!.push(post.uuid);
  POSTS_BY_ACCOUNT_ID.get(context.sender, accountPosts);
  logging.log("account's posts updated");

  logging.log("storing post");
  POSTS.set(post.uuid, post);
  logging.log("post stored");

  return post;
}

export function getPost(uuid: string): Post | null {
  return POSTS.get(uuid);
}

export function totalPosts(): u64 {
  return POSTS.values().length;
}

export function listPosts(idx: i32 = 0, limit: i32 = 10): Post[] {
  let result: Post[] = [];

  if (idx < POSTS.length) {
    let end = idx + limit < POSTS.length ? idx + limit : POSTS.length;
    return POSTS.values(idx, end);
  }

  return result;
}
