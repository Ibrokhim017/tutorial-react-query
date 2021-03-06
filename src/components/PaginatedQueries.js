import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (args) => {
  console.log("args", args);
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${1}`);
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isError, isFetching } = useQuery(
    ["colors", pageNumber],
    fetchColors,
    { keepPreviousData: true }
  );

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <h1>Colors</h1>
      <ul>
        {data && data.data.map((item) => <li key={item.id}>{item.label}</li>)}
      </ul>

      <button
        onClick={() => setPageNumber((p) => p - 1)}
        disabled={pageNumber === 1}
      >
        prev
      </button>
      <button
        onClick={() => setPageNumber((p) => p + 1)}
        disabled={pageNumber === 4}
      >
        next
      </button>
      {isFetching && <h5>Loading...</h5>}
    </div>
  );
};

export default PaginatedQueries;
