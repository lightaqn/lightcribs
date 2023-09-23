import React, { FC, useState, useRef } from "react";
import { useRouter } from "next/router";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";
import { MessageAnimation, ParallaxHeader } from "../components";

// yarn add _D @types/react-date-range

interface IProps {}

const Header: FC<IProps> = (props) => {
  const [input, setInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guestPop, setGuestPop] = useState<any>(1);
  const inputRef: any = useRef<null>(null);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setInput(inputRef.current.value);
    router.push({
      pathname: "/search",
      query: {
        searchInput: input,
        endDate: endDate.toISOString(),
        startDate: startDate.toISOString(),
        guestPop: guestPop,
      },
    });
  };

  const handleReset = (e: any) => {
    setInput("");
  };

  return (
    <header className="flex relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
      <Image src="/autum.jpg" layout="fill" objectFit="cover" />
      {/* <ParallaxHeader /> */}
      <div className="absolute top-1/3 right-1/2 left-1/2 text-center object-contain">
        <div className="flex flex-col space-y-4 items-center justify-center">
          <MessageAnimation />
          <h1 className="flex text-teal-500 text-7xl font-bold whitespace-nowrap">
            We'v got you covered
          </h1>

          <div className="m-5 mt-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col my-15 w-full space-y-10"
            >
              <div className="flex w-full mt-10 items-center justify-between hover:border-b-2 hover:border-white">
                <input
                  value={input}
                  ref={inputRef}
                  type="text"
                  className="flex-grow outline-none border-none p-5 font-bold text-white text-xl bg-transparent rounded-lg ring-0 hover:active:backdrop-blur-lg active:border-none hover:active:bg-gray-500/30"
                  onChange={(e) => setInput(e.target.value)}
                />

                <img
                  src="./search.png"
                  className="h-12 w-12 items-center justify-center text-center bg-transparent object-cover"
                />
              </div>
              <button className="button flex">Search</button>
            </form>
            {input && (
              <div className="flex z-30 font-bold flex-col col-span-3 mt-5 border border-teal-500">
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  onChange={handleSelect}
                  rangeColors={["#71cfe4"]}
                  className="p-5 rounded-xl w-full bg-gray-500/30 space-y-5 backdrop-blur-lg "
                />
                <div className="flex p-5 bg-white">
                  <p
                    onClick={handleReset}
                    className="w-15 h-8 px-6 py-3 pb-7 text-center items-center justify-center rounded-2xl shadow-md hover:shadow-xl hover:cursor-pointer hover:bg-gray-100 text-gray-500 active:scale-90 transition duration ease-in"
                  >
                    Reset
                  </p>
                  <h2 className="mt-1 text-lg flex-grow text-bold text-teal-500 hover:scale-110 ">
                    Guest Population
                  </h2>
                  <input
                    type="number"
                    min={1}
                    value={guestPop}
                    onChange={(e) => setGuestPop(e.target.value)}
                    className="h-8 w-14 outline-none text-center bg-teal-500 text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer hover:transition-all hover:scale-110"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
