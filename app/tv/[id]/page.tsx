"use client";
import CircularProgress from "@/components/circularProgress";
import { DetailTVInterface } from "@/components/interface";
import LoadingPage from "@/components/loadingPage";
import SimpleCard from "@/components/movies/simpleCard";
import { fetchAPI } from "@/helpers/fetchAPI";
import { formatCurrency } from "@/helpers/formatCurrency";
import imgLoader from "@/helpers/imgLoader";
import time_convert from "@/helpers/timeConvert";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

function DetailPage() {
  const [detailData, setDetailData] = React.useState<DetailTVInterface>();
  const params = useParams();
  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetchAPI(
          `https://api.themoviedb.org/3/tv/${params.id}`
        );
        const similarData = await fetchAPI(
          `https://api.themoviedb.org/3/tv/${params.id}/similar`
        );
        const keywordData = await fetchAPI(
          `https://api.themoviedb.org/3/tv/${params.id}/keywords`
        );

        setDetailData({
          ...data,
          similars: similarData.results,
          keywords: keywordData.results,
        });
      } catch (error) {}
    })();
  }, [params.id]);
  if (!detailData) return <LoadingPage />;

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
                "linear-gradient(to right, rgba(10.5, 31.5, 73.5, 1) calc((50vw - 170px) - 340px), rgba(10.5, 31.5, 73.5, 0.84) 50%, rgba(10.5, 31.5, 73.5, 0.84) 100%)",
            }}
          >
            <div className="h-full container mx-auto flex lg:flex-row flex-col items-center">
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
                <h2 className="lg:text-4xl text-2xl font-extrabold text-white">
                  {detailData.name} (
                  {new Date(detailData.first_air_date).getFullYear()})
                  {detailData.homepage && (
                    <a
                      href={detailData.homepage}
                      target="_blank"
                      title="Go to Homepage"
                    >
                      <sup className="px-1 cursor-pointer">&#128279;</sup>
                    </a>
                  )}
                </h2>
                <div className="flex space-x-1 lg:text-md text-sm text-white">
                  <span>
                    {new Date(detailData.first_air_date).toLocaleDateString()}
                  </span>
                  <span className="before:content-['•'] before:mr-1">
                    {detailData.genres?.map((item) => item.name).join(", ")}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <div className="flex items-center space-x-1 text-white">
                    <CircularProgress
                      percent={Math.round(detailData.vote_average * 10)}
                    />
                    <span className="text-md font-bold">User Score</span>
                  </div>
                </div>
                <i className="text-gray-300">{detailData.tagline}</i>
                <div className="text-white">
                  <h3 className="font-bold text-xl">Overview</h3>
                  <h4 className="text-md lg:text-lg">{detailData.overview}</h4>
                </div>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-2 text-white">
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
                      <h3 className="font-bold text-md">Type</h3>
                      <span>{detailData.type}</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col space-y-2 h-fit text-white">
                    <h3 className="font-bold text-md">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {detailData.keywords?.map((item) => (
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
        <h3 className="font-semibold text-2xl pb-2">Similar TV Series</h3>
        <div className="overflow-x-auto overflow-y-hidden w-full h-52 min-w-0">
          <div className="flex flex-nowrap space-x-3 h-full pb-2">
            {detailData.similars?.map((item) => (
              <SimpleCard item={item} key={item.id} category="tv" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
