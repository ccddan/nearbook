import { useEffect, useState } from "react";

import DOMPurify from "dompurify";

interface PostMessageProps {
  message: any;
}

export const PostMessage = (props: PostMessageProps) => {
  const { message } = props;
  const [parsedContent, setParsedContent] = useState("...");

  useEffect(() => {
    try {
      setParsedContent(DOMPurify.sanitize(message.content));
    } catch (error) {
      console.error("Cannot sanitize message content:", error);
    }
  });

  return (
    <blockquote className="flex flex-col justify-between h-full p-8 bg-gray">
      <div>
        <div className="flex space-x-0.5 text-green-500">
          <span>{new Date(+message.createdAt / 1000000).toString()}</span>
        </div>

        <div className="mt-4">
          <p className="mt-4 text-gray-600">{parsedContent}</p>
        </div>
      </div>
      <footer className="mt-8 text-gray-500 text-right">
        {message.author}
      </footer>
    </blockquote>
  );
};

export default PostMessage;
