import React from "react";
import "../assets/App.css";
import Todo from "./Todo";
import Filter from "./Filter";
import CreateTodo from "./CreateTodo";
import { v4 as uuidv4 } from "uuid";
import { generateTodos } from "../utils/generate-todos";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allTodos: [
        {
          id: uuidv4(),
          name: "Новая задача",
          body: "Описание новой задачи",
          checked: false,
          created: new Date().toLocaleString(),
          todoImportancy: "",
        },
      ],
      filters: [
        this.filterUnfinishedTodos,
        this.filterByName,
        this.filterByImportancy,
      ],
      filterImportancy: [],
      isFilterUnfinishedOn: false,
      editingIndex: null,
      tempNames: {},
      todoSearchValue: "",
    };
  }


  generateTodos = ()=> {
    this.setState({
          allTodos: generateTodos(500),
        });
  }
  handleFilterUnfinished = (e) => {
    this.setState({ isFilterUnfinishedOn: e.target.checked });
  };

  handleFilterTodoSearch = (e) => {
    this.setState({ todoSearchValue: e.target.value });
  };

  handleFilterImportancy = (e) => {
    const importancyValue = e.target.value;
    this.setState((prevState) => {
      const filterImportancy = prevState.filterImportancy.includes(
        importancyValue
      )
        ? prevState.filterImportancy.filter((imp) => imp !== importancyValue)
        : [...prevState.filterImportancy, importancyValue];

      return { filterImportancy };
    });
  };

  handleTodoImportancy = (importancy) => {
    this.setState({ todoImportancy: importancy });
  };

  filterUnfinishedTodos = (todos) => {
    return this.state.isFilterUnfinishedOn
      ? todos.filter((todo) => !todo.checked)
      : todos;
  };

  filterByName = (todos) => {
    const { todoSearchValue } = this.state;
    return todoSearchValue
      ? todos.filter((todo) =>
          todo.name.toLowerCase().includes(todoSearchValue.toLowerCase())
        )
      : todos;
  };

  filterByImportancy = (todos) => {
    const { filterImportancy } = this.state;
    return filterImportancy.length > 0
      ? todos.filter((todo) => filterImportancy.includes(todo.todoImportancy))
      : todos;
  };

  handleInputTodoChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, [`${name}Error`]: "" });
  };

  handleTodoAdd = (newTodo) => {
    this.setState((prevState) => ({
      allTodos: [newTodo, ...prevState.allTodos],
    }));
  };

  handleTodoChecked = (id) => (e) => {
    const newAllTodos = this.state.allTodos
      .map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: e.target.checked };
        }
        return todo;
      })
      .sort((a, b) => a.checked - b.checked);

    this.setState({ allTodos: newAllTodos });
  };

  handleTodoDelete = (id) => () => {
    const newAllTodos = this.state.allTodos.filter((todo) => todo.id !== id);
    this.setState({ allTodos: newAllTodos });
  };

  handleEditTodo = (id) => {
    const { allTodos, editingIndex, tempNames } = this.state;
    if (editingIndex === id) {
      const newAllTodos = allTodos.map((todo) =>
        todo.id === id ? { ...todo, name: tempNames[id] || todo.name } : todo
      );
      this.setState({
        allTodos: newAllTodos,
        editingIndex: null, 
        tempNames: { ...this.state.tempNames, [id]: "" },
      });
    } else {
      const todoToEdit = allTodos.find((todo) => todo.id === id);
      this.setState({
        editingIndex: id,
        tempNames: { ...this.state.tempNames, [id]: todoToEdit.name },
      });
    }
  };

  handleCloseEditTodo = () => {
    this.setState({
      editingIndex: null,
    });
  };

  handleTempNameChange = (id) => (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      tempNames: {
        ...prevState.tempNames,
        [id]: value,
      },
    }));
  };

  render() {
    const filteredTodos = this.state.filters.reduce(
      (todos, filter) => filter.call(this, todos),
      this.state.allTodos
    );

    return (
      <div className="wrapper">
        <h1>Todo list</h1>
        <CreateTodo onHandleTodoAdd={this.handleTodoAdd} />
        <div>
        <button className="generateTodos" onClick={this.generateTodos} >Сгенерировать 1000 задач</button></div>
        <div className="todoSection">
          <Filter
            onFilterUnfinished={this.handleFilterUnfinished}
            onFilterTodoSearch={this.handleFilterTodoSearch}
            onFilterImportancy={this.handleFilterImportancy}
            todoSearchValue={this.state.todoSearchValue}
            filterImportancy={this.state.filterImportancy}
          />
          <ul>
            {filteredTodos.length > 0 ? ( 
              filteredTodos.map((todo) => {
                return (
                  <Todo
                  key={todo.id}
                  todo={todo}
                  onTodoChecked={this.handleTodoChecked(todo.id)}
                  handleTodoDelete={this.handleTodoDelete(todo.id)}
                  handleEditTodo={this.handleEditTodo}
                  handleTempNameChange={this.handleTempNameChange(todo.id)}
                  handleCloseEditTodo={this.handleCloseEditTodo}
                  editingIndex={this.state.editingIndex}
                  tempName={this.state.tempNames[todo.id] || todo.name}
                />
                );
              })
            ) : (
              <div>Нет задач, подходящих запросу</div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
