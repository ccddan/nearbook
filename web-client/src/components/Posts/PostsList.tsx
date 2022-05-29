import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import { ViewGridAddIcon } from "@heroicons/react/solid";

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

          <h2 className="mt-1 text-2xl font-extrabold tracking-wide lg:text-3xl">
            Posts
          </h2>
          <p>
            Total: <span>0</span>
            <button
              className="btn btn-secondary rounded float-right"
              onClick={() => {
                console.log("create new post");
              }}
            >
              <Link to="new">
                <ViewGridAddIcon width={30} height={30} />
              </Link>
            </button>
          </p>
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
