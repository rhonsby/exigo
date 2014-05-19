Trellino.Views.CardForm = Backbone.View.extend({
  template: JST["cards/form"],

  initialize: function (options) {
    this.list = options.list;
  },

  events: {
    'submit #new-card-form': 'handleSubmit',
    'click #close-card-form': 'removeForm'
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().card;
    var card = new Trellino.Models.Card(formData);
    var list = this.list;
    var newRank = this.list.cards().length + 1;

    card.set('list_id', this.list.get('id'));
    card.save({ rank: newRank }, {
      success: function () {
        list.cards().add(card);
      }
    });

    this.remove();
  },

  removeForm: function (event) {
    event.preventDefault();
    this.remove();
  }
});