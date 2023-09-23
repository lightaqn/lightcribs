import React, { FC } from "react";
import Image from "next/image";

import Link from "next/link";

interface IProps {
  image: string;
  city: string;
}

const CitiesCard: FC<IProps> = ({ image, city }) => {
  return (
    <div className="flex relative group h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px] xl:h-[700px] xl:w-[700px] 2xl:h-[800px] 2xl:w-[800px] group-hover:rounded-2xl transition transform hover:duration-300 hover:scale-110 hover:ease-in hover:cursor-pointer">
      <Image
        src={image}
        layout="fill"
        objectFit="contain"
        className="h-full w-full rounded-lg"
      />
      <div className="absolute hidden group-hover:flex flex-col max-w-[70%] right-0 top-0 bottom-0 bg-gray-500/30 backdrop-blur-lg items-center justify-center transition hover:ease-out overflow-hidden my-10 mr-0 ml-3 h-full w-3/4 hover:border-x-2 hover:border-teal-500">
        <p className="text-center text-white font-bold p-5 text-2xl">{city}</p>
      </div>
    </div>
  );
};
export default CitiesCard;
