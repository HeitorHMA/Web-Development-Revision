import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
    if (input.trim() === "") return;
    setList([...list, input]);
    setInput("");
  }

  function deleteItem(indexToDelete) {
    const newList = list.filter((item, index) => index != indexToDelete);
    setList(newList);
  }

  const [catFact, setCatFact] = useState("");

  function catFinderFunction() {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.fact);
        setCatFact(data.fact);
      });
  }

  useEffect(() => {
    document.title = `Você tem ${list.length} tarefas`;
  }, [list]);

  useEffect(() => {
    localStorage.setItem("my_goals", JSON.stringify(list));
  }, [list]);

  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        {/* Menu de Navegação do Router */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>

        {/* Definição das Rotas */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>To do List</h1>
                {input.length === 0 && <h2>Write a goal</h2>}
                <input
                  placeholder="Write here"
                  onChange={setInfo}
                  value={input}
                />
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
                <h3>{catFact ? catFact : "Cat Fact Finder"}</h3>
                <button onClick={catFinderFunction}>FIND CAT FACT</button>
              </div>
            }
          />
          <Route path="/about" element={<h1>Sobre Mim / About Page</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
