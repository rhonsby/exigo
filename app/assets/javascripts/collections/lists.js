Trellino.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists",

  initialize: function (options) {
    this.board = options.board;
  },

  comparator: function (list) {
    return list.get('rank');
  }
});