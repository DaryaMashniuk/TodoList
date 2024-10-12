import React from "react";
import edit from "../assets/edit.png";
import bin from "../assets/delete.png";
import close from "../assets/close.png";

class Todo extends React.PureComponent {
    render() {
      const {
        todo,
        index,
        onTodoChecked,
        handleTodoDelete,
        handleEditTodo,
        handleCloseEditTodo,
        todoImportancy,
        editingIndex,
        handleTempNameChange,
        tempName,
      } = this.props;
  
      const isEditing = editingIndex === index;
  
      return (
        <li
          style={{
            color: todo.checked ? "grey" : "black",
            textDecoration: todo.checked ? "line-through" : "none",
          }}
          className="todo"
        >
          <label className="container">
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={onTodoChecked}
            />
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
                <button
                  className="editButton"
                  onClick={() => handleEditTodo(index)}
                >
                  <img src={edit} width="15px" height="15px" alt="Edit" />
                </button>
                {isEditing && (
                  <button
                    className="closeEditButton"
                    onClick={() => handleCloseEditTodo(index)}
                  >
                    <img src={close} width="15px" height="15px" alt="Close" />
                  </button>
                )}
              </div>
            </div>
            <div className="todoBody">{todo.body}</div>
            {todoImportancy ?<div className="severity">{todoImportancy}</div> 
            :""}
          </div>
        </li>
      );
    }
  }

export default Todo;