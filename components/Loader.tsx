import React, { FC } from "react";

import Image from "next/image";

interface IProps {}

const Loader: FC<IProps> = (props) => {
  return (
    <section className="flex flex-col justify-center items-center py-3 bg-black/10 backdrop-blur-lg">
      <div className="animate-spin rounded-full border-b-2 border-amber-500">
        <Image
          className="h-full full rounded-full"
          src="/loader.jpeg"
          alt=""
          width={400}
          height={400}
          layout="responsive"
        />
      </div>
    </section>
  );
};
export default Loader;
