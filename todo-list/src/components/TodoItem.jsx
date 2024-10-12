import React from "react";

class TodoItem extends React.Component{
    state = {
        isEditing: false,
        tempName: this.props.todo.name,
    }

    handleEdit = () => {
        this.setState({ isEditing: true })
    }
    handleSave = () => {
        this.setState({ isEditing: false });
        this.props.onEdit(this.state.tempName);
    }

    handleNameChange = (e) => {
        this.setState({ tempName: e.target.value });
      };

    render() {
        const { todo, onChecked, onDelete } = this.props;
        const { isEditing, tempName } = this.state;
        return (
            <li>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={onChecked}
              />
              {isEditing ? (
                <input value={tempName} onChange={this.handleNameChange} />
              ) : (
                <span>{todo.name}</span>
              )}
              <button onClick={isEditing ? this.handleSave : this.handleEdit}>
                {isEditing ? "Save" : "Edit"}
              </button>
              <button onClick={onDelete}>Delete</button>
            </li>
          );
    }
}

export default TodoItem