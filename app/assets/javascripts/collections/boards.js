Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  model: Trellino.Models.Board,

  getOrFetch: function (id) {
    var that = this;
    var board = this.get(id);

    if (board) {
      board.fetch();
    } else {
      board = new Trellino.Models.Board({ id: id });
      board.fetch({
        success: function () {
          that.add(board);
        }
      });
    }

    return board;
  }
});