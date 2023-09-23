import React, { FC } from "react";

interface IProps {
  filterParam: any;
  // sortParam: string[];
  param: any;
  i: number;
  value: any;
  onClick: () => void | any;
  onChange: () => void | any;
}

const FilterCard: FC<IProps> = ({ filterParam, onClick, value }: IProps) => {
  return (
    <p
      onClick={() => ({})}
      className="flex active:border-r-orange-600 active:border-r-8 w-40 h-12 px-10 py-5 pb-7 pr-9 text-center items-center justify-center rounded-2xl shadow-md hover:shadow-xl hover:cursor-pointer hover:bg-gray-100 text-gray-500 font-bold active:scale-90 transition duration ease-in whitespace-nowrap"
      value={value}
    >
      {filterParam}
    </p>
  );
};
export default FilterCard;

export const SortCard: FC<IProps> = ({ param, i, value }) => {
  return (
    <option
      className="text-gray-800 backdrop-blur-lg bg-gray-500/30 outline-none text-center text-lg font-bold"
      key={i}
      value={value}
    >
      {param}
    </option>
  );
};
