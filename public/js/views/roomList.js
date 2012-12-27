window.RoomListView = Backbone.View.extend({
  
  initialize: function () {
    this.render();
  },
  
  render: function () {
    var rooms = this.model.rooms;
    var len = rooms.length;
    var startPos = (this.options.page - 1) * 8;
    var endPost = Math.min(startPos + 8, len);
    
    $(this.el).html('<ul class="thumbnails"></ul>');
    
    for (var i = startPos; i < endPos; i++) {
      $('.thumbnails', this.el).append(new RoomListItemView({model: rooms[i]}).render().el);
    }
    
    $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);
    return this;
  }
});

window.RoomListItemView = Backbone.View.extend({
  tagName = 'li',
  
  initialize: function () {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.close, this);
  },
  
  render: function () {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
  
});