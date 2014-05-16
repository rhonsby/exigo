Trellino.Views.BoardsShowView = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
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