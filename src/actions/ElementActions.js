var Reflux = require('reflux');

var ElementActions = Reflux.createActions([
  'createElement',
  'editElement',
  'deleteElement',
  'saveData',
  'save'
]);

module.exports = ElementActions;