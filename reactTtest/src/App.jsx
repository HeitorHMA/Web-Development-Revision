import { useState, useEffect } from "react";
function GoalItem({ text, onDelete }) {
  return (
    <li>
      {text}
      <button onClick={onDelete} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </li>
  );
}

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("my_goals");
    return savedList ? JSON.parse(savedList) : [];
  });
  function setInfo(e) {
    setInput(e.target.value);
  }
  function setItem() {
    setList([...list, input]);
    setInput("");
  }
  function deleteItem(indexToDelete) {
    const newList = list.filter((item, index) => index != indexToDelete);
    setList(newList);
  }
  function catFinderFunction() {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.fact);
      });
  }
  useEffect(() => {
    document.title = `Você tem ${list.length} tarefas`;
  }, [list]);
  useEffect(() => {
    localStorage.setItem("my_goals", JSON.stringify(list));
  }, [list]);
  return (
    <div style={{ padding: "20px" }}>
      <h1>To do List</h1>
      {input.length === 0 && <h2>Write an goal</h2>}
      <input placeholder="Write here" onChange={setInfo} value={input} />

      <button onClick={setItem}>Add</button>
      {list.length > 0 && <h2>Your goals are:</h2>}
      <ul>
        {list.map((item, index) => (
          <GoalItem
            key={index}
            text={item}
            onDelete={() => deleteItem(index)}
          />
        ))}
      </ul>
      <h3>Cat Fact Finder</h3>
      <button onClick={catFinderFunction}>FIND CAT FACT</button>
    </div>
  );
}

export default App;
