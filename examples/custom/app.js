import React from 'react';
import ReactDOM from 'react-dom';
import { ReactFormBuilder, ElementStore, Registry } from 'react-form-builder2';
import DemoBar from './demobar';
import * as variables from './variables';
import { get, post } from './requests';

const getUrl = (cid) => `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`;

const TestComponent = () => <h2>Hello</h2>;

const MyInput = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
  return <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />;
});

Registry.register('MyInput', MyInput);
Registry.register('TestComponent', TestComponent);

const items = [{
    key: 'Header',
  }, {
    key: 'TextInput',
  }, {
    key: 'TextArea',
  }, {
    key: 'RadioButtons',
  }, {
    key: 'Checkboxes',
  }, {
    key: 'Image',
  },
  {
    group_name: 'Multi Column Row',
    key: 'TwoColumnRow',
  },
  {
    group_name: 'Multi Column Row',
    key: 'ThreeColumnRow',
  },
  {
    group_name: 'Multi Column Row',
    key: 'FourColumnRow',
    element: 'MultiColumnRow',
  },
  {
    group_name: 'Multi Column Row',
    key: 'FiveColumnRow',
    element: 'MultiColumnRow',
  },
  {
    group_name: 'Multi Column Row',
    key: 'SixColumnRow',
    element: 'MultiColumnRow',
  },
  {
    group_name: 'Custom Element',
    key: 'TestComponent',
    element: 'CustomElement',
    component: TestComponent,
    type: 'custom',
    field_name: 'test_component',
    name: 'Something You Want',
    icon: 'fa fa-cog',
    static: true,
    props: { test: 'test_comp' },
    label: 'Label Test',
  },
  {
    group_name: 'Custom Element',
    key: 'MyInput',
    element: 'CustomElement',
    component: MyInput,
    type: 'custom',
    forwardRef: true,
    bare: true,
    field_name: 'my_input_',
    name: 'My Input',
    icon: 'fa fa-cog',
    props: { test: 'test_input' },
    label: 'Label Input',
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formId: '1' };
    this.formId = this.state.formId;
    this.handleChange = this.handleChange.bind(this);
  }

  formId;

  handleChange(event) {
    this.formId = event.target.value;
    const url = getUrl(this.formId);
    console.log('handleChange', url);
    ElementStore.dispatch('load', { loadUrl: url });
    this.setState({ formId: this.formId });
  }

  onLoad = () => {
    const url = getUrl(this.formId);
    console.log('onLoad', url);
    return get(url);
  };

  onPost = (data) => {
    const saveUrl = getUrl(this.formId);
    console.log('onPost', saveUrl, data);
    post(saveUrl, data);
  };

  render() {
    return (
      <div className="App">
        <label>
          Select your form:
        </label>
        <select className="form-control"
            value={this.state.formId}
            onChange={this.handleChange} >
          <option value="1">Form 1</option>
          <option value="2">Form 2</option>
        </select>
        <hr></hr>
        <ReactFormBuilder
          onLoad={this.onLoad}
          onPost={this.onPost}
          toolbarItems={items}
        />,
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('form-builder'),
);

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar'),
);
