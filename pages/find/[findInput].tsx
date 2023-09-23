import type { NextPage } from "next";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { Crib } from "../../typings";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import usePaginate from "../../utils/paginationHelper";
import { Pagination, FilterCard, SearchCard, Loader } from "../../components";
import { useAuthStore } from "../../store/authStore";

interface IFind {
  foundResult: Crib[];
  findInput: string;
  handlePage: () => void;
}

// { foundResult }: IFind
const find: NextPage<IFind> = () => {
  const router = useRouter();
  const { findInput } = router.query;
  const [isResults, setIsResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  //   const [found, setFound] = useState(foundResult);
  const [filteredFound, setFilteredFound] = useState([]);
  const [paginatedFound, setPaginatedFound] = useState([]);
  const [paginatedFiltered, setPaginatedFiltered] = useState([]);

  const [presentPage, setPresentPage] = useState(1);
  let itemsPerPage = 10;
  const [filters, setFilters] = useState({});
  const handlePage = (page: number) => {
    setPresentPage(page);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleFilter = () => {
    if (found) {
      setIsLoading(true);
      const paginatedFoundResult = usePaginate(
        found,
        presentPage,
        itemsPerPage
      );
      setPaginatedFound(paginatedFoundResult);
      setIsResults(true);
      setIsLoading(false);
    } else if (filters && found) {
      setIsLoading(true);
      try {
        const filteredResult = found.filter((item) =>
          Object.keys(filters).every(
            (key) => item[key].toString() === filters[key].toString()
          )
        );

        setFilteredFound(filteredResult);

        const paginatedFilteredFoundResult = usePaginate(
          filteredFound,
          presentPage,
          itemsPerPage
        );
        setPaginatedFiltered(paginatedFilteredFoundResult);
        setIsResults(true);
        setIsLoading(false);
      } catch (err) {
        setIsResults(false);
        setError(true);
        console.error(err);
      }
    }
  };

  //   useEffect(() => {
  //     handleFilter();
  //   }, [filters, found]);

  const handleReset = (e: any) => {
    e.preventDefault();
    setFilters({});
    setFilteredFound([]);
    setFound([]);
  };

  //from find bar in nav
  //   const handleFind = (e: { preventDefault: () => void }) => {
  //     e.preventDefault();
  //     router.push(`/find/${findInput}`);
  //   };
  //   <button onClick={handleFind}>Find</button>;

  //   const paginatedFoundResult = usePaginate(found, presentPage, itemsPerPage);
  //   const paginatedFilteredFoundResult = usePaginate(
  //     filteredFound,
  //     presentPage,
  //     itemsPerPage
  //   );

  const renderResults =
    paginatedFiltered.length > 0
      ? paginatedFiltered.map(
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
      : paginatedFound.map(
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
    <div className="">
      {/* <div>{isProfile ? <Profile /> : <Crib />}</div> */}

      {/* multi- ternary operator */}
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          {isResults ? (
            <div className="flex">
              <p className="" name="br" value="2" onClick={handleChange}>
                filter
              </p>
              <FilterCard filterParam="Reset" onClick={handleReset} />
              <div>
                {renderResults}
                <Pagination
                  presentPage={presentPage}
                  handlePage={handlePage}
                  itemsPerPage={itemsPerPage}
                  items={
                    paginatedFound.length > 0
                      ? paginatedFiltered.length
                      : paginatedFound.length
                  }
                />
              </div>
            </div>
          ) : (
            <div>
              {(error ||
                !paginatedFound.length ||
                !paginatedFiltered.length) && (
                <NoResults text={`No results for ${findInput}`} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default find;

// export const getServersideProps = async ({
//   params: { findInput },
// }: {
//   params: { findInput: string };
// }) => {
//   const { data } = await axios.get(`${BASE_URL}/api/find/${findInput}`);

//   return {
//     props: {
//       foundResult: data,
//     },
//   };
// };

const NoResults = ({ text }: { text: string }) => {
  return (
    <div>
      <h3>{text}</h3>
    </div>
  );
};

// Another Approach to search

// fetch all cribs and store in zustand cribStore

// const {allCribs} = useAuthStore
// const findCribs = allCribs.filter((crib) => crib.caption.toLowerCase().includes(findInput.toLowerCase()))

// {findCribs.length>0 ? findCribs.map((crib) => (<Card />))}

// Niche(category) page

// export const getServersideProps = async({query:{niche}}:{query:{niche:string}}) =>{
//     let res= null
//     if(niche){
//         res = await axios.get(`api/discover/${niche}`)
//     } else {
//         res = await axios.get(`api/crib`)
//     }
// }
