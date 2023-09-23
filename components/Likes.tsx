import React, { FC, useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { MdFavorite } from "react-icons/md";

interface IProps {
  likes: any[];
  handleThumbsUp: () => void;
  handleThumbsDown: () => void;
}

const Likes: FC<IProps> = ({ likes, handleThumbsUp, handleThumbsDown }) => {
  const [liked, setLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const sievedLikes = likes.filter(
    (item: any) => item._ref === userProfile?._id
  );

  useEffect(() => {
    if (sievedLikes?.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, sievedLikes]);

  return (
    <div>
      {liked ? (
        <div
          onClick={handleThumbsDown}
          className="p-2 text-red-500 rounded-full text-2xl font-bold"
        >
          <MdFavorite />
        </div>
      ) : (
        <div
          onClick={handleThumbsUp}
          className="p-2 text-green-500 rounded-full text-2xl font-bold"
        ></div>
      )}
    </div>
  );
};
export default Likes;
