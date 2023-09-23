import React, { FC } from "react";

interface IProps {}

const LoginForm: FC<IProps> = (props) => {
  return (
    <div className=" bg-white bottom-1/2 py-10 pt-30 my-15 space-y-10 items-center justify-center h-[50vh] shadow-xl rounded-xl border border-gray-200">
      <div className="flex-col items-center justify-center">
        <form>
          <input
            type="text"
            className="border-none p-5 text-white text-lg flex-grow bg-transparent rounded-lg ring-0 active:bg-gray-100 active:border-none"
          />
          <button className="button">Login</button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
