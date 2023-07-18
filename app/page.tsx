"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";
import classNames from "../helpers/classnames";
import CircularProgress from "@/components/circularProgress";
import Pagination from "@/components/pagination";
import Link from "next/link";

type MovieInterface = {
  results: Array<{
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: 7.7;
    vote_count: number;
  }>;
  page: number;
  total_pages: number;
  total_results: number;
};

type GenresInterface = {
  genres: Array<{ id: number; name: string }>;
};

export default function Home() {
  const [page, setPage] = React.useState(1);
  const [movieData, setMovieData] = React.useState<MovieInterface>();
  const [genres, setGenres] = React.useState<GenresInterface>();
  const [bgImage, setBgImage] = React.useState("");
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.access_token}`,
            },
          }
        );
        setMovieData(data);
      } catch (error) {}
    })();
  }, [page]);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
          {
            headers: {
              Authorization: `Bearer ${process.env.access_token}`,
            },
          }
        );
        setGenres(data);
      } catch (error) {}
    })();
  }, []);
  React.useEffect(() => {
    if (!bgImage && movieData?.results?.length) {
      const randomIdx = Math.round(Math.random() * 20);
      setBgImage(movieData.results[randomIdx]?.backdrop_path);
    }
  }, [movieData, bgImage]);
  const imgLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `https://image.tmdb.org/t/p/original${src}`;
  };
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
          <div className="w-[50%] backdrop-blur-md rounded-lg flex flex-col justify-center py-16 px-8 space-y-4">
            <h2
              className="text-6xl font-extrabold w-[85%]"
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
        <div className="container mx-auto flex flex-col justify-around lg:px-40 lg:py-20">
          <div className="grid grid-cols-3 gap-8">
            {movieData?.results?.map((item) => (
              <Link key={item.id} href={`/detail/${item.id}`}>
                <div className="z-10 flex flex-col border-gray-500 border-b rounded-sm group hover:shadow-md cursor-pointer">
                  <div className="relative">
                    <Image
                      className="rounded-xl shadow-md"
                      loader={imgLoader}
                      src={item.poster_path}
                      alt={""}
                      width={"1000"}
                      height={"1000"}
                    />
                    <div className="backdrop-blur-md bg-opacity-40 bg-yellow-400 group-hover:visible invisible h-full w-full absolute top-0 rounded-xl flex flex-col justify-center items-center text-center p-5 space-y-3">
                      <span className="font-normal">{item.overview}</span>
                      <div className="grid grid-cols-2 gap-2 items-center">
                        {item.genre_ids.map((genre, idx) => (
                          <span
                            key={idx}
                            className="py-1 px-3 w-full bg-white ring-1 ring-gray-400 rounded-lg"
                          >
                            {genres?.genres.find((el) => el.id === genre)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <CircularProgress
                      percent={item.vote_average * 10}
                      className="absolute -bottom-6 left-3"
                    />
                  </div>
                  <div className="flex flex-col pt-8 pb-4 px-3">
                    <h4 className="font-bold text-base">{item.title}</h4>
                    <span className="text-gray-500 text-base">
                      {new Date(item.release_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Pagination maxIndex={500} page={page} setPage={setPage} />
        </div>
      </section>
    </main>
  );
}
