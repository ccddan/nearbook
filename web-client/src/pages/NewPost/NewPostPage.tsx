import { ArrowCircleLeftIcon, RefreshIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import NewMessageForm from "../../components/NewMessageForm/NewMessageForm";
import { createPost } from "../../nearbook";

let window: any = Window;

export const NewPostPage = () => {
  const navigation = useNavigate();
  const [payload, setPayload] = useState<any>({
    title: "",
    cover: "",
    content: "",
  });

  // Loaders
  const [creatingPost, setCreatingPost] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setCreatingPost(true);
      const post = await createPost(
        payload.title,
        payload.cover,
        payload.content
      );
      console.log("new post:", post);
      navigation(`/posts/${post.uuid}`);
    } catch (error) {
      console.error("Failed to create new post:", error);
    } finally {
      setCreatingPost(false);
    }
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
      <section className="bg-dark rounded border-gray border-[1px]">
        <div className="max-w-full px-2 py-6 mx-auto md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-2 lg:max-w-[80%] m-auto">
            <div className="py-0 col-span-1">
              <p className="w-full text-2xl text-center">New Post</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-lg lg:p-12">
              <form action="#" className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Title"
                    type="text"
                    id="title"
                    minLength={5}
                    required
                    disabled={creatingPost}
                    onChange={(e) =>
                      setPayload({ ...payload, title: e.target.value.trim() })
                    }
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="cover">
                    Cover Image
                  </label>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Cover Image URL"
                    type="text"
                    id="cover"
                    minLength={10}
                    required
                    disabled={creatingPost}
                    onChange={(e) =>
                      setPayload({ ...payload, cover: e.target.value.trim() })
                    }
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="content">
                    Content
                  </label>
                  <textarea
                    className="w-full p-3 text-sm border-gray-200 rounded-lg bg-gray"
                    placeholder="Markdown Content"
                    rows={8}
                    id="content"
                    minLength={30}
                    required
                    disabled={creatingPost}
                    onChange={(e) =>
                      setPayload({ ...payload, content: e.target.value.trim() })
                    }
                  ></textarea>
                </div>
                <div className="mt-4 text-center">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-3 text-white rounded-lg bg-secondary m-auto"
                    disabled={creatingPost}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("payload:", payload);
                      onSubmitHandler();
                    }}
                  >
                    {!creatingPost && "Create"}
                    {!!creatingPost && (
                      <RefreshIcon
                        width={19}
                        height={19}
                        className="m-auto loading-icon"
                      />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewPostPage;
