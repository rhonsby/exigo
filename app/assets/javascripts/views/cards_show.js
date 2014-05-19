Trellino.Views.CardsShowView = Backbone.View.extend({
  template: JST["cards/show"],
  tagName: "li",
  className: "card ui-state-default well clearfix",

  events: {
    "click .card-delete-btn": "handleCardDeletion",
    "mouseenter": "showDeleteButton",
    "mouseleave": "hideDeleteButton"
  },

  handleCardDeletion: function (event) {
    this.model.destroy();
  },

  showDeleteButton: function () {
    this.$('.card-delete-btn').removeClass('hidden');  
  },

  hideDeleteButton: function () {
    this.$('.card-delete-btn').addClass('hidden');                 
  },

  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});
