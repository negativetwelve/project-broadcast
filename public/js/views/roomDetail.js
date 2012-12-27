window.RoomView = Backbone.View.extend({
  
  initialize: function () {
    this.render();
  },
  
  render: function () {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
  
  events: {
    'change' : 'change',
    'click .save' : 'beforeSave',
    'click .delete' : 'deleteRoom',
    'click .change-room-song' : 'changeRoomSong'
  },
  
  change: function (event) {
    utils.hideAlert();
    
    var target = event.target;
    var change = {};
    change[target.name] = target.value;
    this.model.set(change);
    
    var check = this.model.validateItem(target.id);
    if (!check.isValid) {
      utils.addValidationError(target.id, check.message);
    } else {
      utils.removeValidationError(target.id);
    }
  },
  
  beforeSave: function () {
    var check = this.model.validateAll();
    if (!check.isValid) {
      utils.displayValidationErrors(check.messages);
      return false;
    }
    this.saveRoom();
    return false;
  },
  
  saveRoom: function () {
    var console.log('before save');
    this.model.save(null, {
      success: function (model) {
        this.render();
        app.navigate(model.title, false);
        utils.showAlert('Success!', 'Room saved successfully', 'alert-success');
      },
      error: function () {
        utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
      }
    });
  },
  
  deleteRoom: function () {
    this.model.destroy({
      success: function () {
        alert('Room deleted successfully');
        window.history.back();
      }
    });
    return false;
  },
  
  changeRoomSong: function (event) {
    event.preventDefault();
    console.log('changeRoomSong called');
    var input = document.getElementById('youtube').value;
    socket.emit('changeRoomSong', { 'youtube' : input });
  }
  
});