import { CheckIcon, RefreshIcon } from "@heroicons/react/solid";

import { useState } from "react";

interface NewMessageFormProps {
  onSubmitHandler: (comment: string) => Promise<void>;
}

export const NewMessageForm = (props: NewMessageFormProps) => {
  const [comment, setComment] = useState("");
  const [sendingForm, setSendingForm] = useState(false);

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="comment">
        {" "}
        Comment{" "}
      </label>

      <input
        className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
        id="comment"
        type="comment"
        placeholder="Leave a comment"
        value={comment}
        onChange={(e: any) => {
          setComment(e.target.value);
        }}
      />

      <button
        className="absolute p-2 text-white -translate-y-1/2 bg-secondary rounded-full top-1/2 right-4 w-[40px] h-[40px]"
        type="button"
        disabled={sendingForm || comment.trim().length === 0}
        onClick={() => {
          setSendingForm(true);
          props.onSubmitHandler(comment).then(() => {
            setSendingForm(false);
            setComment("");
          });
        }}
      >
        {!sendingForm && (
          <CheckIcon className="m-auto" width={15} height={15} />
        )}
        {!!sendingForm && (
          <RefreshIcon width={19} height={19} className="m-auto loading-icon" />
        )}
      </button>
    </div>
  );
};

export default NewMessageForm;
