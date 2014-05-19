Trellino.Views.BoardsShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.lists(), 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.removeList);

    var newListView = new Trellino.Views.NewListsView({
      board: this.model
    });
    this.addSubview("#board-controls", newListView);

    var addMemberView = new Trellino.Views.AddMemberView({
      model: this.model
    });
    this.addSubview("#board-controls", addMemberView);

    this.model.lists().each(this.addList.bind(this));
  },

  events: {
    "click #delete-button": "handleBoardDeletion",
    "listChange #lists": "updateRanking"
  },

  addSortable: function () {
    this.$("#lists").sortable({
      start: function (event, ui) {
        $(ui.item).addClass('dragged');
      },

      stop: function (event, ui) {
        $(ui.item).removeClass('dragged');
        $('#lists').trigger('listChange');
      }
    });  

    this.$("#lists").disableSelection();
  },

  updateRanking: function () {
    var newRanking = $('#lists').children().map(function (idx, list) {
      console.log(list);
      var $list = $(list);
      return $list.data('id');
    });

    var lists = this.model.lists();
    newRanking.each(function (i, el) { 
      var list = lists.get(el);
      list.save({ rank: i + 1 }, { silent: true });
    });
  },

  addList: function (list) {
    var listShow = new Trellino.Views.ListShowView({
      model: list
    });
    this.addSubview('#lists', listShow.render());
  },

  removeList: function (list) {
    var subview = _.find(
      this.subviews("#lists"),
      function (subview) {
        return subview.model === list;
      }
    );

    this.removeSubview("#lists", subview);
  },

  handleBoardDeletion: function (event) {
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate('', {trigger: true});
  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);
    this.attachSubviews();
    this.addSortable();

    return this;
  }
});
