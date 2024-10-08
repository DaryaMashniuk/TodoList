import React from "react";
import "./App.css";
import Todo from "./Todo";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      valueName: "",
      valueBody: "",
      allTodos: [
        {
          id: Date.now(),
          name: "Новая задача",
          body: "Описание новой задачи",
          checked: false,
          created: new Date().toLocaleString(),
        },
      ],
      visibleTodos: [
        {
          id: Date.now(),
          name: "Новая задача",
          body: "Описание новой задачи",
          checked: false,
          created: new Date().toLocaleString(),
        },
      ],
      // filters: [
      //   // this.handleFilterUnfinished,

      //      (todos) => {
      //       return todos.sort((todo1, todo2) => {
      //         todo1.created - todo2.created;
      //       });
      //     },


      //     (todos) => {
      //       return todos.filter((todo) => {
      //         todo.checked = true;
      //       });
      //     },
      // ],
      isFilterUnfinishedOn: "",
      editingIndex: null,
      tempName: "",
    };
  }

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

    this.setState({
      nameError: nameError,
      bodyError: bodyError,
    });

    return nameError || bodyError ? true : false;
  };

  handleInputTodoChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, [`${name}Error`]: "" });
  };

  handleTodoAdd = (e) => {
    e.preventDefault();
    if (!this.handleInputMistakes()) {
      this.setState({
        valueName: "",
        valueBody: "",
        visibleTodos: [
          {
            id: Date.now(),
            name: this.state.valueName,
            body: this.state.valueBody,
            checked: false,
            created: new Date().toLocaleString(),
          },
          ...this.state.visibleTodos,
        ],
        allTodos: [
          {
            id: Date.now(),
            name: this.state.valueName,
            body: this.state.valueBody,
            checked: false,
            created: new Date().toLocaleString(),
          },
          ...this.state.allTodos,
        ],
      });
    }
  };

  handleTodoChecked = (index) => (e) => {
    const newTodo = {
      ...this.state.allTodos[index],
      checked: e.target.checked,
    };
    const newAllTodos = this.state.allTodos
      .map((todo, i) => (i === index ? newTodo : todo))
      .sort((a, b) => a.checked - b.checked);
    this.setState(
      {
        allTodos: newAllTodos,
      },
      () => {
        this.handleFilterUnfinished();
      }
    );
  };

  handleTodoDelete = (index) => (e) => {
    const newTodos = this.state.visibleTodos.filter((todo, i) => {
      return i !== index;
    });
    const newAllTodos = this.state.allTodos.filter((todo, i) => {
      return i !== index;
    });
    this.setState({
      visibleTodos: newTodos,
      allTodos: newAllTodos,
    });
  };

  handleFilterUnfinished = (e) => {
    let isFilterOn = this.state.isFilterUnfinishedOn;
    if (e) {
      isFilterOn = e.target.checked;
    }

    const unfinishedTodos = this.state.allTodos.filter((todo) => {
      return todo.checked !== true;
    });
    if (isFilterOn) {
      this.setState({
        visibleTodos: unfinishedTodos,
        isFilterUnfinishedOn: isFilterOn,
      });
    } else {
      this.setState({
        visibleTodos: this.state.allTodos,
        isFilterUnfinishedOn: isFilterOn,
      });
    }
  };

  handleEditTodo = (index) => {
    if (this.state.editingIndex === index) {
      const newTodos = [...this.state.visibleTodos];
      const newAllTodos = [...this.state.allTodos];
      newTodos[index].name = this.state.tempName;
      newAllTodos[index].name = this.state.tempName;
      this.setState({
        visibleTodos: newTodos,
        allTodos: newAllTodos,
        editingIndex: null,
        tempName: "",
      });
    } else {
      this.setState({
        editingIndex: index,
        tempName: this.state.visibleTodos[index].name,
      });
    }
  };

  handleCloseEditTodo = (index) => {
    this.setState({
      editingIndex: null,
      tempName: "",
    });
  };

  handleTempNameChange = (e) => {
    this.setState({
      tempName: e.target.value,
    });
  };
  // handleCreateVisibleTodos = () => {
  //   // const newVisibleTodos = this.state.allTodos.filter(()=>{

  //   // })

  //   // this.setState({
  //   //   visibleTodos:newVisibleTodos
  //   // })
  //   const todos = this.state.allTodos;
  //   console.log(
  //     todos.map( todo => {
  //       this.state.filters.reduce((acc,cur)=> cur(acc), todo)
  //     })
  //   );
  // };
  // componentDidMount() {
  //   console.log("did mount");
  //   this.handleCreateVisibleTodos();
  // }
  render() {
    return (
      <div className="wrapper">
        <h1> Todo list </h1>
        <form>
          <input
            name="valueName"
            value={this.state.valueName}
            onChange={this.handleInputTodoChange}
            placeholder="Название задачи"
            className="inputTodo"
          />
          <input
            name="valueBody"
            value={this.state.valueBody}
            onChange={this.handleInputTodoChange}
            placeholder="Описание задачи"
            className="inputTodo"
          />
          <button onClick={this.handleTodoAdd}> Добавить задачу </button>

          {this.state.nameError && (
            <p className="errorText">{this.state.nameError}</p>
          )}
          {this.state.bodyError && (
            <p className="errorText">{this.state.bodyError}</p>
          )}
        </form>

        <div className="todoSection">
          <Filter onFilterUnfinished={this.handleFilterUnfinished} />
          <ul>
            {this.state.visibleTodos.map((todo, index) => {
              return (
                <Todo
                  todo={todo}
                  index={index}
                  onTodoChecked={this.handleTodoChecked(index)}
                  handleTodoDelete={this.handleTodoDelete(index)}
                  handleEditTodo={this.handleEditTodo}
                  handleTempNameChange={this.handleTempNameChange}
                  handleCloseEditTodo={this.handleCloseEditTodo}
                  editingIndex={this.state.editingIndex}
                  tempName={this.state.tempName}
                  key={todo.id}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

class Filter extends React.Component {
  render() {
    const { onFilterUnfinished } = this.props;
    return (
      <div className="filterTodo">
        <p>Фильтр : </p>
        <input type="checkbox" onChange={onFilterUnfinished} />
        <p>Только невыполненные</p>
      </div>
    );
  }
}

export default App;
