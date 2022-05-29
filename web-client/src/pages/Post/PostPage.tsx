import {
  AnnotationIcon,
  ArrowCircleLeftIcon,
  RefreshIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  createMessage,
  dislikePost,
  fetchMessages,
  getPost,
  likePost,
} from "../../nearbook";

import DOMPurify from "dompurify";
import NewMessageForm from "../../components/NewMessageForm/NewMessageForm";
import { Post } from "./../../../../contract/assembly/models";
import { PostMessagesList } from "../../components/PostMessages";
import { marked } from "marked";

let window: any = Window;

export const PostPage = () => {
  const { uuid } = useParams();
  console.log("PostPage::uuid - ", uuid);

  const [post, setPost] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [parsedContent, setParsedContent] = useState("");
  const [likesCounter, setLikesCounter] = useState(0);
  const [dislikesCounter, setDislikesCounter] = useState(0);
  const [messagesCounter, setMessagesCounter] = useState(0);

  // Loaders
  const [likingPost, setLikingPost] = useState(false);
  const [dislikingPost, setDislikingPost] = useState(false);
  const [addingComment, setAddingComment] = useState(false);

  useEffect(() => {
    if (uuid && !post && window.walletConnection.isSignedIn()) {
      getPost(uuid).then((post: Post) => {
        console.log("post:", post);
        setPost(post);
        setLikesCounter(parseInt(post.likes));
        setDislikesCounter(parseInt(post.dislikes));
        setMessagesCounter(parseInt(post.totalMessages));

        DOMPurify.sanitize(
          marked.parse(post.content, (error: any, parseResult: string) => {
            setParsedContent(parseResult);
          })
        );
      });
    }

    if (post && post.uuid) {
      if (post.totalMessages > 0) {
        fetchMessages(post.uuid)
          .then((messages: any[]) => {
            setMessages(messages);
          })
          .catch((error: any) =>
            console.error("Cannot retrieve post messages:", error)
          );
      }
    }
  }, [uuid, post]);

  const likePostHandler = async () => {
    try {
      setLikingPost(true);
      console.log("Post has been liked:", await likePost(post.uuid));
      setLikesCounter(likesCounter + 1);
    } catch (error) {
      console.error("Failed to like post:", error);
    } finally {
      setLikingPost(false);
    }
  };
  const dislikePostHandler = async () => {
    try {
      setDislikingPost(true);
      console.log("Post has been disliked:", await dislikePost(post.uuid));
      setDislikesCounter(dislikesCounter + 1);
    } catch (error) {
      console.error("Failed to like post:", error);
    } finally {
      setDislikingPost(false);
    }
  };

  const onCreateNewComment = (comment: string) => {
    console.log("Sending new comment:", comment);
    return createMessage(post.uuid, comment).then((message: any) => {
      console.log("new message created:", message);
      setMessages([message, ...messages]);
      setMessagesCounter(messagesCounter + 1);
    });
  };

  return (
    <div className="container block overflow-hidden m-auto py-5">
      <p className="pb-10 text-shadow">
        <Link to=".." className="flex items-start">
          <ArrowCircleLeftIcon
            width={25}
            height={25}
            className="mr-1 color-secondary"
          />{" "}
          Back to Posts
        </Link>
      </p>

      {!!post && (
        <div className="container block overflow-hidden rounded-2xl m-auto bg-dark border-gray border-[1px] pb-6">
          <div>
            <img
              className="object-cover w-full"
              src={post.cover}
              alt={post.title}
            />

            <div className="p-4 bg-gray-900">
              <p className="text-md text-gray-500 mb-10">
                by <b className="color-primary">{post.author}</b>,{" "}
                <span className="text-sm">
                  {new Date(+post.createdAt / 1000000).toString()}
                </span>
              </p>

              <h1 className="text-xl text-white">{post.title}</h1>

              <div
                className="mt-1 text-md text-gray-500"
                dangerouslySetInnerHTML={{ __html: `${parsedContent}` }}
              ></div>
            </div>
          </div>
          <div className="m-10">
            <div className="inline-flex items-center -space-x-px text-xs rounded-md">
              <button
                className="px-5 py-3 font-medium border rounded-l-md flex items-center hover:bg-secondary"
                type="button"
                onClick={likePostHandler}
                disabled={likingPost}
              >
                {!likingPost && (
                  <>
                    <ThumbUpIcon className="mr-2" width={15} height={15} />
                    <span>{likesCounter}</span>
                  </>
                )}
                {!!likingPost && (
                  <RefreshIcon
                    width={19}
                    height={19}
                    className="loading-icon"
                  />
                )}
              </button>

              <button
                className="px-5 py-3 font-medium border flex items-center hover:bg-secondary"
                type="button"
                onClick={dislikePostHandler}
                disabled={dislikingPost}
              >
                {!dislikingPost && (
                  <>
                    <ThumbDownIcon className="mr-2" width={15} height={15} />
                    <span>{dislikesCounter}</span>
                  </>
                )}
                {!!dislikingPost && (
                  <RefreshIcon
                    width={19}
                    height={19}
                    className="loading-icon"
                  />
                )}
              </button>

              <div className="px-5 py-3 font-medium border rounded-r-md flex items-center">
                <AnnotationIcon className="mr-2" width={15} height={15} />
                <span>{messagesCounter}</span>
              </div>
            </div>
          </div>
          <hr className="max-w-[85%] m-auto" />
          <div className="container block overflow-hidden m-auto bg-dark pt-8 px-4">
            <NewMessageForm onSubmitHandler={onCreateNewComment} />
          </div>
          <PostMessagesList messages={messages} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
