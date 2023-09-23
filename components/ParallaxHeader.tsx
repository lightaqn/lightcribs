import React, { FC, useState, useRef, useCallback, useEffect } from "react";
// import {timeline} from gsap
interface IProps {}

const Parallax: FC<IProps> = (props) => {
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [rotateDegree, setRotateDegree] = useState(0);
  const refContainer = useRef(null);

  const handleParallax = useCallback((e: any) => {
    // if (timeline.isActive()) return;
    setXValue(e.clientX - window.innerWidth / 2);
    setYValue(e.clientY - window.innerWidth / 2);
    setRotateDegree((xValue / (window.innerWidth / 2)) * 20);
    update(e.clientX);
  }, []);

  let xSpeed: any;
  let ySpeed: any;
  let zSpeed: any;
  let rotateSpeed: any;
  let zValue: any;

  const update = (cursorPosition: any) => {
    const { current: elContainer } = refContainer;

    if (elContainer) {
      xSpeed = elContainer?.dataset?.speedx;
      ySpeed = elContainer?.dataset?.speedy;
      zSpeed = elContainer?.dataset?.speedz;
      rotateSpeed = elContainer?.dataset?.rotation;
      let inLeftPart =
        parseFloat(getComputedStyle(elContainer).left) < window.innerWidth / 2
          ? 1
          : -1;
      zValue =
        cursorPosition -
        parseFloat(getComputedStyle(elContainer).left) * inLeftPart;
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleParallax, { passive: true });

    return () => window.removeEventListener("mousemove", handleParallax);
  }, [handleParallax]);

  return (
    <header
      ref={refContainer}
      className=""
      style={{
        transform: `translateX(calc(-50% + ${-xValue * xSpeed}px)) rotateY(${
          rotateDegree * rotateSpeed
        }deg) translateY(calc(-50% + ${
          yValue * ySpeed
        }px)) perspective(2300px) translateZ(${zValue * zSpeed}px)`,
      }}
    >
      <img
        src="./middleup.jpg"
        data-speedx="0.18 "
        data-speedy="0.110 "
        data-speedz="0"
        data-distance=""
        data-rotation=""
      />
      <img
        src="./front.jpg"
        data-speedx="0.09 "
        data-speedy="0.05 "
        data-speedz="0.14"
        data-distance=""
        data-rotation=""
      />
      <div data-speedx="0.09 " data-speedy="0.05 ">
        <h1>ABCD</h1>
        <h2>EFGH</h2>
      </div>{" "}
      <img
        src="./left.jpg"
        data-speedx="0.059 "
        data-speedy="0.024 "
        data-speedz="0.09"
        data-distance=""
        data-rotation=""
      />
      <img
        src="./right.jpg"
        data-speedx="0.15 "
        data-speedy="0.013 "
        data-speedz="0"
        data-distance=""
        data-rotation=""
      />
    </header>
  );
};
export default Parallax;

// .forEach(elContainer =>{timeline.from(elContainer, {top:`${elContainer.offsetHeight/2 +  elContainer.dataset.distance}px`, duration:3.0, ease:'power# out'}, '1')})

// timeline.from('.hide', {opacity:0, duration:1.5}, '3')
// timeline.from('.text h2', {y:-150, opacity:0, duration:1.5}, '3')
// timeline.from('.text h1', {y:window.innerHeight - document.querySelector(".text h1").getBoundClientRect().top + 200, duration:2}, '2.5')

//Media Query

// const main = document.querySelector('main')
// if(window.innerWidth >= 725){
//   main.style.maxHeight=`$${window.innerWidth * 0.6}px`
// }else {
//   main.style.maxHeight=`$${window.innerWidth * 1.6}px`
// }
