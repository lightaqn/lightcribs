import React, { FC } from "react";
import Link from "next/link";

interface IProps {}

const SearchCard: FC<IProps> = ({
  id,
  images,
  caption,
  form,
  city,
  BR,
  BTH,
  price,
}: any) => {
  return (
    // <Link href={`/cribs/${id}`}></Link>
    <div key={id} className="gap-x-4 bg-white grid grid-cols-2">
      <div className="col-span-1 rounded-l-2xl">
        <img
          src={images[0]}
          className="h-full w-full object-contain rounded-l-2xl"
        />
      </div>
      <div className="col-span-1 rounded-r-2xl">
        <h2 className="bg-gray-200 font-bold p-3 text-lg text-gray-700 h-15">
          {caption}
        </h2>
        <p className="flex space-x-4 bg-white justify-between p-3 text-md">
          {" "}
          This <span className="font-bold ">{form}</span>located in{" "}
          <span className="font-bold text-lg">{city}</span>
        </p>
        <br />
        <p className="bg-gradient-to-r from-gray-300 to-transparent flex space-x-4 justify-between p-3 text-md">
          {" "}
          Features <span className="text-teal-500 font-bold text-lg">{BR}</span>
          Bedrooms and{" "}
          <span className="text-teal-500 font-bold text-lg">{BTH}</span>{" "}
          bathrooms
        </p>
        <br />
        <p className="bg-gradient-to-r from-transparent to-gray-300 flex space-x-4 justify-between p-3 ">
          {" "}
          It costs{" "}
          <span className="text-xl font-bold text-gray-500">${price}</span> per
          night
        </p>
        <br />
        <p className="bg-gradient-to-r from-gray-200 to-transparent flex space-x-4 bg-gray-200 justify-between p-3 text-md h-15"></p>
        <br />
      </div>
    </div>
  );
};
export default SearchCard;
