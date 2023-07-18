import Link from "next/link";
import React from "react";
import { MovieInterface } from "../interface";

function SimpleCard({ item }: { item: MovieInterface }) {
  return (
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
            &#128467; {new Date(item.release_date).toLocaleDateString()}
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
  );
}

export default SimpleCard;
