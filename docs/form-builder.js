/* eslint-disable no-undef */
// const e = React.createElement;
const FormBuilder = ReactFormBuilder.default.ReactFormBuilder;
const domContainer = document.querySelector('#form-builder');
function guid() {
  function _p8(s) {
    const p = (`${Math.random().toString(16)}000000000`).substr(2, 8);
    return s ? `_${p.substr(0, 4)}_${p.substr(4, 4)}` : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

let cid = window.localStorage.getItem('cid');
if (!cid) {
  cid = guid();
  window.localStorage.setItem('cid', cid);
}

const url = `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`;
const saveUrl = `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`;
const saveAlways = false;

ReactDOM.render(e(FormBuilder, { url, saveUrl, saveAlways }), domContainer);

let backdropElement;
const classBackdrop = 'modal-backdrop';

function showBackdrop() {
  if (!backdropElement) {
    backdropElement = document.createElement('div');
    backdropElement.className = `${classBackdrop} show`;
    document.body.appendChild(backdropElement);
  }
}

function destroyBackdrop() {
  if (backdropElement) {
    backdropElement.parentNode.removeChild(backdropElement);
  }
}

let show = false;

function clearMessage() {
  destroyBackdrop();
  toastr.clear();
  show = false;
}

function errorMessage() {
  show = false;
  toastr.error('Service Not Available.', 'Back-End', { timeOut: 30000 });
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  OPTIONS: '',
};

function checkBackEnd() {
  show = false;
  setTimeout(() => {
    if (show) showBackdrop();
  }, 300);
  setTimeout(() => {
    if (show) toastr.warning('Loading.... Please Wait.');
  }, 1000);
  fetch(url, {
    method: 'GET',
    headers,
  })
  .then(clearMessage)
  .catch(errorMessage);
}

checkBackEnd();
