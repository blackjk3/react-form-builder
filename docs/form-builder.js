/* eslint-disable no-undef */
// const e = React.createElement;
const FormBuilder = ReactFormBuilder.ReactFormBuilder;
const domContainer = document.querySelector('#form-builder');

ReactDOM.render(e(FormBuilder, { url: 'https://safe-springs-35306.herokuapp.com/api/formdata', saveUrl: 'https://safe-springs-35306.herokuapp.com/api/formdata' }), domContainer);
