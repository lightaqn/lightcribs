import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface IProps {
  velocity: number;
  images: string[];
}

const Slider: FC<IProps> = ({ velocity, images }: IProps) => {
  let contentWidth: number = 1290;
  let initialOffsetX: number = 0;

  const [innerWidth, setInnerWidth] = useState(0);
  const refContainer = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refreshRef = useRef<any>(null);
  const refScrollX = useRef<number>(initialOffsetX);
  const scrollVelocity = velocity / 100;
  const active = innerWidth < contentWidth;

  const handleResize = useCallback(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const animate = useCallback(() => {
    const { current: elContainer }: any = refContainer;
    const { current: elContent }: any = refContent;
    if (elContainer && elContent) {
      refScrollX.current += scrollVelocity;
      elContainer.scrollLeft = refScrollX.current;
      if (elContainer.scrollLeft >= elContent.clientWidth) {
        refScrollX.current = 0;
        elContainer.scrollLeft = 0;
      }
    }
    refreshRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (active) {
      refreshRef.current = requestAnimationFrame(animate);
      return () => {
        if (refreshRef.current) {
          return cancelAnimationFrame(refreshRef.current);
        }
      };
    }
  }, [animate, active]);

  const display = images.map((item, i) => (
    <div
      className="inline-flex items-center justify-center mx-4"
      style={{ width: 150 }}
      key={i}
    >
      <Image
        src={item}
        width={150}
        height={50}
        alt={item}
        objectFit="contain"
      />
    </div>
  ));

  return (
    <div
      ref={refContainer}
      className="overflow-x-hidden whitespace-nowrap max-w-full pointer-events-none"
    >
      <div ref={refContent} className="inline-block">
        {display}
      </div>
      <div className={active ? "inline-block" : "hidden"}>{display}</div>
    </div>
  );
};
export default Slider;
