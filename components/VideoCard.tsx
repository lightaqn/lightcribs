import React, { FC, useState, SetStateAction, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

interface IProps {}

const VideoCard: FC<IProps> = (props) => {
  const [isMuted, setIsMuted] = useState<SetStateAction<boolean>>(false);
  const [isHovering, setIsHovering] = useState<SetStateAction<boolean>>(false);
  const [isPlaying, setIsPlaying] = useState<SetStateAction<boolean>>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // useEffect(() => {
  //     if(crib && videoRef.current){
  //         videoRef.current.muted = isMuted
  //     }
  // },[crib, isMuted])

  const onClickVideo = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  const controls = isHovering && (
    <div className="flex absolute items-center px-5 justify-between w-[200px] h-[100px] px-auto mx-auto border-2 border-white text-center top-1/2 left-1/2 rounded-full bg-gray-100/30">
      {isPlaying ? (
        <button onClick={onClickVideo} className="">
          <BsFillPauseFill className="cursor-pointer text-white font-bold text-5xl lg:text-7xl text-center" />
        </button>
      ) : (
        <button onClick={onClickVideo}>
          <BsFillPlayFill className="cursor-pointer text-white font-bold text-5xl lg:text-7xl text-center" />
        </button>
      )}{" "}
      {isMuted ? (
        <button onClick={() => setIsMuted(false)} className="">
          {" "}
          <HiVolumeUp className="cursor-pointer text-lime-500 font-bold text-4xl lg:text-6xl text-center" />
        </button>
      ) : (
        <button>
          {" "}
          <button onClick={() => setIsMuted(true)}>
            <HiVolumeOff className="cursor-pointer text-red-500 font-bold text-4xl lg:text-6xl text-center" />
          </button>
        </button>
      )}
    </div>
  );
  return (
    <div className="flex relative gap-3 lg:mx-auto">
      <div
        className="rounded-4xl h-[800px] w-[900px] mx-auto"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <video
          loop
          ref={videoRef}
          className="h-full w-full rounded-3xl bg-gray-300/3 backdrop-blur-xl"
          // src={crib?.video.asset.url}
          src="/video3.mp4"
        ></video>
        {controls}
      </div>
    </div>
  );
};
export default VideoCard;
