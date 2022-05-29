import PostMessage from "./PostMessage";

interface PostMessagesListProps {
  messages: any[];
}

export const PostMessagesList = (props: PostMessagesListProps) => {
  const { messages } = props;

  return (
    <section className="bg-dark">
      <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 mt-8">
          {messages.map((message: any, idx: number) => (
            <PostMessage key={idx} message={message} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostMessagesList;
