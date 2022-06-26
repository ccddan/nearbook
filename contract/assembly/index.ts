import {
  context,
  logging,
} from 'near-sdk-as';

import {
  Message,
  MessageCreatePayload,
  Post,
  PostCreatePayload,
} from './models';
import {
  MESSAGES_BY_POST_ID,
  POST_OWNER,
  POSTS,
  POSTS_BY_ACCOUNT_ID,
} from './store';

export function createPost(payload: PostCreatePayload): Post {
  let post = new Post(payload);

  logging.log("validate if post uuid exists");
  assert(!POST_OWNER.get(post.uuid), "Post already exists");

  logging.log("storing new post's owner");
  POST_OWNER.set(post.uuid, context.sender);
  logging.log("post's owner saved");

  const accountPosts = POSTS_BY_ACCOUNT_ID.get(context.sender, []);

  logging.log("updating account's posts");
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

export function deletePost(uuid: string): bool {
  assert(POST_OWNER.get(uuid) == context.sender, "Forbidden");

  POST_OWNER.delete(uuid);

  let accountPosts = POSTS_BY_ACCOUNT_ID.get(context.sender, []);
  const idx = accountPosts!.indexOf(uuid);

  if (idx != -1) {
    accountPosts = accountPosts!.splice(idx, 1);
  }

  POSTS.delete(uuid);

  if (MESSAGES_BY_POST_ID.get(uuid)) {
    MESSAGES_BY_POST_ID.delete(uuid);
  }

  return true;
}

export function totalPosts(): u64 {
  return POSTS.length;
}

export function listPosts(idx: i32 = 0, limit: i32 = 10): Post[] {
  let result: Post[] = [];

  if (idx < POSTS.length) {
    let end = idx + limit < POSTS.length ? idx + limit : POSTS.length;
    return POSTS.values(idx, end);
  }

  return result;
}

export function likePost(uuid: string): boolean {
  const post = getPost(uuid);
  assert(post, "Not found");
  post!.likes = post!.likes + 1;
  POSTS.set(post!.uuid, post!);

  return true;
}

export function dislikePost(uuid: string): boolean {
  const post = getPost(uuid);
  assert(post, "Not found");
  post!.dislikes = post!.dislikes + 1;
  POSTS.set(post!.uuid, post!);

  return true;
}

export function createMessage(payload: MessageCreatePayload): Message {
  const post = getPost(payload.post);
  assert(post, "Not found");
  const message = new Message(payload);

  const postMessages = MESSAGES_BY_POST_ID.get(message.post, []);
  postMessages!.push(message);

  post!.totalMessages = post!.totalMessages + 1;

  POSTS.set(message.post, post!);
  MESSAGES_BY_POST_ID.set(message.post, postMessages!);

  return message;
}

export function fetchMessages(
  post: string,
  idx: i32 = 0,
  limit: i32 = 10
): Message[] {
  let messages: Message[] = MESSAGES_BY_POST_ID.get(post, [])!;

  if (idx < messages.length) {
    let end = idx + limit < POSTS.length ? idx + limit : messages.length;
    return messages.slice(idx, end);
  }

  return messages;
}
