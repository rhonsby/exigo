Trellino.Views.ListShowView = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  className: 'list',

  events: {
    "mouseenter": "showTrashButton",
    "mouseleave": "hideTrashButton",
    "click .list-delete-btn": "handleListDeletion"
  },

  showTrashButton: function () {
    this.$('.list-delete-btn').removeClass('hidden');
  },

  hideTrashButton: function () {
    this.$('.list-delete-btn').addClass('hidden');
  },

  handleListDeletion: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  render: function () {
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});