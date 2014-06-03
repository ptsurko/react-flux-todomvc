
var TodoRouter = Backbone.Router.extend({
  routes: {
    '': 'default',
    'active': 'active',
    'completed': 'completed',
  }
});

var Router = new TodoRouter();
Backbone.history.start();