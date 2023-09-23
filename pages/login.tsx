import type { NextPage } from "next";

import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const { status } = router.query;
  return (
    <div className="max-w-7xl max-h-[300px] mx-auto relative items-center justify-center flex">
      <div className="flex absolute z-1 top-30 bg-[url('/mountain.jpg')] w-1/2 h-[120vh] md:h-[200vh] lg:h-[250vh] rotate-45 overflow-hidden"></div>
      <main className="z-10 bg-white mt-30 items-center top-40 absolute grid grid-cols-3 justify-between gap-10 mx-auto max-w-5xl">
        <div className="items-center justify-start flex-grow space-x-4">
          <form className="flex flex-col py-5 pt-15 my-10 gap-y-10 h-[50vh] w-[70vw] shadow-xl rounded-xl border border-gray-200 mt-25 mx-10 ml-15 px-10 justify-center">
            <h1 className="text-2xl font-bold text-gray-400 p-3">
              Welcome Back
              <span className="text-teal-500 uppercase text-2xl p-2 ml-3">
                {status === "owner" ? "Owner" : "Renter"}
              </span>
            </h1>
            <input
              type="text"
              placeholder="Enter your username"
              className="inputForm"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="inputForm"
            />
            <button className="button">Login</button>
            <p className="text-gray-500 text-lg">
              Dont have an Account?{" "}
              <span
                className="text-lime-500 font-bold cursor-pointer transition duration-200 hover:scale-110 hover:ease-in-out"
                onClick={() => router.push("/register")}
              >
                Register here
              </span>
            </p>
            <p className="text-teal-600 text-lg cursor-pointer">
              Forget your password
            </p>
          </form>
        </div>
        {/* <div className="col-span-1 items-center justify-end right-0 sticky -z-40 bg-gray-300/30 backdrop-blur-lg">
          <img
            src="./mountain.jpg"
            className="h-full w-full object-cover mb-5 pb-5 justify-end"
            alt=""
          />
        </div> */}
      </main>
    </div>
  );
};

export default Login;
