import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, ALL_GENRES } from "../queries.js";

const BookFilter = ({ setFilter, genresResultData }) => {
  const genresWithDuplicates = genresResultData.allBooks.reduce(
    (p, c) => p.concat(c.genres),
    []
  );
  const uniqueGenres = [...new Set(genresWithDuplicates)];

  return (
    <div>
      {uniqueGenres.map((g) => (
        <button key={g} type="button" onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
      <button type="button" onClick={() => setFilter("")}>
        all genres
      </button>
    </div>
  );
};

export const BookTable = ({ booksResultData }) => {
  const books = booksResultData.allBooks;
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
          <th>genres</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>Just couldn't make this work</td>
            <td>{a.published}</td>
            <td>{a.genres}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Books = (props) => {
  const [filter, setFilter] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const booksResult = useQuery(
    ALL_BOOKS,
    filter === "" ? {} : { variables: { genre: filter } }
  );
  const genresResult = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      filter by genre:
      {genresResult.loading ? (
        "loading genres"
      ) : (
        <BookFilter
          setFilter={setFilter}
          genresResultData={genresResult.data}
        />
      )}
      {booksResult.loading ? (
        "loadgin books"
      ) : (
        <BookTable booksResultData={booksResult.data} />
      )}
    </div>
  );
};

export default Books;
