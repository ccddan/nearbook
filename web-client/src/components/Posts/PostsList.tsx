import PostCard from "./PostCard";

interface PostsListProps {
  posts: any[];
}

export const PostsList = (props: PostsListProps) => {
  const { posts } = props;
  return (
    <section>
      <div className="px-4 py-8 container m-auto">
        <div>
          <span className="inline-block w-12 h-1 bg-red-700"></span>

          <h2 className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl">
            Posts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 lg:grid-cols-3 md:gap-x-4 gap-x-2 gap-y-8">
          {posts.map((item: any) => (
            <PostCard post={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostsList;
