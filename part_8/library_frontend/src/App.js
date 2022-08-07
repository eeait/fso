import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED, LOGIN } from "./queries";

const Notification = ({ notification }) => {
  return <b>{notification}</b>;
};

const Login = ({ token, setToken, notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (e) => {
      notify(e.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const Buttons = ({ loggedIn, setPage, logOut }) => {
  return (
    <div>
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      {loggedIn && <button onClick={() => setPage("add")}>add book</button>}
      {loggedIn && (
        <button onClick={() => setPage("recommendations")}>
          recommendations
        </button>
      )}
      {loggedIn && <button onClick={() => logOut()}>logout</button>}
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [notification, setNotification] = useState("");
  const client = useApolloClient();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("library-user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ onSubscriptionData }) => {
      window.alert("NEW BOOK");
    },
  });

  const notify = (notification) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const logOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    console.log("LOGGING OUT");
    notify("successfully logged out");
  };

  return (
    <div>
      <Notification notification={notification}></Notification>
      {!token && <Login setToken={setToken} notify={notify}></Login>}
      <Buttons
        loggedIn={token ? true : false}
        setPage={setPage}
        logOut={logOut}
      ></Buttons>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommendations show={page === "recommendations"} />
    </div>
  );
};

export default App;
