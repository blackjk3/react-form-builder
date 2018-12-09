/* eslint-disable no-undef */
// const e = React.createElement;
const FormBuilder = ReactFormBuilder.ReactFormBuilder;
const domContainer = document.querySelector('#form-builder');

ReactDOM.render(e(FormBuilder, { url: '/api/formdata', saveUrl: '/api/formdata' }), domContainer);
