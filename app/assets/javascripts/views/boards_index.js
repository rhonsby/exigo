Trellino.Views.BoardsIndexView = Backbone.View.extend({
  template: JST['boards/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    debugger

    var renderedContent = this.template({
      boards: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }
});