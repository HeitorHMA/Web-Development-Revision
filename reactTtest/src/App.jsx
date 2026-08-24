import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  function augment() {
    setCounter(counter + 1);
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Counter: {counter}</h1>
      <button onClick={augment}>Augment</button>
    </div>
  );
}

export default App;
