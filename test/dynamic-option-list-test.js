require('./dom-mock')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react/addons');
var ReactDOM = require('react-dom');
var DynamicOptionList = require('../src/dynamic-option-list.jsx').default;
var TestUtils = React.addons.TestUtils;

var state = {
  "id":"3C22A938-FD3C-40FB-AA51-26E5A8A62EE0",
  "element":"RadioButtons",
  "text":"Multiple Choice",
  "required":false,
  "canHaveAnswer":true,
  "field_name":"radio_buttons_06F55E45-E6FB-47A7-B87F-403809980313",
  "label":"Placeholder Label",
  "options":[
    {"value":"place_holder_option_1","text":"Place holder option 1","key":"radiobuttons_option_94F7A605-B64A-4493-8C6C-9BD564CD688A"},
    {"value":"place_holder_option_2","text":"Place holder option 2","key":"radiobuttons_option_24A3BBEC-2899-4851-996C-D70E0B43AE62"},
    {"value":"place_holder_option_3","text":"Place holder option 3","key":"radiobuttons_option_CCE27C69-C13B-49F3-8CE1-6BD51B106F26"}
  ]
};
var previewData = [state];

var newState = state;

function updateElement(element) {
  newState = element;
}

describe('<DynamicListOption />', function() {
  
  before('render and locate element', function() {
    this.dynamicOptionComponent = TestUtils.renderIntoDocument(
      <DynamicOptionList 
        showCorrectColumn={true}
        data={previewData} 
        updateElement={updateElement} 
        preview={this} 
        element={state}
        key={state.options.length} />
    );

    this.dynamicOptionElement = ReactDOM.findDOMNode(this.dynamicOptionComponent);
  });

  it('should render default options', function() {
    assert.equal(this.dynamicOptionComponent.state.element.options.length, 3);
  });

  it('should be able to update options', function() {
    var optionBox = this.dynamicOptionElement.querySelector('input[type=text]');
    optionBox.value = 'Place holder changed';

    TestUtils.Simulate.change(optionBox);
    assert.equal(newState.options[0].text, optionBox.value);
    assert.equal(newState.options[0].value, 'place_holder_changed');
  });

  it('should be able to update values', function() {
    var optionBoxes = this.dynamicOptionElement.querySelectorAll('input[type=text]');
    var labelBox = optionBoxes[0];
    var valueBox = optionBoxes[1];

    valueBox.value = 'specialsetvalue';

    TestUtils.Simulate.change(valueBox);
    assert.equal(newState.options[0].value, 'specialsetvalue');

    labelBox.value = 'New value again';
    TestUtils.Simulate.change(labelBox);
    assert.equal(newState.options[0].text, labelBox.value);
    assert.equal(newState.options[0].value, 'specialsetvalue');
  });

});