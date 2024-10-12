import React from "react";
import "../assets/App.css";
import Todo from "./Todo";
import Filter from "./Filter";
import CreateTodo from "./CreateTodo";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allTodos: [
        {
          id: uuidv4,
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
      tempName: "",
      todoSearchValue: "",
    };
  }

  componentDidMount() {}

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

  handleTodoChecked = (index) => (e) => {
    const newTodo = {
      ...this.state.allTodos[index],
      checked: e.target.checked,
    };
    const newAllTodos = this.state.allTodos
      .map((todo, i) => (i === index ? newTodo : todo))
      .sort((a, b) => a.checked - b.checked);
    this.setState({ allTodos: newAllTodos });
  };

  handleTodoDelete = (index) => (e) => {
    const newAllTodos = this.state.allTodos.filter((todo, i) => {
      return i !== index;
    });
    this.setState({
      allTodos: newAllTodos,
    });
  };

  handleEditTodo = (index) => {
    if (this.state.editingIndex === index) {
      const newAllTodos = [...this.state.allTodos];
      newAllTodos[index].name = this.state.tempName;
      this.setState({
        allTodos: newAllTodos,
        editingIndex: null,
        tempName: "",
      });
    } else {
      this.setState({
        editingIndex: index,
        tempName: this.state.allTodos[index].name,
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

  render() {
    const filteredTodos = this.state.filters.reduce(
      (todos, filter) => filter.call(this, todos),
      this.state.allTodos
    );
  
    return (
      <div className="wrapper">
        <h1>Todo list</h1>
        <CreateTodo onHandleTodoAdd={this.handleTodoAdd} />
        <div className="todoSection">
          <Filter
            onFilterUnfinished={this.handleFilterUnfinished}
            onFilterTodoSearch={this.handleFilterTodoSearch}
            onFilterImportancy={this.handleFilterImportancy}
            todoSearchValue={this.state.todoSearchValue}
            filterImportancy={this.state.filterImportancy} // Передаем значение фильтра
          />
          <ul>
            {filteredTodos.length > 0 ? ( // Проверка на наличие отфильтрованных задач
              filteredTodos.map((todo, index) => {
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
                    todoImportancy={todo.todoImportancy}
                    tempName={this.state.tempName}
                    key={todo.id}
                  />
                );
              })
            ) : (
              <div>Нет задач, подходящих запросу</div> // Сообщение о том, что нет подходящих задач
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
