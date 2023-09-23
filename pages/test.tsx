import type { NextPage } from "next";
import MessageAnimation from "../components/MessageAnimation";
import { useState } from "react";

import { useRouter } from "next/router";
// const messages = [
//   "Have you been thinking about that next holiday destination?",
// ];
//   "holiday destination?",

// { messages, velocity }: any
// messages={messages} velocity="500"
const Test: NextPage = () => {
  const [displayDiv, setDisplayDiv] = useState(false);
  return (
    <div className="flex-col max-w-7xl max-h-[300px] mx-auto relative items-center justify-center flex text-teal-500 text-5xl">
      <div className="flex w-full items-center justify-center m-5 p-5">
        <MessageAnimation />
      </div>

      <div>
        <div
          className="cursor-pointer"
          onClick={() => setDisplayDiv((prev) => !prev)}
        >
          div1
        </div>
        <div className={`mt-4 ${displayDiv ? "block" : "hidden"}`}>div2</div>
      </div>
    </div>
  );
};

export default Test;
