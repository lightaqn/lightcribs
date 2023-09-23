// import type { NextPage } from "next";

// interface IProps {
//   pagesNum: string;
//   items: string[];
//   pageIndex:number
// }

const usePaginate = (items: any, pageIndex: number, pagesNum: number) => {
  const initialIndex = (pageIndex - 1) * pagesNum;
  const endIndex = initialIndex + pagesNum;
  return items?.slice(initialIndex, endIndex);
};
export default usePaginate;
