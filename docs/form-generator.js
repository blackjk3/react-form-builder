/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const e = React.createElement;

const ReactFormGenerator = ReactFormBuilder.default.ReactFormGenerator;
const ElementStore = ReactFormBuilder.default.ElementStore;
const formContainer = document.querySelector('#form-generator');

function setClass(element, name, remove) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  if (remove) {
    element.classList.remove(name);
  } else {
    element.classList.add(name);
  }
}

class FormGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
    };

    this.showPreview = this.showPreview.bind(this);
    this.closePreview = this.closePreview.bind(this);
    const update = this._onChange.bind(this);
    ElementStore.subscribe(state => update(state.data));
  }

  componentDidMount() {
    document.querySelector('#button-preview')
      .addEventListener('click', this.showPreview);
    document.querySelector('#button-close')
      .addEventListener('click', this.closePreview);
  }

  showPreview() {
    this.setState({
      previewVisible: true,
    });
    setClass('#preview-dialog', 'show', false);
  }

  closePreview() {
    this.setState({
      previewVisible: false,
    });
    setClass('#preview-dialog', 'show', true);
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  render() {
    const previewVisible = this.state.previewVisible;
    if (!previewVisible) {
      return null;
    }
    const cid = window.localStorage.getItem('cid');
    const query = cid ? `?cid=${cid}` : '';
    const postUrl = `https://safe-springs-35306.herokuapp.com/api/form${query}`;
    return e(
      ReactFormGenerator, {
        download_path: '',
        back_action: '/react-form-builder/index.html',
        back_name: 'Back',
        answer_data: {},
        action_name: 'Save',
        form_action: postUrl,
        form_method: 'POST',
        variables: this.props.variables,
        data: this.state.data,
      },
    );
  }
}

ReactDOM.render(e(FormGenerator), formContainer);
