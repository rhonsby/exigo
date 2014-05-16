Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",

  getOrFetch: function (id) {
    var board = this.get({id: id});
    var that = this;

    if (!board) {
      board = new Trellino.Models.Board({id: id});
      board.fetch({
        success: function () {
          that.add(board);
        }
      });
    }

    return board;
  }
});