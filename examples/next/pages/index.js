import React from 'react';
import FormBuilder from 'react-form-builder2';
import DemoBar from '../components/demobar';

// Form Data
const url = '/api/formdata';
const saveUrl = '/api/formdata';
const postUrl = '/api/form';

class Index extends React.Component {
  render() {
    return (
      <div>
        <DemoBar postUrl={postUrl} />

        <FormBuilder.ReactFormBuilder
          url={url}
          saveUrl={saveUrl} />
      </div>
    );
  }
}

export default Index;
