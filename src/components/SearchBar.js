import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { TodosConsumer } from "../contexts/TodosContext";

export class SearchBar extends Component {
  render() {
    return (
      <TodosConsumer>
        {({ searchTodos }) => (
          <InputGroup className="mb-4">
            <InputGroup.Text className="border-end-0 bg-transparent">
              &#128269;
            </InputGroup.Text>
            <Form.Control
              onChange={searchTodos}
              className="border-start-0"
              placeholder="Search for a todo..."
            />
          </InputGroup>
        )}
      </TodosConsumer>
    );
  }
}

export default SearchBar;
