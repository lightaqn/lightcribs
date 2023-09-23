import React, { FC } from "react";

interface IProps {
  presentPage: number;
  handlePage: () => void;
  itemsPerPage: number;
  items: number;
}

const Pagination: FC<IProps> = ({
  presentPage,
  handlePage,
  itemsPerPage,
  items,
}) => {
  const pagesNum = Math.ceil(items / itemsPerPage);

  if (pagesNum === 1) return null;
  const pages = Array.from({ length: pagesNum }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center">
      <ul className="flex justify-around space-x-2 items-center h-10 w-10 tracking-tight">
        {pages.map((page: number) => (
          <li
            className={`text-teal-500 bg-white w-8 h-8 text-center p-2 border border-teal-500 rounded-xl  ${
              page === presentPage &&
              "flex items-center justify-center font-bold bg-teal-500 text-white"
            }`}
            key={page}
          >
            <a className="cursor-pointer" onClick={() => handlePage(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Pagination;
