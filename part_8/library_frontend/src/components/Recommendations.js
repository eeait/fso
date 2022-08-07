import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import { BookTable } from "./Books";

const FavoriteTable = ({ genre }) => {
  const favoriteBooksResult = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  return favoriteBooksResult.loading ? (
    "loading"
  ) : (
    <BookTable booksResultData={favoriteBooksResult.data} />
  );
};

const Recommendations = (props) => {
  const meResult = useQuery(ME);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommended for you</h2>
      {meResult.loading ? (
        "loading"
      ) : (
        <FavoriteTable genre={meResult.data.me.favoriteGenre} />
      )}
    </div>
  );
};

export default Recommendations;
