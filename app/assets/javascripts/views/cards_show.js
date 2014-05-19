Trellino.Views.CardsShowView = Backbone.View.extend({
  template: JST["cards/show"],

  className: "card well clearfix",

  events: {
    "click .card-delete-btn": "handleCardDeletion"
  },

  handleCardDeletion: function (event) {
    this.model.destroy();
  },

  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});