import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  function setInfo(e) {
    setInput(e.target.value);
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Input</h1>
      <input placeholder="Write here" onChange={setInfo} value={input} />
      {input.length === 0 && <h2>Write Something</h2>}
      {input.length > 0 && <h2>What you wrote was: {input}</h2>}
    </div>
  );
}

export default App;
