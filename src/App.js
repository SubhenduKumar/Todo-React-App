import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Foot from "./components/Foot";
import { useEffect, useState } from "react";
function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilterTodos] = useState([]);
  //want to run once so no dependency array only empty
  useEffect(() => {
    getLocalTodos();
  }, []);
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterTodos(todos.filter((todos) => todos.completed === true));
        break;
      case "uncompleted":
        setFilterTodos(todos.filter((todos) => todos.completed === false));
        break;
      default:
        setFilterTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header style={{display:"block",textAlign: 'center'}}>
        <h2>Todo List App</h2>
        <h5 style={{textAlign: 'center'}}>😉Type Before Think😉</h5>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        status={status}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
      <Foot />
    </div>
  );
}

export default App;
