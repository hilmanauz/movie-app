import classNames from "@/helpers/classnames";
import React from "react";

function CircularProgress({
  percent,
  className,
}: {
  percent: number;
  className?: string;
}) {
  const circumference = 24 * 2 * Math.PI;
  return (
    <div
      className={classNames(
        "inline-flex items-center justify-center overflow-hidden rounded-full bg-black",
        className || ""
      )}
    >
      <svg className="w-14 h-14">
        <circle
          className="text-gray-300"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="24"
          cx="28"
          cy="28"
        />
        <circle
          className={classNames(
            percent >= 70
              ? "text-teal-600"
              : percent >= 45
              ? "text-yellow-600"
              : "text-red-600",
            "-rotate-90 origin-center"
          )}
          strokeWidth="4"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="24"
          cx="28"
          cy="28"
        />
      </svg>
      <span className="absolute text-xs font-extrabold text-white">
        {percent}
        <sup>%</sup>
      </span>
    </div>
  );
}

export default CircularProgress;
