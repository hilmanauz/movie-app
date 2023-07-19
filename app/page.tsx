"use client";
import React from "react";
import Pagination from "@/components/pagination";
import { fetchAPI } from "@/helpers/fetchAPI";
import {
  DiscoveryDataInterface,
  GenresInterface,
} from "@/components/interface";
import CardWithDetail from "@/components/movies/cardWithDetail";
import SearchInput from "@/components/searchInput";
import Tabs from "@/components/tabs";

export const categories = [
  { label: "Movie", value: "movie" },
  { label: "TV Series", value: "tv" },
];

export default function Home() {
  const [page, setPage] = React.useState(1);
  const [category, setCategory] = React.useState(categories[0].value);
  const [filter, setFilter] = React.useState("");
  const [discoveryData, setDiscoveryData] =
    React.useState<DiscoveryDataInterface>();
  const [genres, setGenres] = React.useState<GenresInterface>();
  const [bgImage, setBgImage] = React.useState("");
  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetchAPI(
          filter
            ? `https://api.themoviedb.org/3/search/${category}?query=${filter}&page=${page}`
            : `https://api.themoviedb.org/3/discover/${category}?page=${page}`
        );
        setDiscoveryData(data);
      } catch (error) {}
    })();
  }, [page, filter, category]);
  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetchAPI(
          `https://api.themoviedb.org/3/genre/${category}/list`
        );
        setGenres(data);
      } catch (error) {}
    })();
  }, [category]);
  React.useEffect(() => {
    if (!bgImage && discoveryData?.results?.length) {
      const randomIdx = Math.round(Math.random() * 20);
      setBgImage(discoveryData.results[randomIdx]?.backdrop_path);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [discoveryData, bgImage]);

  React.useEffect(() => {
    setPage(1);
    setFilter("");
  }, [category]);

  return (
    <main className="flex flex-col items-center justify-between">
      <section className={"h-[calc(100vh-4rem)] w-screen relative"}>
        {!!bgImage?.length && (
          <div
            className={
              "h-full w-full absolute top-0 bg-no-repeat bg-center bg-cover"
            }
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${bgImage})`,
            }}
          />
        )}
        <div className="h-full container mx-auto flex items-center">
          <div className="w-full lg:w-[50%] backdrop-blur-md rounded-lg flex flex-col justify-center py-16 px-8 space-y-4">
            <h2
              className="text-6xl font-extrabold w-full lg:w-[85%]"
              style={{
                textShadow: "#FC0 1px 0 10px",
              }}
            >
              All the Movie data you&apos;ll ever need in one place!
            </h2>
            <span
              className="text-xl font-normal text-gray-400"
              style={{
                textShadow: "1px 1px 2px white, 0 0 1em white, 0 0 0.2em #FC0",
              }}
            >
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
          </div>
        </div>
      </section>
      <section className=" w-full relative overflow-hidden" id="main-content">
        <div
          className="h-[450px] w-[500px] rounded-[100%] absolute -top-[200px] -left-[150px] z-0"
          style={{ border: "125px solid #FFD86C" }}
        />
        <div
          className="h-[450px] w-[500px] rounded-[100%] absolute -bottom-[200px] -right-[200px] z-0"
          style={{ border: "125px solid #FFD86C" }}
        />
        <div className="container mx-auto flex flex-col space-y-10 justify-around lg:px-40 lg:py-20">
          <div
            className={
              "h-48 w-full bg-no-repeat bg-center bg-cover px-5 flex flex-col space-y-2 justify-center z-10"
            }
            style={{
              backgroundImage: `url(https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg)`,
            }}
          >
            <h2 className="text-2xl font-bold">Free To Watch</h2>
            <div className="gap-4 flex lg:flex-row flex-col items-center">
              <div className="w-full lg:w-[25%]">
                <Tabs
                  categories={categories}
                  category={category}
                  setCategory={setCategory}
                />
              </div>
              <div className="w-full lg:w-[75%]">
                <SearchInput
                  filter={filter}
                  setFilter={setFilter}
                  category={category}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 z-10 lg:px-0 px-5">
            {discoveryData?.results?.map((item) => (
              <CardWithDetail
                genres={genres}
                item={item}
                key={item.id}
                category={category}
              />
            ))}
          </div>
          <Pagination maxIndex={500} page={page} setPage={setPage} />
        </div>
      </section>
    </main>
  );
}
