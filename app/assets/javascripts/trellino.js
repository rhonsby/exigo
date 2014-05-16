window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Trellino.Collections.boards = new Trellino.Collections.Boards();

    new Trellino.Routers.BoardsRouter({
      '$rootEl': $('#content'),
      'boards': Trellino.Collections.boards
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});
