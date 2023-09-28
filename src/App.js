import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "./components/Posts";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [resultsPerPage] = useState(10);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         `https://jsonplaceholder.typicode.com/todos`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setResults(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
      setResults(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const indexOfLastTask = currPage * resultsPerPage;
  const indexOfFirstTask = indexOfLastTask - resultsPerPage;
  const currTasks = results.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrPage(pageNumber);
  const increment = () => {
    setCurrPage((prev) => prev + 1);
  };
  const decrement = () => {
    setCurrPage((prev) => prev - 1);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>userId</th>
            <th>id</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {currTasks.map((result) => (
            <Posts key={result.id} result={result} loading={loading} />
          ))}
        </tbody>
      </table>
      <section className="pagination">
        <button
          className="first-page-btn"
          disabled={loading || currPage === 1}
          onClick={() => paginate(1)}
        >
          first
        </button>
        <button
          className="previous-page-btn"
          disabled={loading || currPage === 1}
          onClick={decrement}
        >
          previous
        </button>
        <button
          className="next-page-btn"
          disabled={loading || currPage === 20}
          onClick={increment}
        >
          next
        </button>
        <button
          className="last-page-btn"
          disabled={loading || currPage === 20}
          onClick={() => paginate(20)}
        >
          last
        </button>
      </section>
    </>
  );
}

export default App;
