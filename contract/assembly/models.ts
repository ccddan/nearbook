import { PersistentUnorderedMap, PersistentVector, context } from "near-sdk-as";

@nearBindgen
export class MessageCreatePayload {
  uuid: string;
  post: string;
  content: string;
}

@nearBindgen
export class Message {
  uuid: string;
  post: string;
  author: string;
  content: string;
  likes: u64;
  dislikes: u64;
  createdAt: u64;

  constructor(payload: MessageCreatePayload) {
    this.uuid = payload.uuid;
    this.post = payload.post;
    this.author = context.sender;
    this.content = payload.content;
    this.likes = 0;
    this.dislikes = 0;
    this.createdAt = context.blockTimestamp;
  }
}

@nearBindgen
export class PostCreatePayload {
  uuid: string;
  content: string;
}

@nearBindgen
export class Post {
  uuid: string;
  author: string;
  content: string;
  likes: u64;
  dislikes: u64;
  totalMessage: u64;
  createdAt: u64;

  constructor(payload: PostCreatePayload) {
    this.uuid = payload.uuid;
    this.author = context.sender;
    this.content = payload.content;
    this.likes = 0;
    this.dislikes = 0;
    this.totalMessage = 0;
    this.createdAt = context.blockTimestamp;
  }
}
