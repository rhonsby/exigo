Trellino.Models.Card = Backbone.Model.extend({
  urlRoot: function () {
    if (this.isNew()) {
      return "api/lists/" + this.get('list_id') + "/cards";
    } else {
      return "api/cards";
    }
  }
});