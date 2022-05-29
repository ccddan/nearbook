import { Message, Post } from "./models";

import { PersistentUnorderedMap } from "near-sdk-as";

// <postUuid, accountId>
export const POST_OWNER = new PersistentUnorderedMap<string, string>("NB_PO");

// <accountId, Post[]>
export const POSTS_BY_ACCOUNT_ID = new PersistentUnorderedMap<string, string[]>(
  "NB_PBAI"
);

// <postUuid, Post>
export const POSTS = new PersistentUnorderedMap<string, Post>("NB_P");

// postUuid, Message[]
export const MESSAGES_BY_POST_ID = new PersistentUnorderedMap<
  string,
  Message[]
>("NB_MBPI");
