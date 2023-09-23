import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useState, useEffect, useRef, SetStateAction } from "react";
import { cribs } from "../utils/constants";
import FilterCard, { SortCard } from "../components/FilterCard";
import { SearchCard, Pagination, Loader } from "../components";
import { clearTimeout } from "timers";
import { format } from "date-fns";
import usePaginate from "../utils/paginationHelper";
import { Crib } from "../typings";

// import Map from "../components/Map";

interface ISearch {
  searchInput: string;
  SearchResult: Crib[];
  prev: any;
  handlePage: (page: number) => void | any;
  onClick: (event: Event) => void | any;
}

const Search: NextPage<ISearch> = ({}: ISearch) => {
  const router = useRouter();
  const { searchInput, endDate, startDate, guestPop }: any = router.query;
  const [search, setSearch] = useState<SetStateAction<Crib[]>>([]);
  const [sort, setSort] = useState("");
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<SetStateAction<any>>(null);
  const [error, setError] = useState(false);
  const [presentPage, setPresentPage] = useState(1);

  const itemsPerPage = 10;

  const handlePage = (page: number) => {
    setPresentPage(page);
  };
  const [filters, setFilters] = useState({});
  const [filteredCribs, setFilteredCribs] = useState([]);

  // const rebrandedStartDate = format(new Date(startDate), "dd MMMM yy");
  // const rebrandedEndDate = format(new Date(endDate), "dd MMMM yy");
  // const range = `${rebrandedEndDate} - ${rebrandedStartDate}`;

  const handleSearch = () => {
    clearTimeout(searchTimeout);
    setLoading(true);
    try {
      setSearchTimeout(
        setTimeout(() => {
          const SearchResult = cribs.filter(
            (item) =>
              item.caption.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.Description.toLowerCase().includes(
                searchInput.toLowerCase()
              ) ||
              item.BR.toString().toLowerCase() === searchInput.toLowerCase() ||
              item.BTH.toString().toLowerCase() === searchInput.toLowerCase() ||
              item.form.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.city.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.entrance.toLowerCase().includes(searchInput.toLowerCase())
          );

          setSearch(SearchResult);
          setLoading(false);
        }, 500)
      );
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFilter = () => {
    setLoading(true);
    if (filters) {
      console.log(filters);

      const filteredResult = search.filter((item) =>
        Object.keys(filters).every(
          (key) => item[key].toString() === filters[key].toString()
        )
      );

      setFilteredCribs(filteredResult);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [filters]);

  useEffect(() => {
    const handleSort = () => {
      if (sort === "asc") {
        (prev: any) => [...prev].sort((a, b) => a.price - b.price);
      } else if (sort === "desc") {
        (prev: any) => [...prev].sort((a, b) => b.price - a.price);
      } else if (sort === "secdepasc") {
        (prev: any) =>
          [...prev].sort((a, b) => a.securityDeposit - b.securityDeposit);
      } else {
        (prev: any) =>
          [...prev].sort((a, b) => b.securityDeposit - a.securityDeposit);
      }
    };
    handleSort();
  }, [sort]);

  const handleReset = (e: any) => {
    e.preventDefault();
    setFilters({});
    setFilteredCribs([]);
    setSearch([]);
  };
  const paginatedSearchItems = usePaginate(search, presentPage, itemsPerPage);
  const paginatedFilteredItems = usePaginate(
    filteredCribs,
    presentPage,
    itemsPerPage
  );

  const renderCribs =
    paginatedFilteredItems?.length >= 1
      ? paginatedFilteredItems.map(
          ({ id, images, caption, form, city, BR, BTH, price }: any) => (
            <div key={id} className="space-y-5 p-3">
              <SearchCard
                key={id}
                images={images}
                caption={caption}
                form={form}
                city={city}
                BR={BR}
                BTH={BTH}
                price={price}
              />
            </div>
          )
        )
      : paginatedSearchItems.map(
          ({ id, images, caption, form, city, BR, BTH, price }: any) => (
            <div key={id} className="space-y-5 p-3">
              <SearchCard
                key={id}
                images={images}
                caption={caption}
                form={form}
                city={city}
                BR={BR}
                BTH={BTH}
                price={price}
              />
            </div>
          )
        );

  return (
    <div className="relative items-center justify-center flex">
      <Head>
        <title>Search</title>
        <meta name="description" content="Generated by Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="flex absolute -z-2 top-1/4 bg-[url('/autum.jpg')] w-1/3 h-[120vh] md:h-[200vh] lg:h-[250vh] rotate-45 overflow-hidden"></div> */}
      <main className="max-w-9xl">
        <div className="grid md:grid-cols-3">
          <div className="w-0 h-full transition duration-300 hover:ease-out sm:hidden md:w-full md:lg:flex-col lg:inline-flex md:bg-[url('/city.jpg')] md:text-white md:col-span-1 xl:min-w-[600px]items-center justify-center text-2xl">
            {/* Map */}
            {/* <Map search={search} /> */}
          </div>
          <div className="space-y-5 col-span-full lg:col-span-2 m-5 p-5">
            <h1 className="text-5xl items-center justify-center text-gray-500 my-10">
              Showing{" "}
              <span className="font-light text-red-500">
                {filteredCribs.length > 0
                  ? filteredCribs.length
                  : search.length}
              </span>{" "}
              {(filteredCribs.length || search.length) > 1
                ? "results"
                : "result"}{" "}
              for{" "}
              <span className="text-lime-500">
                {filters
                  ? searchInput + " - " + Object.entries(filters)
                  : searchInput}
              </span>
            </h1>

            <div className="mt-10">
              <div className="hidden lg:flex rounded-2xl bg-gray-300/30 backdrop-blur-lg w-full p-5 pt-7 mt-10 mb-0 gap-x-5 justify-between">
                <div className="flex flex-grow overflow-scroll scroll-smooth scrollbar-hide">
                  <div className="flex flex-col my-2 space-y-3">
                    <label
                      className={`flex cursor-pointer shadow-md w-40 h-12 px-10 py-5 pb-7 pr-9 text-center items-center justify-center rounded-2xl text-gray-500 font-bold transition duration ease-in whitespace-nowrap ${
                        !hover &&
                        "hover:border-r-orange-600 hover:border-r-8 hover:shadow-xl hover:cursor-pointer hover:bg-gray-100 hover:scale-90"
                      }`}
                      onClick={() => setHover((prev) => !prev)}
                    >
                      Beds
                    </label>

                    <select
                      name="BR"
                      onChange={handleChange}
                      className={`${
                        hover
                          ? "block flex-col active:font-extrabold pr-9 bg-gray-500/30 text-center items-center justify-center rounded-2xl ring-0 shadow-md hover:shadow-xl hover:cursor-pointer hover:bg-gray-100 text-amber-500 font-bold active:scale-90 transition duration ease-in whitespace-nowrap active:border-r-orange-600 active:border-r-8 w-40 h-12 px-10 py-5 pb-7 mx-1"
                          : "hidden"
                      }`}
                    >
                      {" "}
                      {Array(9)
                        .fill()
                        .map((_, i) => (
                          <option
                            className="backdrop-blur-lg bg-gray-500/30 outline-none text-center text-lg font-bold rounded-xl space-x-2 p-3 text-amber-500"
                            value={i}
                          >
                            {i}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="flex flex-col my-2 space-y-3">
                    <label
                      className={`flex cursor-pointer shadow-md w-40 h-12 px-10 py-5 pb-7 pr-9 text-center items-center justify-center rounded-2xl text-gray-500 font-bold transition duration ease-in whitespace-nowrap ${
                        !hover &&
                        "hover:border-r-orange-600 hover:border-r-8 hover:shadow-xl hover:cursor-pointer hover:bg-gray-100 hover:scale-90"
                      }`}
                      onClick={() => setHover((prev) => !prev)}
                    >
                      Baths
                    </label>

                    <select
                      name="BTH"
                      onChange={handleChange}
                      className={`${
                        hover
                          ? "block flex-col active:font-extrabold pr-9 bg-gray-500/30 text-center items-center justify-center rounded-2xl ring-0 shadow-md hover:shadow-xl hover:cursor-pointer hover:bg-gray-100 text-amber-500 font-bold active:scale-90 transition duration ease-in whitespace-nowrap active:border-r-orange-600 active:border-r-8 w-40 h-12 px-10 py-5 pb-7 mx-1"
                          : "hidden"
                      }`}
                    >
                      {" "}
                      {Array(9)
                        .fill()
                        .map((_, i) => (
                          <option
                            className="backdrop-blur-lg bg-gray-500/30 outline-none text-center text-lg font-bold rounded-xl space-x-2 p-3 text-amber-500"
                            value={i}
                          >
                            {i}
                          </option>
                        ))}
                    </select>
                  </div>

                  <FilterCard filterParam="Baths" />
                  <FilterCard filterParam="Access Code" />
                  <FilterCard filterParam="Key" />
                  <FilterCard filterParam="Beds" />
                  <FilterCard filterParam="Wheelchair" />
                  <FilterCard filterParam="Pet" />
                </div>
                <div className="flex justify-end overflow-scroll scrollbar-hide">
                  {/* <FilterCard filterParam="Beds" /> */}
                  <FilterCard filterParam="Maximum Nights" />
                  <FilterCard filterParam="Maximum Guests" />

                  <div className="flex flex-col my-2 space-y-3">
                    <label
                      className={`flex cursor-pointer shadow-md w-40 h-12 px-10 py-5 pb-7 pr-9 text-center items-center justify-center rounded-2xl text-gray-500 font-bold transition duration ease-in whitespace-nowrap ${
                        !hover &&
                        "hover:border-r-orange-600 hover:border-r-8 hover:shadow-xl hover:cursor-pointer hover:bg-gray-100 hover:scale-90"
                      }`}
                      onClick={() => setHover((prev) => !prev)}
                    >
                      {" "}
                      Sort by price
                    </label>
                    <select
                      name="sort"
                      onChange={(e) => setSort(e.target.value)}
                      className={`${
                        hover
                          ? "block flex-col pr-9 bg-gray-500/30 text-center items-center justify-center rounded-2xl ring-0 shadow-md hover:shadow-xl hover:cursor-pointer hover:bg-gray-100 text-amber-500 font-bold active:scale-90 transition duration ease-in whitespace-nowrap active:border-r-orange-600 active:border-r-8 w-40 h-12 px-10 py-5 pb-7 mx-1"
                          : "hidden"
                      }`}
                    >
                      {[
                        { param: "Ascending", value: "asc" },
                        { param: "Descending", value: "desc" },
                      ].map(({ param, value }, i) => (
                        <SortCard
                          param={param}
                          i={i}
                          value={value}
                          onChange={(e: any) => setSort(e.target.value)}
                        />
                      ))}
                    </select>
                  </div>
                  <div className="items-center justify-center mt-10 mx-10 hover:bg-gray-100 rounded-2xl">
                    <FilterCard filterParam="Reset" onClick={handleReset} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-20 mt-7">
                {loading ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  renderCribs
                )}
                <Pagination
                  presentPage={presentPage}
                  handlePage={handlePage}
                  itemsPerPage={itemsPerPage}
                  items={
                    filteredCribs.length > 0
                      ? filteredCribs.length
                      : search.length
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Search;

// {search &&
//   search.map((item) => (
//     <div key={item.id} className="space-y-5 p-3">
//       <h2>{item.caption}</h2>
//       <div className="flex gap-4 items-center justify-center lg:flex-row overflow-x-scroll">
//         <img
//           src={item.images[0]}
//           className="w-full h-1/2 lg:h-1/3 lg:w-1/3 object-contain"
//           alt=""
//         />
//         <img
//           src={item.images[1]}
//           className="w-full h-1/2 lg:h-1/3 lg:w-1/3 object-contain"
//           alt=""
//         />
//         <img
//           src={item.images[2]}
//           className="w-full h-1/2 lg:h-1/3 lg:w-1/3 object-contain"
//           alt=""
//         />
//       </div>
//       <div className="flex flex-wrap space-x-3 items-center justify-around my-3">
//         {" "}
//         <p className="searchPtag">Bedrooms: {item.BR}</p>
//         <p className="searchPtag">Bathrooms: {item.BTH}</p>
//         <p className="searchPtag">
//           Max Guests Allowed: {item.maxGuestsAllowed}{" "}
//         </p>
//         <p className="searchPtag">
//           Max No of Nights: {item.maxNoOfNights}
//         </p>
//         <p className="searchPtag">Cost Per Night: {item.price}</p>
//         <p className="searchPtag">
//           Security Deposit: {item.securityDeposit}
//         </p>
//         <p className="searchPtag">
//           Wheelchair Accessibility: {item.wheelchairAccessibility}{" "}
//         </p>
//         <p className="searchPtag">Ingress: {item.entrance}</p>
//         <p className="searchPtag">Pet Policy: {item.pet} </p>
//         <p className="searchPtag">
//           {" "}
//           Type of Property: {item.form}
//         </p>
//       </div>

//       <p className="text-xl font-bold text-gray-500 my-5 p-3">
//         Full Description <br />
//         <span className="px-3 mx-3 text-lg text-teal-500">
//           {item.Description}
//         </span>
//       </p>
//     </div>
//   ))}
