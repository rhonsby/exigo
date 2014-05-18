window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Trellino.Collections.boards = new Trellino.Collections.Boards();

    new Trellino.Routers.BoardsRouter({
      '$rootEl': $('#content'),
      'boards': Trellino.Collections.boards
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});

Backbone.CompositeView = Backbone.View.extend({
  subviews: function (selector) {
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  },

  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();

    // in the scenario that the subview is also a compositeview
    // with its own subviews, we must attach those as well
    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  // iterate through each selector's subviews,
  // empty the html for the selector,
  // and then attach each individual subview.
  attachSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function (subview) {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { subview.remove(); } );
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  }
});
