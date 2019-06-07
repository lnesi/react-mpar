import React, { useState } from "react";

export default ({ title, copy }) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <small>SyncTestComponent</small>
      <h1>{title}</h1>
      <p>{copy}</p>
      <p>
        <strong>Count:</strong>
        <span>{count}</span>
      </p>
      <p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +1
        </button>
      </p>
    </div>
  );
};
