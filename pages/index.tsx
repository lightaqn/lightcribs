import type { NextPage } from "next";
import React, { FC, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";

import {
  Card,
  CitiesCard,
  Access,
  ClosebyCard,
  Header,
  Slider,
  Refresher,
} from "../components";
import axios from "axios";
import { brandLogos } from "../utils/constants";
import { useAuthStore } from "../store/authStore";

import { cribs, destinations, nearbyAttractions } from "../utils/constants";
import { Crib } from "../typings";

interface ICribs {
  Cribs: Crib[];
}
// { Cribs }: ICribs
const Home: NextPage<ICribs> = () => {
  const { userProfile } = useAuthStore();
  //create a new zustand endpoint to fetch all cribs
  // console.log(Cribs);

  const isRegistered = true;
  return (
    <div className="items-center justify-center">
      <Head>
        <title>Proptech</title>
        <meta name="description" content="A property service app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Refresher />

      <section className="sticky top-0 z-30 -mt-20">
        <Header />
      </section>
      <main className="mx-auto space-y-10 max-w-8xl">
        <section className="mt-40">{isRegistered ? <Access /> : null}</section>

        <section className="flex flex-col my-5 mt-10">
          <h3 className="text-4xl text-teal-500 font-extrabold text-center mx-5 mb-1">
            {" "}
            Featured Cribs{" "}
          </h3>
          <div className="items-center justify-center gap-x-5 p-5 mt-0 m-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* {Cribs?.slice(0, 4).map(
              ({ id, images, caption, BR, BTH, form, price }: any) => (
                <Link href={`/crib/${id}`}> */}
            {/* OR ${crib._id} for when i start fetching directly from sanity*/}

            {/* <Card
                    key={id}
                    images={images}
                    caption={caption}
                    BR={BR}
                    BTH={BTH}
                    form={form}
                    price={price}
                  />
                </Link>
              )
            )} */}
          </div>
        </section>

        <section>
          <h3 className="text-4xl text-teal-500 font-extrabold text-center mx-5 mb-1">
            {" "}
            Favorite Cities
          </h3>
          <div className="flex ml-4 gap-x-8 p-4 overflow-scroll scroll-smooth scrollbar-hide hover:bg-gray-100">
            {destinations.map(({ image, city }) => (
              <div className="h-full w-full rounded-xl" key={city}>
                <CitiesCard key={city} image={image} city={city} />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-4xl text-teal-500 font-extrabold text-center mx-5 mb-1">
            {" "}
            Trusted Brands
          </h3>
          <div className="flex items-center justify-center my-5">
            <Slider velocity={100} images={brandLogos} />
          </div>
        </section>

        <section>
          <h3 className="text-4xl text-teal-500 font-extrabold text-center mx-5 mb-1">
            {" "}
            Nearby Attractions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {nearbyAttractions.map(({ image, location, displacement }) => (
              <div
                className="h-full w-full rounded-xl px-5 sm:px-10"
                key={location}
              >
                <ClosebyCard
                  key={location}
                  image={image}
                  location={location}
                  displacement={displacement}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default Home;

// export const getServerSideProps = async () => {
//   const { data } = await axios.get("https://localhost:3000/api/crib");
//   return { props: { Cribs: data } };
// };
