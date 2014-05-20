Trellino.Views.ListShowView = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  tagName: "li",
  className: 'list ui-state-default clearfix',

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    //this.listenTo(this.model.cards(), 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'remove', this.removeCard);

    this.model.cards().each(this.addCard.bind(this));
  },

  events: {
    "mouseenter .panel-heading": "showTrashButton",
    "mouseleave .panel-heading": "hideTrashButton",
    "click .list-delete-btn": "handleListDeletion",
    "click .card-create-btn": "addCardView"
  },

  addCard: function (card) {
    var cardShow = new Trellino.Views.CardsShowView({
      model: card
    });
    this.addSubview('.cards', cardShow.render());
  },

  removeCard: function (card) {
    var subview = _.find(
      this.subviews(".cards"),
      function (subview) {
        return subview.model === card;
      }
    );

    this.removeSubview(".cards", subview);
  },

  showTrashButton: function () {
    this.$('.list-delete-btn').removeClass('hidden');
  },

  hideTrashButton: function () {
    this.$('.list-delete-btn').addClass('hidden');
  },

  addCardView: function (event) {
    event.preventDefault();
    var newCardForm = new Trellino.Views.CardForm({
      list: this.model
    });
    this.$('.cards').append(newCardForm.render().$el);
  },

  handleListDeletion: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  render: function () {
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);
    this.$el.attr('data-id', this.model.get('id'));
    this.attachSubviews();

    return this;
  }
});
