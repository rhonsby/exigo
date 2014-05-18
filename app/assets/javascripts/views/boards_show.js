Trellino.Views.BoardsShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add sync', this.render);

    $(document).on('click', '.card', function () {
      alert('hi');
    });
  },

  events: {
    "click #delete-button": "handleBoardDeletion"
  },

  handleBoardDeletion: function (event) {
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate('', {trigger: true});
  },

  // refactor show render to integrate compositeviews
  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    var newListView = new Trellino.Views.NewListsView({
      board: this.model
    });

    var addMemberView = new Trellino.Views.AddMemberView({ model: this.model });

    this.$el.html(renderedContent);
    this.$('#board-controls').prepend(addMemberView.render().$el);
    this.$('#board-controls').prepend(newListView.render().$el);

    return this;
  }
});
