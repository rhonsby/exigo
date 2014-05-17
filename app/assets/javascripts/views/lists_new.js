Trellino.Views.NewListsView = Backbone.View.extend({
  template: JST['lists/new'],

  initialize: function (options) {
    this.board = options.board;
  },

  events: {
    'submit #new-list-form': 'handleSubmit'
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().list;
    var list = new Trellino.Models.List(formData);
    list.board = this.board;
    var view = this;

    debugger
    list.save({ rank: this.board.lists().length + 1 }, {
      success: function () {
        view.board.lists().add(list);
      }
    });
  },

  render: function () {
    var renderedContent = this.template({
      board: this.board,
    });

    this.$el.html(renderedContent);
    return this;
  }
});