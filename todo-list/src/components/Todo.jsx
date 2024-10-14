import React from "react";
import edit from "../assets/edit.png";
import bin from "../assets/delete.png";
import close from "../assets/close.png";

class Todo extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.todo.checked !== this.props.todo.checked ||
      nextProps.todo.name !== this.props.todo.name ||
      nextProps.editingIndex !== this.props.editingIndex ||
      nextProps.tempName !== this.props.tempName 
    );
  }

  render() {
    const {
      todo,
      onTodoChecked,
      handleTodoDelete,
      handleEditTodo,
      handleCloseEditTodo,
      editingIndex,
      handleTempNameChange,
      tempName,
    } = this.props;

    const isEditing = editingIndex === todo.id;
    console.log(`todo ${todo.name}`)
    return (
      <li
        style={{
          color: todo.checked ? "grey" : "black",
          textDecoration: todo.checked ? "line-through" : "none",
        }}
        className="todo"
      >
        <label className="container">
          <input type="checkbox" checked={todo.checked} onChange={onTodoChecked} />
          <span className="checkmark"></span>
        </label>
        <div className="todoElement">
          <div className="todoHead">
            {isEditing ? (
              <input
                className="editTodoName"
                value={tempName}
                onChange={handleTempNameChange}
              />
            ) : (
              <strong className="todoName">{todo.name}</strong>
            )}
            <span className="todoCreatedDate">{todo.created}</span>
            <div className="buttons">
              <button className="deleteButton" onClick={handleTodoDelete}>
                <img src={bin} width="15px" height="15px" alt="Delete" />
              </button>
              <button className="editButton" onClick={() => handleEditTodo(todo.id)}>
                <img src={edit} width="15px" height="15px" alt="Edit" />
              </button>
              {isEditing && (
                <button className="closeEditButton" onClick={handleCloseEditTodo}>
                  <img src={close} width="15px" height="15px" alt="Close" />
                </button>
              )}
            </div>
          </div>
          <div className="todoBody">{todo.body}</div>
          {todo.todoImportancy && <div className="severity">{todo.todoImportancy}</div>}
        </div>
      </li>
    );
  }
}

export default React.memo(Todo);
