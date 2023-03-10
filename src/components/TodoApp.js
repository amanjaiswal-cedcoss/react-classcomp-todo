import React, { Component } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
import { TodosProvider } from "../contexts/TodosContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import { DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LoaderProvider } from "../contexts/LoaderContext";

export class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      loading: true,
      theme: "light",
      search: "",
    };
  }

  // fetching data for todos
  componentDidMount() {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          ...this.state,
          todos: data.todos,
          loading: false,
        });
      });
  }

  // fn to change status of todo
  changeTodoStatus = (index) => {
    let todos = this.state.todos;
    todos[index].completed = !todos[index].completed;
    this.setState({ ...this.state, todos: todos });
  };

  // fn to change add of todo
  addTodo = (todo) => {
    if (todo === "") {
      alert("Please fill some info to add a todo");
      return;
    }
    let tempTodo = {
      id: this.state.todos.length + 1,
      todo: todo,
      completed: false,
    };
    this.setState({ ...this.state, loading: true });
    setTimeout(() => {
      this.setState({
        ...this.state,
        todos: [...this.state.todos, tempTodo],
        loading: false,
      });
    }, 1000);
  };

  // fn to update the search query
  searchTodos = (e) => {
    this.setState({ ...this.state, search: e.target.value });
  };

  // fn to toggle theme between dark and light
  toggleTheme = () => {
    let theme = this.state.theme === "dark" ? "light" : "dark";
    this.setState({ ...this.setState, theme: theme });
  };

  render() {
    const refinedTodos = this.state.todos.filter((ele) =>
      ele.todo.toLowerCase().includes(this.state.search.toLowerCase())
    );
    return (
      <ThemeProvider value={this.state.theme}>
        <LoaderProvider value={this.state.loading}>
          <TodosProvider
            value={{
              changeTodoStatus: this.changeTodoStatus,
              addTodo: this.addTodo,
              refinedTodos: refinedTodos,
            }}
          >
            <Card className={`container ${this.state.theme}`}>
              <Card.Header className="container__head">
                <h2>Todos</h2>
                <button
                  onClick={this.toggleTheme}
                  className="border-0 bg-transparent p-2 "
                >
                  {this.state.theme === "light" ? (
                    <WbSunnyOutlined />
                  ) : (
                    <DarkModeOutlined />
                  )}
                </button>
              </Card.Header>
              <Card.Body>
                <InputGroup className="mb-4">
                  <InputGroup.Text className="border-end-0 bg-transparent">
                    &#128269;
                  </InputGroup.Text>
                  <Form.Control
                    onChange={this.searchTodos}
                    className="border-start-0"
                    placeholder="Search for a todo..."
                  />
                </InputGroup>
                <AddTodo />
                <Todos />
              </Card.Body>
            </Card>
          </TodosProvider>
        </LoaderProvider>
      </ThemeProvider>
    );
  }
}

export default TodoApp;
