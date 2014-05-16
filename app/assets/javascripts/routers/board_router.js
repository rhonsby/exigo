Trellino.Routers.BoardsRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.boards = options.boards;
  },

  routes: {
    '': 'home',
    'boards/new': 'new',
    'boards/:id': 'show'
  },

  home: function () {
    this.boards.fetch();

    var indexView = new Trellino.Views.BoardsIndexView({
      collection: this.boards
    });
    this._swapView(indexView);
  },

  new: function () {
    var newView = new Trellino.Views.BoardsNewView();
    this._swapView(newView);
  },

  show: function (id) {
    var board = this.boards.getOrFetch(id);

    var showView = new Trellino.Views.BoardsShowView({
      model: board
    });

    this._swapView(showView);
  },

  _swapView: function (view) {
    if (this._currentView) this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});