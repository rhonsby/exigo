Trellino.Views.BoardsShowView = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    "click #delete-button": "handleBoardDeletion"
  },

  handleBoardDeletion: function (event) {
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate('', {trigger: true});
  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });
    var addMemberView = new Trellino.Views.AddMemberView({model: this.model});

    this.$el.html(renderedContent);
    this.$el.append(addMemberView.render().$el);

    return this;
  }
});