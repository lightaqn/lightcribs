import React, { FC } from "react";
import { GoVerified } from "react-icons/go";
import { useAuthStore } from "../store/authStore";
import Image from "next/image";
import Link from "next/link";
import { IProfile, IReview } from "../typings";
import { MdOutlineVideocamOff } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { FaVideo } from "react-icons/fa";
import { BASE_URL } from "../utils";

interface IProps {
  handleReview: (e: React.FormEvent) => void;
  isSendingReview: boolean;
  setReview: Dispatch<SetStateAction<string>>;
  reviews: IReview[];
  review: string;
}

const Reviews: FC<IProps> = ({
  handleReview,
  isSendingReview,
  setReview,
  reviews,
  review,
}) => {
  const { userProfile, allProfiles } = useAuthStore();

  return (
    <div className="h-[500px] overflow-scroll">
      {reviews?.length > 0 ? (
        reviews?.map((item, index) => (
          <div className="border-t-2 border-b-2 py-5 px-10">
            {allProfiles?.map(
              (item: IProfile) =>
                profile._id === (item?.author?._id || item?.author?._ref) && (
                  <div className="" key={index}>
                    <Link href={`${BASE_URL}/profiles/${id}`}>
                      <Image src={item.image} layout="responsive" />
                    </Link>
                  </div>
                )
            )}
          </div>
        ))
      ) : (
        <div>
          <NoReview display="No Reviews, Assume the coveted first commenter position" />
        </div>
      )}

      {userProfile && (
        <div className="absolute bottom-0 left-0 py-6 px-12">
          <form onSubmit={handleReview} className="flex space-5">
            <input
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-[300px] md:w-[600px] lg:w-[400px] px-6 py-3 focus:outline-none text-md font-medium focus:border-teal-300 placeholder-gray-200 flex-1  bg-white/30 backdrop-blur-lg  hover:bg-gray-200/10"
              placeholder="... Enter Reviews"
            />
            <button onClick={handleReview} type="submit" className="button">
              {isSendingReview ? "Reviewing" : "Review"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Reviews;

const NoReview = ({ display }: any) => {
  return (
    <div>
      <p className="text-8xl">
        {display === "No Reviews" ? "No Reviews" : <MdOutlineVideocamOff />}
      </p>
      <p>{display}</p>
    </div>
  );
};
