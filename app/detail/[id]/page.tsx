"use client";
import { MovieInterface, imgLoader } from "@/app/page";
import CircularProgress from "@/components/circularProgress";
import { fetchAPI } from "@/helpers/fetchAPI";
import { formatCurrency } from "@/helpers/formatCurrency";
import time_convert from "@/helpers/timeConvert";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type DetailInterface = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  keywords: Array<{ id: number; name: string }>;
  similars: Array<MovieInterface>;
};

function DetailPage() {
  const [detailData, setDetailData] = React.useState<DetailInterface>();
  const params = useParams();
  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetchAPI(
          `https://api.themoviedb.org/3/movie/${params.id}`
        );
        const similarData = await fetchAPI(
          `https://api.themoviedb.org/3/movie/${params.id}/similar`
        );
        const keywordData = await fetchAPI(
          `https://api.themoviedb.org/3/movie/${params.id}/keywords`
        );

        setDetailData({
          ...data,
          similars: similarData.results,
          keywords: keywordData.keywords,
        });
      } catch (error) {}
    })();
  }, [params.id]);
  if (!detailData)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)] w-screen">
        <svg
          className="animate-spin -ml-1 mr-3 h-20 w-20 text-yellow-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="40"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );

  return (
    <div className="flex flex-col">
      <section className={"w-screen"}>
        <div
          className={"h-full w-full relative bg-no-repeat bg-center bg-cover"}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detailData?.backdrop_path})`,
          }}
        >
          <div
            className="h-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(241.5, 220.5, 199.5, 1) calc((50vw - 170px) - 340px), rgba(241.5, 220.5, 199.5, 0.84) 50%, rgba(241.5, 220.5, 199.5, 0.84) 100%)",
            }}
          >
            <div className="h-full container mx-auto flex items-center">
              <div className="h-full flex py-10 px-8 space-x-4">
                <Image
                  className="rounded-xl shadow-md"
                  loader={imgLoader}
                  src={detailData.poster_path}
                  alt={""}
                  width={"350"}
                  height={"500"}
                />
              </div>
              <div className="flex flex-col flex-1 space-y-2">
                <h2 className="text-4xl font-extrabold">
                  {detailData.title} (
                  {new Date(detailData.release_date).getFullYear()})
                </h2>
                <div className="flex space-x-1 text-md">
                  <span>
                    {new Date(detailData.release_date).toLocaleDateString()}
                  </span>
                  <span className="before:content-['•'] before:mr-1 after:content-['•'] after:ml-1">
                    {detailData.genres.map((item) => item.name).join(", ")}
                  </span>
                  <span>{time_convert(detailData.runtime)}</span>
                </div>
                <div className="flex space-x-1">
                  <div className="flex items-center space-x-1">
                    <CircularProgress
                      percent={Math.round(detailData.vote_average * 10)}
                    />
                    <span className="text-md font-bold">User Score</span>
                  </div>
                </div>
                <i className="text-gray-700">{detailData.tagline}</i>
                <div>
                  <h3 className="font-bold text-xl">Overview</h3>
                  <h4>{detailData.overview}</h4>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-1 flex flex-col space-y-2">
                    <div>
                      <h3 className="font-bold text-md">Status</h3>
                      <span>{detailData.status}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-md">Original Language</h3>
                      <span>
                        {
                          detailData.spoken_languages.find(
                            (item) =>
                              item.iso_639_1 === detailData.original_language
                          )?.name
                        }
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-md">Budget</h3>
                      <span>
                        {formatCurrency(detailData.budget, "en-US", "USD")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-md">Revenue</h3>
                      <span>
                        {formatCurrency(detailData.revenue, "en-US", "USD")}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col space-y-2 h-fit">
                    <h3 className="font-bold text-md">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {detailData.keywords.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gray-400 text-white rounded-md py-1 px-2"
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-8 container mx-auto">
        <h3 className="font-semibold text-2xl pb-2">Similar Movies</h3>
        <div className="overflow-x-auto overflow-y-hidden w-full h-52 min-w-0">
          <div className="flex flex-nowrap space-x-3 h-full pb-2">
            {detailData.similars.map((item) => (
              <Link
                href={`/detail/${item.id}`}
                key={item.id}
                title={item.title}
                className="group w-[350px]"
              >
                <div className="relative h-[88%] w-[inherit]">
                  <div
                    className="rounded-md shadow-md w-full h-full bg-no-repeat bg-center bg-cover"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w250_and_h141_face${
                        item.backdrop_path || item.poster_path
                      })`,
                    }}
                  />
                  <div className="rounded-b-md w-full px-3 py-2 bg-gray-200 opacity-90 absolute bottom-0 group-hover:visible invisible">
                    <span>
                      &#128467;{" "}
                      {new Date(item.release_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="h-[12%] flex space-x-3 justify-between px-1">
                  <span className="w-[85%] whitespace-nowrap overflow-hidden text-ellipsis inline-block">
                    {item.title}
                  </span>
                  <span>{Math.round(item.vote_average * 10)}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
