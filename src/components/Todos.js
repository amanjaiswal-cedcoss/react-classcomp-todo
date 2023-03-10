import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { LoaderConsumer } from "../contexts/LoaderContext";
import { ThemeConsumer } from "../contexts/ThemeContext";
import { TodosConsumer } from "../contexts/TodosContext";
import loader from "../assets/loading.gif";

export class Todos extends Component {
  render() {
    return (
      <ThemeConsumer>
        {(theme) => (
          <LoaderConsumer>
            {(loading) => (
              <TodosConsumer>
                {({ changeTodoStatus, refinedTodos }) => (
                  <>
                    <h5>Todos List</h5>
                    {loading ? (
                      <div className="text-center">
                        <span>Loading...</span>
                        <img className="loader" src={loader} alt="loader" />
                      </div>
                    ) : (
                      ""
                    )}
                    {refinedTodos.length > 0 ? (
                      refinedTodos.map((ele, index) => (
                        <Card key={ele.id} className={`todo ${theme}`}>
                          {ele.todo}
                          <input
                            onChange={() => {
                              changeTodoStatus(index);
                            }}
                            checked={ele.completed}
                            type="checkbox"
                          />
                        </Card>
                      ))
                    ) : !loading ? (
                      <h6 className="text-center my-3">No results found :(</h6>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </TodosConsumer>
            )}
          </LoaderConsumer>
        )}
      </ThemeConsumer>
    );
  }
}

export default Todos;
