/** @jsx React.DOM */

var TodoItemMode = {
  VIEW: 0,
  EDIT: 1
};

var TodoItemComponent = React.createClass({
  getInitialState: function() {
    return {
      mode: TodoItemMode.VIEW
    };
  },
  componentDidMount: function() {
    this.props.todo.on('change:completed', _.bind(this.onCompleteChange_, this));
  },
  componentDidUnmount: function() {
    this.props.todo.off();
  },
  onCompleteChange_: function() {
    this.forceUpdate(function() { });
  },
  onToggleCheck_: function(e) {
    this.props.todo.set('completed', e.target.checked);
  },
  onStartEditing_: function() {
    this.setState({mode: TodoItemMode.EDIT});
  },
  onKeyDown_: function(e) {
    if (e.keyCode == 13) {
      this.completeEditing_();
    }
  },
  completeEditing_: function() {
    var todoTitle = this.refs.todoTitle.getDOMNode().value;
    if (todoTitle && todoTitle.trim().length > 0) {
      this.props.todo.set('title', todoTitle);
      this.setState({mode: TodoItemMode.VIEW});
    } else {
      this.props.onDelete();
    }
  },
  render: function() {
    var content;
    var classNames = [];
    if (this.props.todo.get('completed')) {
      classNames.push('completed');
    }
    switch(this.state.mode) {
      case TodoItemMode.VIEW:
        content = (
          <div className="view">
            <input type="checkbox" className="toggle" checked={this.props.todo.get('completed')} onChange={this.onToggleCheck_} />
            <label>{this.props.todo.get('title')}</label>
            <button className="destroy" onClick={this.props.onDelete}></button>
          </div>);
        break;
      case TodoItemMode.EDIT:
        classNames.push('editing');
        content = (
          <input type="text" ref="todoTitle" className="edit" defaultValue={this.props.todo.get('title')} 
                 onBlur={this.completeEditing_} onKeyDown={this.onKeyDown_} autoFocus={true}/>);
        break;
      default:
        throw "Mode  " + this.state.mode + " not implemented.";
    }
    
    return (
        <li className={classNames.join(' ')} onDoubleClick={this.onStartEditing_}>
          {content}
        </li>
      );
  }
});