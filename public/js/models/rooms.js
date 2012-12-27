window.Room = Backbone.model.extend({
  urlRoot = '/',
  titleAttribute: '_title',
  
  initialize: function () {
    this.validators = {};
    
    this.validators.name = function (value) {
      return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
    };
  },
  
  validateItem: function (key) {
    return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
  },
  
  validateAll: function () {
    var messages = {};
    
    for (var key in this.validators) {
      if (this.validators.hasOwnProperty(key)) {
        var check = this.validators[key](this.get(key));
        if (!check.isValid) {
          messages[key] = check.message;
        }
      }
    }
    return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
  },
  
  defaults: {
    _id: null,
    name: '',
    title: '',
    description: ''
  }
  
});

window.RoomCollection = Backbone.Collection.extend({ 
  model: Room,
  url: '/'
});