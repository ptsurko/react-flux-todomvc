/** @jsx React.DOM */

var TodoListComponent = React.createClass({
  render: function() {
    return (
        <ul id="todo-list">
          {this.props.todos.map(function(todo) {
            console.log(todo.get('id'));
            return (<TodoItemComponent key={todo.get('id')} todo={todo} onDelete={_.bind(this.props.onTodoDelete, this, todo)} />);
          }, this)}
        </ul>
        );
  }
});