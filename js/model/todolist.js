
var TodoList = Backbone.Collection.extend({
    model: TodoItem,
    localStorage: new Backbone.LocalStorage('todos-react-backbone'),
});