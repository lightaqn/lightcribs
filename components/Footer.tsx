import React, { FC } from "react";

interface IProps {}

const Footer: FC<IProps> = (props) => {
  return (
    <div className="mx-auto h-[30vh] bg-gray-200 bottom-0 sticky items-center justify-center mt-10 pt-10">
      <div className="text-center">Footer</div>
    </div>
  );
};
export default Footer;
