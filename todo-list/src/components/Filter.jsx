import React from "react";

class Filter extends React.PureComponent {
    render() {
      const {
        onFilterUnfinished,
        onFilterTodoSearch,
        onFilterImportancy,
        todoSearchValue,
        filterImportancy,
      } = this.props;
      return (
        <div className="todoFilters">
          <div className="filterTodo">
            <p>Фильтр : </p>
            <input type="checkbox" onChange={onFilterUnfinished} />
            <p>Только невыполненные</p>
          </div>
          <input
            type="search"
            value={todoSearchValue}
            onChange={onFilterTodoSearch}
            className="searchTodo"
          />
          <div className="importancyTodo">
            <p> Важность </p>
            <label htmlFor="urgently">Срочно</label>
            <input
              type="checkbox"
              name="urgently"
              value={"urgently"}
              checked={filterImportancy.includes("urgently")}
              onChange={onFilterImportancy}
            />
            <label htmlFor="average">Средне</label>
            <input
              type="checkbox"
              name="average"
              value={"average"}
              checked={filterImportancy.includes("average")}
              onChange={onFilterImportancy}
            />
            <label htmlFor="notUrgently">Не срочно</label>
            <input
              type="checkbox"
              name="notUrgently"
              value={"notUrgently"}
              checked={filterImportancy.includes("notUrgently")}
              onChange={onFilterImportancy}
            />
          </div>
        </div>
      );
    }
  }

export default Filter;