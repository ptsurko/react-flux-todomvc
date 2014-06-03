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
    this.state.todos.fetch();
    this.state.todos.on('add remove', this.onTodoChange_, this);
    this.state.todos.on('change:completed', this.onCompletedChange_, this);

    var currentRoute = Router.routes[Backbone.history.fragment];
    this.setState({filter: this.getFilterFromRoute(currentRoute)});

    this.forceUpdate();

    Router.on('route', function(route) { 
      this.setState({filter: this.getFilterFromRoute(route)}); 
    }, this);
  },
  componentDidUnmount: function() {
    this.state.todos.off();
    Router.off();
  },
  onCompletedChange_: function() {
    if (this.state.filter != TodoFilter.ALL) {
      this.forceUpdate(function() {});
    }
  },
  onTodoChange_: function() {
    this.forceUpdate(function() {});
  },
  onTodoDelete_: function(todo) {
    todo.destroy();
  },
  onTodoCreate_: function(todo) {
    this.state.todos.create(todo);
  },
  onToggleAll_: function() {
    this.state.todos.forEach(function(todo) {
      todo.save();
    });
  },
  getFilterFromRoute: function(route) {
    switch (route) {
      case 'default':
        return TodoFilter.ALL;
      case 'active':
        return TodoFilter.ACTIVE;
      case 'completed':
        return TodoFilter.COMPLETED;
      default:
        throw "Route " + route + " is not supported here";
    }
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
          <TodoListHeaderComponent todos={filteredTodos} onTodoCreate={this.onTodoCreate_} onToggleAll={this.onToggleAll_} />
          <TodoListComponent todos={filteredTodos} onTodoDelete={this.onTodoDelete_} />
          <TodoListFooterComponent todos={this.state.todos} filter={this.state.filter} onFilterChange={this.onFilterChange_} />
        </div>
        );
  }
});