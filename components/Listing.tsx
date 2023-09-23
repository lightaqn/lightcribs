import React, { useState } from "react";
import Image from "next/image";
import { Crib } from "../typings";

const Listing = ({ BR, BTH, form, price, images, caption }: Crib) => {
  return (
    // rotate-45 lg:rotate-0
    <div className="flex relative group p-5  h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]  md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px] 2xl:h-[700px] 2xl:w-[700px] border border-lg border-teal-500 group-hover:rounded-2xl transform hover:duration-300 hover:scale-110 hover:ease-in hover:cursor-pointer transition duration-300 ease-out object-contain">
      <Image
        className="h-full w-full rounded-2xl object-contain"
        src="/road.jpg"
        layout="fill"
        objectFit="contain"
      />
      <div className="absolute hidden group-hover:flex flex-col h-2/3 max-h-[70%] space-y-5 p-3 pb-5 md:p-6 md:pb-10 lg:p-10 lg:pb-15 xl:p-14 xl:pb-20 sm:my-10 md:my-15 lg:my-20 xl:my-30 my-5 mb-0 md:mb-10 lg:mb-15 xl:mb-20 text-white font-bold text-lg lg:text-xl 2xl:text-3xl bottom-0 right-0 left-0 backdrop-blur-lg transition hover:ease-out hover:duration-500 bg-gray-700/30">
        <h3 className="h-1/6">{caption}</h3>
        <p className="text-teal-500 text-lg font-bold p-3 mt-5 shadow-md">
          {BR} Beds - {BTH} Baths - {form} at{" "}
          <span className="ml-5 bold text-lime-500">{price}</span>
        </p>
      </div>
    </div>
  );
};
export default Listing;
