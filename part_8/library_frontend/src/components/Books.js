import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries.js";

const Books = (props) => {
  if (!props.show) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useQuery(ALL_BOOKS)
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log("RESULT", result)

  const allBooks = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>Just couldn't make this work</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
