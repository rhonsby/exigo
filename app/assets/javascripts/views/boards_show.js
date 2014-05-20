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
  },

  addListSortable: function () {
    var that = this;

    this.$("#lists").sortable({
      connectWith: "#lists",

      start: function (event, ui) {
        $(ui.item).addClass('dragged');
      },

      stop: function (event, ui) {
        $(ui.item).removeClass('dragged');
      },

      update: function() {
        that.updateListRanking();
      }
    });  

    this.$("#lists").disableSelection();
  },

  addCardSortable: function () {
    var that = this;
    this.$(".cards").sortable({
      connectWith: ".cards",

      start: function (event, ui) {
        $(ui.item).addClass('dragged');
      },

      stop: function (event, ui) {
        $(ui.item).removeClass('dragged');
      },

      update: function (event, ui) {
        var cardLi = ui.item;
        var newListId = cardLi.closest('.list').data('id');
        var cardId = cardLi.data('id');
        var lists = that.model.lists().models;
        var card;
        var oldList;
        var newList;

        _(lists).each(function (list) {
          if (list.cards().get(cardId)) {
            oldList = list;
            card = list.cards().get(cardId); 
          }

          if (list.get('id') === newListId) {
            newList = list;
          }
        });

        oldList.cards().remove(card, { silent: true });
        newList.cards().add(card, { silent: true });

        card.save({ list_id: newListId }, {
          success: function () {
            that.updateCardRanking(newListId);
          }
        });
      }
    });
    
    this.$('.cards').disableSelection();
  },

  updateCardRanking: function (listId) {
    var list = this.model.lists().get(listId);
    var $list = this.$("*[data-id=" + list.get('id') + "]");
    var newRanking = $list.find('.card').map(function (idx, card) {
      var $card = $(card);
      return $card.data('id');
    });

    newRanking.each(function (i, el) {
      var card = list.cards().get(el);
      card.save({ rank: i + 1 }, { silent: true });
    });
  },

  updateListRanking: function () {
    var newRanking = $('#lists').children().map(function (idx, list) {
      var $list = $(list);
      return $list.data('id');
    });

    var lists = this.model.lists();
    
    // refactor method so that it only updates the lists
    // that actually changed positions
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
    this.addListSortable();
    this.addCardSortable();

    return this;
  }
});
