import classNames from "@/helpers/classnames";
import React from "react";

function Tabs({
  categories,
  category,
  setCategory,
}: {
  categories: Array<{ label: string; value: string }>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
}) {
  return (
    <div className="w-full flex space-x-2 rounded-3xl bg-teal-900/20 p-1">
      {categories.map((cat) => (
        <div
          key={cat.value}
          className={classNames(
            "w-full rounded-3xl py-2.5 text-sm font-medium leading-5 text-teal-500 text-center",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2",
            cat.value === category
              ? "bg-white shadow"
              : "!text-gray-100 hover:bg-white/[0.12] hover:text-white cursor-pointer"
          )}
          onClick={() => setCategory(cat.value)}
        >
          {cat.label}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
