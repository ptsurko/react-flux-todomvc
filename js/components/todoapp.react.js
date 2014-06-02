/** @jsx React.DOM */
var TodoFilter = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2
};

var TodoAppComponent = React.createClass({
  getInitialState: function() {
    return { 
      todos: new TodoList(),
      filter: TodoFilter.ALL
    };
  },
  componentDidMount: function() {
    this.state.todos.on('add remove reset', _.bind(this.onTodocChange_, this));
  },
  onTodocChange_: function() {
    this.forceUpdate(function() {});
  },
  onFilterChange_: function(newFilter) {
    this.setState({filter: newFilter})
  },
  onTodoDelete_: function(todo) {
    this.state.todos.remove(todo);
  },
  getFilterFunction_: function() {
    switch(this.state.filter) {
      case TodoFilter.ALL:
        return function(todo) {
          return true;
        };
      case TodoFilter.ACTIVE:
        return function(todo) {
          return todo.get('completed') == false;
        };
      case TodoFilter.COMPLETED:
        return function(todo) {
          return todo.get('completed') == true;
        };
      default:
        throw "Filtering for " + this.state.filter + " not implemented";
    }
  },
  render: function() {
    var filteredTodos = this.state.todos.filter(this.getFilterFunction_());
      return (
        <div id="todoapp">
          <h1>todos</h1>
          <TodoListHeaderComponent todos={this.state.todos} />
          <TodoListComponent todos={filteredTodos} onTodoDelete={this.onTodoDelete_} />
          <TodoListFooterComponent todos={this.state.todos} filter={this.state.filter} onFilterChange={this.onFilterChange_} />
        </div>
        );
  }
});