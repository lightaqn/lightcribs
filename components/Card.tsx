import React, { FC } from "react";
// import Image from "next/image";
// import { useRouter } from "next/router";
import Link from "next/link";

interface IProps {
  id: number;
  images: string[];
  caption: string;
  BR: number;
  BTH: number;
  form: string;
  price: number;
}

const Card: FC<IProps> = ({ id, images, caption, BR, BTH, form, price }) => {
  // const router = useRouter();
  // onClick={(e) => router.push(${/id})}

  return (
    // <Link href={`profiles/${id}`}>
    <div className="hover:cursor-pointer py-20 my-15 space-y-10 items-center justify-center h-full w-full">
      <div
        key={id}
        className="border border-teal-500 flex-col items-center justify-center md:flex-wrap"
      >
        <img src={images[0]} className="w-full h-full rounded-lg" />
        <div className="bg-gray-100/30 backdrop-blur-lg py-4 mt-5 text-center">
          <h3 className="text-2xl text-amber-500 font-extrabold p-3">
            {caption}
          </h3>

          <p className="text-lg text-teal-500 flex space-x-3 p-3 pr-8">
            {BR} Beds - {BTH} Baths - {form}{" "}
            <span className="mx-5 font-bold text-xl text-bold text-gray-500">
              {price}
            </span>
          </p>
        </div>
      </div>
    </div>
    // </Link>
  );
};
export default Card;
