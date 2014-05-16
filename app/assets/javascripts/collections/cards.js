Trellino.Collections.Cards = Backbone.Collection.extend({
  initialize: function (options) {
    this.list = options.list;
  },

  comparator: function (card) {
    return card.get('rank');
  }
});