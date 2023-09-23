import React, { useState, useEffect, useRef } from "react";
const messages = "Have you been thinking about that next holiday destination?";

// const MessageAnimation = ({ messages }: any) => {
//   const [letterIndex, setLetterIndex] = useState(0);
//   const [messageIndex, setMessageIndex] = useState(0);
//   const [isWordShown, setIsWordShown] = useState(false);

//   const presentMessage = messages[messageIndex];
//   const presentWord = presentMessage.split(" ")[letterIndex];

//   const handleLetterSpelt = () => {
//     setLetterIndex(letterIndex + 1);
//   };
//   const handleWordSpelt = () => {
//     setLetterIndex(0);
//     setMessageIndex((messageIndex + 1) % messages.length);
//     setIsWordShown(false);
//   };

//   const handleDisplayShown = () => {
//     setIsWordShown(true);
//   };

//   useEffect(() => {
//     const delayId = setInterval(() => {
//       if (isWordShown) {
//         handleDisplayShown();
//       }
//     }, 500);
//     return () => clearInterval(delayId);
//   }, [isWordShown]);

//   return (
//     <div className="flex text-teal-500 text-3xl whitespace-nowrap">
//       <span>
//         {presentMessage.slice(0, presentMessage.length - presentWord.length)}
//       </span>
//       <span>
//         {presentWord.split("").map((letter: any, index: number) => (
//           <span
//             key={index}
//             onAnimationEnd={
//               index === presentWord.length - 1
//                 ? handleWordSpelt
//                 : handleLetterSpelt
//             }
//           >
//             {letter}
//           </span>
//         ))}
//       </span>
//       <span> {isWordShown && " "}</span>{" "}
//     </div>
//   );
// };
// export default MessageAnimation;

// const MessageAnimation = ({ messages }: any) => {
//   const [presentMessageIndex, setPresentMessageIndex] = useState(0);
//   const [presentLetterIndex, setPresentLetterIndex] = useState(0);
//   const [presentWordIndex, setPresentWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [typingSpeed, setTypingSpeed] = useState(500);

//   const presentMessage = messages[presentMessageIndex];
//   const presentWord = presentMessage.split(" ")[presentWordIndex];

//   useEffect(() => {
//     const delayId = setTimeout(() => {
//       if (!isDeleting) {
//         setPresentLetterIndex(presentLetterIndex + 1);
//       } else {
//         setPresentLetterIndex(presentLetterIndex - 1);
//       }

//       if (isDeleting) {
//         setTypingSpeed(100);
//       } else {
//         setTypingSpeed(500);
//       }

//       if (presentLetterIndex === presentWord.length && !isDeleting) {
//         setIsDeleting(true);
//       }

//       if (presentLetterIndex === 0 && isDeleting) {
//         setIsDeleting(false);
//         setPresentWordIndex(
//           (presentWordIndex + 1) % presentMessage.split(" ").length
//         );
//         setPresentMessageIndex((presentMessageIndex + 1) % messages.length);
//       }
//     }, typingSpeed);

//     return () => clearTimeout(delayId);
//   }, [
//     isDeleting,
//     typingSpeed,
//     presentWord.length,
//     presentLetterIndex,
//     presentMessage.split(" ").length,
//   ]);

//   const displayedMessage = isDeleting
//     ? presentWord.slice(0, presentLetterIndex)
//     : presentMessage.slice(
//         0,
//         presentMessage.indexOf(presentWord) + presentLetterIndex
//       );

//   return (
//     <div className="flex text-teal-500 text-3xl items-center justify-center">
//       {displayedMessage}
//     </div>
//   );
// };
// export default MessageAnimation;

// single string

const MessageAnimation = () => {
  const [message, setMessage] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const flicker = () => {
      setMessage((prev: any) => prev + messages[indexRef.current]);
      indexRef.current++;
    };
    if (indexRef.current <= messages.length) {
      const addLetter = setInterval(flicker, 200);
      return () => clearInterval(addLetter);
    } else {
      setMessage(messages);
    }
  }, [message]);

  return (
    <div className="flex w-full font-extrabold gradient-to-r from-amber-500 to-teal-300 text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl items-center justify-center whitespace-nowrap">
      {message.length ? message : null}
    </div>
  );
};
export default MessageAnimation;
