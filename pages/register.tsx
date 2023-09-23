import type { NextPage } from "next";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const router = useRouter();
  const { status } = router.query;
  return (
    <div className="max-w-7xl mx-auto relative items-center justify-center flex">
      <div className="flex absolute z-1 top-50 bg-[url('/city.jpg')] w-1/2 h-[150vh] md:h-[200vh] lg:h-[250vh] rotate-45 overflow-hidden skew-y-12"></div>
      <main className="z-10 bg-white mt-30 top-40 absolute">
        <form className="flex flex-col py-5 pt-15 my-10 gap-y-10 h-[50vh] w-[70vw] shadow-xl rounded-xl border border-gray-200 mt-25 items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-400 p-3">
            Welcome{" "}
            <span className="text-teal-500 uppercase text-2xl p-2 mx-3">
              {status === "owner" ? "Owner" : "Renter"}
            </span>{" "}
            Begin your journey here
          </h1>
          <input
            type="email"
            placeholder="Enter your Email"
            className="inputForm"
          />
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
          <input
            type="password"
            placeholder="Confirm your password"
            className="inputForm"
          />

          <button className="button">Register</button>
          <p className="text-gray-500 text-lg">
            Already have an Account?{" "}
            <span className="text-lime-500 font-bold cursor-pointer">
              Login here
            </span>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Register;
