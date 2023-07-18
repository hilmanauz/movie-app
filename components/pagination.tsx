import classNames from "@/helpers/classnames";
import React from "react";

function Pagination({
  maxIndex,
  page,
  setPage,
}: {
  maxIndex: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [paginations, setPaginations] = React.useState<Array<number>>([]);

  const handleGetPage = React.useCallback(
    (totalPages: number, currentPage: number) => {
      let startPage: number;
      let endPage: number;
      if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
      } else {
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }

      var pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
        (i) => startPage + i
      );

      return pages;
    },
    []
  );

  const handleSetPage = React.useCallback(
    (page: number) => {
      if (page < 1 || page > maxIndex) {
        return;
      }

      paginations.length &&
        document
          .querySelector("#main-content")
          ?.scrollIntoView({ behavior: "smooth" });
      const pages = handleGetPage(maxIndex, page);
      setPage(page);

      setPaginations(pages);
    },
    [handleGetPage, maxIndex, paginations.length, setPage]
  );

  React.useEffect(() => {
    handleSetPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="flex text-gray-700 space-x-2">
        <button
          onClick={() => {
            handleSetPage(1);
          }}
          title="First"
          className="h-16 w-16 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            handleSetPage(page - 1);
          }}
          title="Previous"
          className="h-16 w-16 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <ul className="flex h-16 font-medium rounded-full bg-gray-200">
          {paginations.map((item) => (
            <li
              key={item}
              onClick={() => {
                handleSetPage(item);
              }}
              className={classNames(
                "w-16 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full",
                page === item ? "bg-teal-600 text-white" : ""
              )}
            >
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            handleSetPage(page + 1);
          }}
          title="Next"
          className="h-16 w-16 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <button
          onClick={() => {
            handleSetPage(maxIndex);
          }}
          title="Last"
          className="h-16 w-16 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
