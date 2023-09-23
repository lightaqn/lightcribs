import React, { FC, useState } from "react";
import { useRouter } from "next/router";

interface IProps {}

const Access: FC<IProps> = (props) => {
  const router = useRouter();

  const handleOwnerClick = (e: any) => {
    e.preventDefault();

    router.push({ pathname: "/login", query: { status: "owner" } });
  };
  const handleRenterClick = (e: any) => {
    e.preventDefault();

    router.push({ pathname: "/login", query: { status: "renter" } });
  };
  return (
    <div className="mx-auto flex gap-x-5 items-center justify-center lg:w-1/2">
      <button className="button" onClick={handleOwnerClick}>
        Owners
      </button>
      <button className="button" onClick={handleRenterClick}>
        Renters
      </button>
    </div>
  );
};
export default Access;
