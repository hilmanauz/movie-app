import imgLoader from "@/helpers/imgLoader";
import Link from "next/link";
import React from "react";
import CircularProgress from "../circularProgress";
import Image from "next/image";
import { GenresInterface, MovieInterface } from "../interface";

function CardWithDetail({
  item,
  genres,
}: {
  item: MovieInterface;
  genres?: GenresInterface;
}) {
  return (
    <Link key={item.id} href={`/detail/${item.id}`}>
      <div className="z-10 flex flex-col border-gray-500 border-b rounded-sm group hover:shadow-md cursor-pointer">
        <div className="relative">
          <Image
            className="rounded-xl shadow-md"
            loader={imgLoader}
            src={item.poster_path === null ? "null" : item.poster_path}
            alt={"poster"}
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
            percent={Math.round((item.vote_average || 0) * 10)}
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
  );
}

export default CardWithDetail;
