var AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'home',
    'new' : 'addRoom',
    ':title' : 'roomDetail',
    'lounge' : 'roomList'
  },
  
  initialize: function () {
    this.headerView = new HeaderView();
    $('.header').html(this.headerView.el);
  },
  
  home: function (id) {
    if (!this.homeView) {
      this.homeView = new HomeView();
    }
    $('#content').html(this.homeView.el);
    this.headerView.selectMenuItem('home-menu');
  },
  
  roomList: function (page) {
    var p = page ? parseInt(page, 10) : 1;
    var roomList = new RoomCollection();
    roomList.fetch({success: function () {
      $('#content').html(new RoomListView({model: roomList, page: p}).el);
    }});
    this.headerView.selectMenuItem('home-menu');
  },
  
  roomDetails: function (title) {
    var room = new Room({_title: title});
    room.fetch({success: function () {
      $('#content').html(new RoomView({model: room}).el);
    }});
    this.headerView.selectMenuItem();
  },
  
  addRoom: function () {
    var room = new Room();
    $('#content').html(new RoomView({model: room}).el);
    this.headerView.selectMenuItem('add-menu');
  }
  
});

utils.loadTemplate(['HomeView', 'HeaderView', 'RoomDetailView', 'RoomListView'], function () {
  app = new AppRouter();
  Backbone.history.start();
});
