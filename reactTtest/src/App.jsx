import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  function setInfo(e) {
    setInput(e.target.value);
  }
  function setItem() {
    setList([...list, input]);
    setInput("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>To do List</h1>
      {input.length === 0 && <h2>Write Something</h2>}
      <input placeholder="Write here" onChange={setInfo} value={input} />

      <button onClick={setItem}>Add</button>
      {list.length > 0 && <h2>What you wrote was:</h2>}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
