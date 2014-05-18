Trellino.Views.BoardsNewView = Backbone.View.extend({
  template: JST["boards/new"],

  events: {
    'submit #new-board-form': 'handleSubmit'
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().board;
    var board = new Trellino.Models.Board(formData);

    board.save({}, {
      success: function (resp) {
        Trellino.Collections.boards.add(board);
        Backbone.history.navigate('#/boards/' + board.id, { trigger: true });
        this.$('input').val('');
      }
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
});
