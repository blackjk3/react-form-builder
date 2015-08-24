var Reflux = require('reflux');
var ElementActions = require('../actions/ElementActions');

var _data;
var _saveUrl;

var ElementStore = Reflux.createStore({
  init: function() {
    this.listenTo(ElementActions.createElement, this._create);
    this.listenTo(ElementActions.deleteElement, this._delete);
    this.listenTo(ElementActions.save, this.save);
    this.listenTo(ElementActions.saveData, this._updateOrder)
  },

  load: function(urlOrData, saveUrl) {

    var self = this;
    _saveUrl = saveUrl;

    if(typeof urlOrData == 'string' || urlOrData instanceof String) {
      $.ajax({
        url: urlOrData,
        success: function(data) {
          _data = data;
          self.trigger(_data);
        }
      })
    } else {
      _data = urlOrData;
      self.trigger(_data);
    }
  },

  _create: function(element) {
    _data.push(element);
    this.trigger(_data);
    this.save();
  },

  _delete: function(element) {
    var index = _data.indexOf(element);
    _data.splice(index, 1);
    this.trigger(_data);
    this.save();
  },

  _updateOrder: function(elements) {
    _data = elements;
    this.trigger(_data);
    this.save();
  },

  save: function() {
    if(_saveUrl) {
      $.ajax({
        type: 'POST',
        url: _saveUrl,
        data: {
          task_data: JSON.stringify(_data)
        },
        dataType: 'json',
        success: function(data) {
          console.log('Saved... ', arguments);
        }
      })
    }
  }

});

module.exports = ElementStore;