import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { niches } from "../utils/constants";

interface IProps {}

const Horizons: FC<IProps> = () => {
  const router = useRouter();
  const { niche } = router.query;
  return (
    <div className="border border-b-2 border-gray-300 py-5 mt-20">
      <p className="hidden xl:block font-bold p-4">Catchy Horizons</p>
      <div className="flex gap-3 flex-wrap">
        {niches.map((item: any) => (
          <Link href={`/?niche=${item.name}`} key={item.name}>
            <div
              className={`xl:border-2 hover:bg-gray-100 xl:border-gray-300 space-y-6 px-4 py-2 rounded xl:rounded-full flex items-center text-black justify-center gap-2 hover:cursor-pointer ${
                niche === item.name && "active:xl:border-teal-500 text-teal-500"
              }`}
            >
              <span className="font-bold text-3xl">{item.icon}</span>
              <span className="hidden xl:block font-medium text-lg">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Horizons;
