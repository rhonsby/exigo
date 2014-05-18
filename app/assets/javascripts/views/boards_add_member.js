Trellino.Views.AddMemberView = Backbone.View.extend({
  template: JST['boards/add_member'],

  events: {
    "submit #add-member-form": "handleAddMemberForm"
  },

  handleAddMemberForm: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function (model, resp) {
        alert('User has been added');
      },
      error: function (model, resp) {
        alert(resp.responseText);
      }
    });
  },

  render: function () {
    var renderedContent = this.template({board: this.model});
    this.$el.html(renderedContent);
    return this;
  }
});
