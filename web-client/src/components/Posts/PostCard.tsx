import {
  AnnotationIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";

import { Link } from "react-router-dom";

interface PostCardProps {
  post: any;
}

export const PostCard = (props: PostCardProps) => {
  const { post } = props;
  console.log("PostCard::post - ", post);

  const title = post.title || "Undefined";

  return (
    <div className="w-[90%] sm:max-w-[400px] sm:w-full block bg-dark px-2 py-5 rounded border-gray border-[1px] m-auto">
      <h5 className="w-full text-lg text-shadow overflow-hidden text-ellipsis">
        <Link className="text-shadow whitespace-nowrap" to={post.uuid}>
          {title}
        </Link>
      </h5>

      <div className="cursor-pointer">
        <Link to={post.uuid}>
          <img src={post.cover} className="w-full h-60 md:h-40" />
        </Link>
      </div>

      <div className="flex items-center justify-between mt-4 font-bold px-8">
        <div className="flex items-center justify-center w-full text-center">
          <p className="mt-1 w-4 mr-2 md:mr-1">
            <ThumbUpIcon />
          </p>
          <p className="font-extrabold text-sm mt-1">{post.likes}</p>
        </div>

        <div className="flex items-center justify-center w-full text-center">
          <p className="mt-1 w-4 mr-2 md:mr-1">
            <ThumbDownIcon />
          </p>
          <p className="font-extrabold text-sm mt-1">{post.dislikes}</p>
        </div>

        <div className="flex items-center justify-center w-full text-center">
          <p className="mt-1 w-4 mr-2 md:mr-1">
            <AnnotationIcon />
          </p>
          <p className="font-extrabold text-sm mt-1">{post.totalMessages}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
