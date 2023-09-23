import React, { FC } from "react";
import Image from "next/image";

import Link from "next/link";

interface IProps {
  image: string;
  location: string;
  displacement: string;
}

const ClosebyCard: FC<IProps> = ({ image, location, displacement }) => {
  return (
    <div className="flex cursor-pointer duration-250 transition hover:bg-gray-100 m-3 mt-5 ease-out hover:scale-110 space-x-5">
      <div className="relative h-[22px] w-[22px] lg:h-[40px] lg:w-[40px]">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          className="h-full w-full rounded-lg"
        />
      </div>

      <div className="">
        <p className="text-lg font-bold">{location}</p>
        <p className="text-gray-500">{displacement}</p>
      </div>
    </div>
  );
};
export default ClosebyCard;
