/** @jsx React.DOM */

var TodoListFooterComponent = React.createClass({
  componentDidMount: function() {
    this.props.todos.on('change:completed', _.bind(this.forceUpdate, this, function() {}));
  },
  onClearCompleted_: function() {
    var completedTodos = this.props.todos.filter(function(todo) {
      return todo.get('completed');
    });
    completedTodos.forEach(function(todo) {
      todo.destroy();
    });
  },
  render: function() {
    var completedTodos = this.props.todos.filter(function(todo) {
      return todo.get('completed') == true;
    });

    var todosLeftCount = _.size(this.props.todos) - _.size(completedTodos);
    var todosCompletedCount = _.size(completedTodos);

    var clearCompletedButton;
    if (todosCompletedCount > 0) {
      clearCompletedButton = 
        <button id="clear-completed" onClick={this.onClearCompleted_}>
          Clear completed (<span>{todosCompletedCount}</span>)
        </button>;
    }

    return (
        <footer id="footer">
          <span id="todo-count">
            <strong>{todosLeftCount}</strong>&nbsp;
            items left
          </span>
          <ul id="filters">
            <li>
              <a href="#" className={this.props.filter == TodoFilter.ALL ? 'selected' : ''}>All</a>
            </li>
            <li>
              <a href="#active" className={this.props.filter == TodoFilter.ACTIVE ? 'selected' : ''}>Active</a>
            </li>
            <li>
              <a href="#completed" className={this.props.filter == TodoFilter.COMPLETED ? 'selected' : ''}>Completed</a>
            </li>
          </ul>
          {clearCompletedButton}
        </footer>);
  }
});