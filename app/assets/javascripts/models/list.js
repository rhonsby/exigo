Trellino.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",

  parseCards: function () {
    var cards = this.get('cards');
    var that = this;

    _(cards).each(function (cardData) {
      var card = new Trellino.Models.Card(cardData);
      that.cards().add(card);
    });

    delete this.cards;
  },

  cards: function () {
    if (!this._cards) {
      this._cards = new Trellino.Collections.Cards([], {
        list: this
      });
    }

    return this._cards;
  }
});