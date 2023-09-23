import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoogleSignIn } from "../components";

interface IProps {}

const Nav: FC<IProps> = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b-2 border-gray-300 w-full">
      <Link href="/">
        <div className="w-[120px] md:w-[150px] lg:w-[200px] xl:w-[220px]">
          <Image
            src="/city.jpg"
            layout="responsive"
            className="cursor-pointer"
            objectFit="contain"
            width={150}
            height={50}
          />
        </div>
      </Link>

      <div></div>
      <div className="items-center justify-end cursor-pointer tracking-wide object-contain">
        <GoogleSignIn />
      </div>
    </div>
  );
};
export default Nav;
