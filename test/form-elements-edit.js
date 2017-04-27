require('./dom-mock')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react/addons');
var ReactDOM = require('react-dom');
var FormElementsEdit = require('../src/form-elements-edit.jsx').default;
var TestUtils = React.addons.TestUtils;

var staticState = {
  editMode: true,
  editElement: {
    "id":"694AB27E-8F79-4D28-A8E5-51143EC8BD54",
    "element":"Header",
    "text":"Header Text",
    "static":true,
    "required":false,
    "bold":false,
    "italic":false,
    "content":"Placeholder Text..."
  },
  files: []
};

var inputState = {
  editMode: true,
  editElement: {
    "id":"7D84346E-4AB1-4F89-B66D-ABD4210B9DEB",
    "element":"TextInput",
    "text":"Text Input",
    "required":false,
    "canHaveAnswer":true,
    "field_name":"text_input_69723146-39D3-460C-9416-DD6F73B80404",
    "label":"Placeholder Label"
  },
  files: []
};

var updatedStaticElement = staticState.editElement;
var updatedInputElement = inputState.editElement;

function updateStaticElement(element) {
  updatedStaticElement = element;
}

function updateInputElement(element) {
  updatedInputElement = element;
}

describe('<FormElementsEdit /> Testing static element edit', function() {
  var formElementEdit;

  jsdom({ skipWindowCheck: true });

  beforeEach(function(done) {

    formElementEdit = React.render(
      <FormElementsEdit
        showCorrectColumn={true}
        files={staticState.files}
        manualEditModeOff={false}
        preview={this}
        element={staticState.editElement}
        updateElement={updateStaticElement} />,
      document.body, function () {
        setTimeout(done);
      }
    );

  });

  afterEach(function(done) {
    React.unmountComponentAtNode(document.body);
    setTimeout(done);
  });

  it('should set the state of the element that is being edited', function() {
    assert.equal(formElementEdit.state.element.id, staticState.editElement.id);
  });

  it('should update the state when element content is changed', function() {
    var editElement = ReactDOM.findDOMNode(formElementEdit);
    var contentBox = editElement.getElementsByClassName('public-DraftEditor-content')[0];

    TestUtils.Simulate.beforeInput(contentBox, {data: 'a'});
    assert.equal(formElementEdit.state.dirty, true);
    assert.equal(updatedStaticElement.content, '<div>aPlaceholder Text...</div>\n');
  });

});

describe('<FormElementsEdit /> Testing text input element edit', function() {
  var formElementEdit;

  jsdom({ skipWindowCheck: true });

  beforeEach(function(done) {

    formElementEdit = React.render(
      <FormElementsEdit
        showCorrectColumn={true}
        files={inputState.files}
        manualEditModeOff={false}
        preview={this}
        element={inputState.editElement}
        updateElement={updateInputElement} />,
      document.body, function () {
        setTimeout(done);
      }
    );

  });

  afterEach(function(done) {
    React.unmountComponentAtNode(document.body);
    setTimeout(done);
  });

  it('should set the state of the element that is being edited', function() {

    assert.equal(formElementEdit.state.element.id, inputState.editElement.id);
  });

  it('should update the state when element label is changed', function() {

    var editElement = ReactDOM.findDOMNode(formElementEdit);
    var requiredCheckbox = editElement.querySelector('input[type=checkbox]');

    var label = editElement.getElementsByClassName('public-DraftEditor-content')[0];
    TestUtils.Simulate.beforeInput(label, {data: 'a'});
    assert.equal(updatedInputElement.label, '<div>aPlaceholder Label</div>\n');

    TestUtils.Simulate.change(requiredCheckbox, {"target": {"checked": true}});
    assert.equal(updatedInputElement.required, true);

  });
});
