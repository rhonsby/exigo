Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "api/boards",

  parse: function (resp) {
    if (resp.lists) {
      var lists = resp.lists;
      var that = this;

      _(lists).each(function (listData) {
        var list = new Trellino.Models.List(listData);

        that.lists().add(list);
        list.parseCards();
      });

      delete resp.lists;
    }

    return resp;
  },

  lists: function () {
    if (!this._lists) {
      this._lists = new Trellino.Collections.Lists([], {
        board: this
      });
    }

    return this._lists;
  }
});
