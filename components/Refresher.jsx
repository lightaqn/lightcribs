import React, { FC, useState, useEffect, useRef } from "react";

// interface IProps {
// //     ref: React.LegacyRef<HTMLDivElement> | any;
// : FC<IProps>
// }

const Refresher = () => {
  const [source, setSource] = useState(0);
  const [advance, setAdvance] = useState();
  const refreshRef = useRef(0);

  useEffect(() => {
    window.addEventListener("touchstart", drag);
    window.addEventListener("touchmove", dragging);
    window.addEventListener("touchend", dragged);

    return () => {
      window.removeEventListener("touchstart", drag);
      window.removeEventListener("touchmove", dragging);
      window.removeEventListener("touchend", dragged);
    };
  });

  const initRefresh = () => {
    refreshRef.current.classList.add("loading");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const drag = (e) => {
    const { screenY } = e.targetTouches[0];
    setSource(screenY);
  };
  const dragging = (e) => {
    const contact = e.targetTouches[0];

    const { screenY } = contact;
    let dragDistance = source < screenY ? Math.abs(screenY - source) : 0;
    setAdvance(dragDistance);
  };
  const dragged = (e) => {
    // const contact = e.targetTouches[0];
    setSource(0);
    setAdvance(0);
    if (advance > 200) initRefresh();
  };

  return (
    <div
      ref={refreshRef}
      className="-mt-20 mx-auto w-fit flex"
      style={{ marginTop: advance / 3.142 || "" }}
    >
      <div className="rounded-full p-5">
        Refreshing
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
          style={{ transform: `rotate(${advance}deg)` }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0I3.181 3.183a8.25 8.25 0.0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7I3.181 3182m0-4.991v4.99"
          />
        </svg> */}
      </div>
    </div>
  );
};
export default Refresher;
