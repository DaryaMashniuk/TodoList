import React from "react";
import { v4 as uuidv4} from 'uuid'

class CreateTodo extends React.Component {
  state = {
    valueName: "",
    valueBody: "",
    todoImportancy: "",
    nameError: "",
    bodyError: "",
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleTodoImportancy = (importancy) => {
    this.setState({ todoImportancy: importancy });
  };

  handleInputMistakes = () => {
    const { valueName, valueBody } = this.state;
    let nameError = "";
    let bodyError = "";
    if (valueName === "") {
      nameError = "Название не может быть пустым";
    } else if (valueName.trim().length !== valueName.length) {
      nameError = "Название не должно содержать пробелов в начале или в конце";
    }

    if (valueBody.trim().length !== valueBody.length) {
      bodyError = "Описание не должно содержать пробелов в начале или в конце";
    }

    this.setState({ nameError, bodyError });

    return nameError || bodyError ? true : false;
  };

  handleTodoAdd = (e) => {
    e.preventDefault();
    if (!this.handleInputMistakes()) {
      const newTodo = {
        id: uuidv4(),
        name: this.state.valueName,
        body: this.state.valueBody,
        checked: false,
        created: new Date().toLocaleString(),
        todoImportancy: this.state.todoImportancy,
      };
      this.props.onHandleTodoAdd(newTodo);
      this.setState({
        valueName: "",
        valueBody: "",
        todoImportancy: "",
      });
    }
  };
  render() {
    const { valueName, valueBody, todoImportancy, nameError, bodyError } = this.state;
    return (
      <form>
        <input
          name="valueName"
          value={valueName}
          onChange={this.handleInputChange}
          placeholder="Название задачи"
          className="inputTodo"
        />
        <input
          name="valueBody"
          value={valueBody}
          onChange={this.handleInputChange}
          placeholder="Описание задачи"
          className="inputTodo"
        />
        <div>
          <p>Важность:</p>
          <button
            type="button"
            className="severityButton"
            style={{
              backgroundColor:
                todoImportancy === "urgently" ? "#0c4160" : "white",
            }}
            onClick={() => this.handleTodoImportancy("urgently")}
          >
            Срочно
          </button>
          <button
            type="button"
            className="severityButton"
            style={{
              backgroundColor:
                todoImportancy === "average" ? "#0c4160" : "white",
            }}
            onClick={() => this.handleTodoImportancy("average")}
          >
            Средне
          </button>
          <button
            type="button"
            className="severityButton"
            style={{
              backgroundColor:
                todoImportancy === "notUrgently" ? "#0c4160" : "white",
            }}
            onClick={() => this.handleTodoImportancy("notUrgently")}
          >
            Не срочно
          </button>
        </div>
        <button onClick={this.handleTodoAdd}> Добавить задачу </button>

        {nameError && <p className="errorText">{nameError}</p>}
        {bodyError && <p className="errorText">{bodyError}</p>}
      </form>
    );
  }
}

export default CreateTodo;
