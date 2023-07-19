import { categories } from "@/app/page";
import React from "react";

function SearchInput({
  filter,
  setFilter,
  category,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  category: string;
}) {
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    setSearch("");
  }, [category]);
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="bg-white rounded-3xl ring-1 ring-gray-400 placeholder:text-gray-400 w-full h-10 pl-5 pr-28"
        placeholder={`Search for a ${
          categories.find((cat) => cat.value === category)?.label
        }...`}
        value={search}
        onKeyPress={(event) => {
          if (event.key === "enter") {
            setFilter(search);
          }
        }}
        onChange={(event) => {
          setSearch(event.currentTarget.value);
        }}
      />
      <button
        className="absolute right-0 rounded-3xl text-white h-10 w-28 bg-gradient-to-br from-yellow-500 to-teal-500"
        onClick={() => {
          if (filter !== search) {
            setFilter(search);
          } else {
            setSearch("");
            setFilter("");
          }
        }}
      >
        {filter !== search || !filter.length ? "Search" : "Reset"}
      </button>
    </div>
  );
}

export default SearchInput;
