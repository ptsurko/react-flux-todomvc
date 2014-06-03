/** @jsx React.DOM */

var TodoListHeaderComponent = React.createClass({
    getInitialState: function() {
        return {
            newTodoTitle: '',
            completed: false
        };
    },
    onToggleAllCheck_: function(e) {
        var completed = e.target.checked;
        
        this.props.todos.forEach(function(todo){
            todo.set('completed', completed);
        });
        this.props.onToggleAll();

        this.setState({completed: completed});
    },
    onKeyDown_: function(e) {
        if (e.keyCode == 13 && this.state.newTodoTitle && this.state.newTodoTitle.length > 0) {
            var todo = new TodoItem({
                title: this.state.newTodoTitle,
                completed: this.state.completed
            });
            this.props.onTodoCreate(todo);
            this.setState({newTodoTitle: '', completed: false});
        }
    },
    onNewTodoChange_: function(e) {
        this.setState({newTodoTitle: e.target.value});
    },
    render: function() {
        return (
            <header id="header">
                <input type="checkbox" id="toggle-all" onChange={this.onToggleAllCheck_} checked={this.state.completed}/>
                <input type="new-todo" id="new-todo" value={this.state.newTodoTitle} onChange={this.onNewTodoChange_} onKeyDown={this.onKeyDown_} placeholder="What needs to be done?" />
            </header>);
    }
});