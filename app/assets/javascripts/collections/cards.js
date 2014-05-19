Trellino.Collections.Cards = Backbone.Collection.extend({
  model: Trellino.Models.Card,

  initialize: function (options) {
    this.list = options.list;
  },

  comparator: function (card) {
    return card.get('rank');
  }
});
