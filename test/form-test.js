require('./dom-mock')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react/addons');
var ReactDOM = require('react-dom');
var GeneratedForm = require('../src/form.jsx').default;
var TestUtils = React.addons.TestUtils;

var state = {
  "download_path":"",
  "back_action":"",
  "answer_data":{},
  "form_action":"/",
  "form_method":"POST",
  "data":[
    {"id":"16E46F3D-873C-47A1-9FF0-A53C747B61F4","element":"Header","text":"Header Text","static":true,"required":false,"bold":false,"italic":false,"content":"Placeholder Text..."},
    {"id":"7989B581-8A26-4BC9-A897-AFF9C1E2DDAB","element":"Paragraph","text":"Paragraph","static":true,"required":false,"bold":false,"italic":true,"content":"Sample paragraph"},
    {
      "id":"877A58CE-A1B1-4A2E-8255-17881955C320",
      "element":"DatePicker",
      "text":"Date",
      "required":true,
      "defaultToday": true,
      "readOnly": true,
      "field_name":"date_picker_3D034712-A2F2-4DE3-A243-E8D2740336FA",
      "label":"Today's Date"
    },
    {"id":"81CA6686-F485-4733-A1FE-BE99051AD436","element":"Signature","text":"Signature","required":true,"field_name":"signature_D38E87E8-0C0B-483F-BEA7-72317FA2F90A","label":"Signature"},
    {"id":"8872F14D-D160-4E3F-A366-7D6A68E870F3","element":"Signature","text":"Signature","required":false,"field_name":"signature_43A170ED-C84B-4BB5-B0CD-C54602708ED4","label":"Signature"},
    {"id":"CFD4277D-BF8B-45C5-9984-DEC7D6D581FD","element":"RadioButtons","text":"Multiple Choice","required":false,"canHaveAnswer":true,"field_name":"radio_buttons_72E98436-5CDE-4F79-B393-BB45BF7D67AB","label":"Radio Buttons",
      "options":[
        {"value":"1","text":"Place holder option 1","key":"radiobuttons_option_6DB7F7FC-1D53-4076-B17E-77DABFFD40CA","correct":true},
        {"value":"2","text":"Place holder option 2","key":"radiobuttons_option_B7D7E0C0-8E19-453B-A279-EC37E5371E01"},
        {"value":"place_holder_option_3","text":"Place holder option 3","key":"radiobuttons_option_FB164020-5B75-4AEF-BB66-637F5BEB3603"}
      ]
    },
    {"id":"716C0647-4698-4BAC-92E7-5CDA2CA3AA0F","element":"Checkboxes","text":"Checkboxes","required":true,"canHaveAnswer":true,"field_name":"checkboxes_39C9C42D-FF8C-4629-AF1F-CF77C69825B7","label":"Checkboxes",
      "options":[
        {"value":"i_agree","text":"I agree","key":"checkboxes_option_4B65FC50-FCB5-4FEF-9BC2-FCE96AD722F6","correct":true},
        {"value":"i_agree","text":"I do not agree","key":"checkboxes_option_4B65FC50-FCB5-4FEF-9BC2-FCE96AD722F8","correct":false}
      ]
    }
  ],
  "validateForCorrectness":true
};


describe('<Form />', function() {

  jsdom({ skipWindowCheck: true });

  before('render and locate element', function() {
    this.generatedForm = TestUtils.renderIntoDocument(
      <GeneratedForm download_path="" back_action="" answer_data={{}} form_action="/" form_method="POST" data={state.data} />
    );

    this.formElement = ReactDOM.findDOMNode(this.generatedForm);
  });

  it('should render correctly', function() {
    assert.equal(this.formElement.querySelector('h3').innerHTML, state.data[0].content);
    assert.equal(this.formElement.querySelector('p').innerHTML, state.data[1].content);
    assert.equal(this.formElement.querySelectorAll('canvas').length, 2);

    var radioButtons = this.formElement.querySelectorAll('input[type=radio]');
    assert.equal(radioButtons[0].value, state.data[5].options[0].value);
    assert.equal(radioButtons[1].value, state.data[5].options[1].value);
    assert.equal(radioButtons[2].value, state.data[5].options[2].value);

    assert.equal(this.formElement.querySelector('input[type=checkbox]').value, state.data[6].options[0].value);


  });

  it('should validate required fields correctly', function() {
    assert.equal(this.generatedForm.validateForm().length, 2);

    var checkbox = this.formElement.querySelector('input[type=checkbox]');
    checkbox.checked = true;

    // Checking checkbox which is required.
    TestUtils.Simulate.change(checkbox, {"target": {"checked": true}});
    assert.equal(this.generatedForm.validateForm().length, 1);

  });

});