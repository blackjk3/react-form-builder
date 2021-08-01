import React from 'react';
import { ReactFormBuilder, ElementStore } from 'react-form-builder2';

import { get, post } from './requests';

const getUrl = (cid) => `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`;

// const content = [
//   {
//     id: 'C68B673B-3948-4D62-AF6D-5320CAB4DDB7',
//     element: 'TextInput',
//     text: 'Text Input',
//     required: true,
//     canHaveAnswer: true,
//     field_name: 'text_input_EEA6F5DA-5C2C-43D3-AB62-62385E3925D9',
//     label: '<div>Name</div>\n',
//   },
//   {
//     id: '6DAF1E95-44F6-4E5B-ABDD-D9A6BCA2C08A',
//     element: 'TextInput',
//     text: 'Text Input',
//     required: true,
//     canHaveAnswer: true,
//     field_name: 'text_input_C5305462-9704-4E77-BFAB-A43C14AB2B8E',
//     label: '<div>Email</div>\n',
//   },
// ];

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
          // data={content}
          onLoad={this.onLoad}
          onPost={this.onPost}
        />,
      </div>
    );
  }
}

export default App;

