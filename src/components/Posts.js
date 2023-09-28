import React from "react";

const Posts = ({ result, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }

  return (
    <tr>
      <td>{result.userId}</td>
      <td>{result.id}</td>
      <td>{result.title}</td>
    </tr>
  );
};

export default Posts;
