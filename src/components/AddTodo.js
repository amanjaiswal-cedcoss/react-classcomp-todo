import React, { Component, createRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { TodosConsumer } from "../contexts/TodosContext";

export class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.refTodo = createRef();
    this.state = {};
  }
  render() {
    return (
      <TodosConsumer>
        {({ addTodo }) => (
          <>
            <h5>Add Todo</h5>
            <InputGroup className="mb-4">
              <Form.Control placeholder="Enter Todo" ref={this.refTodo} />
              <Button
                onClick={() => {
                  addTodo(this.refTodo.current.value);
                  this.refTodo.current.value = "";
                }}
              >
                Add
              </Button>
            </InputGroup>
          </>
        )}
      </TodosConsumer>
    );
  }
}

export default AddTodo;
