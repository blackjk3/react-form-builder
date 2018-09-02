'use strict';

const e = React.createElement;

const ReactFormGenerator = ReactFormBuilder.ReactFormGenerator;
const ElementStore = ReactFormBuilder.ElementStore;
const formContainer = document.querySelector('#form-generator');

function setClass(element, name, remove) {
    if (typeof element === 'string'){
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
      }
  
      this.showPreview = this.showPreview.bind(this);
      this.closePreview = this.closePreview.bind(this);
      const update = this._onChange.bind(this);
      ElementStore.subscribe(state => update(state.data));
    }
  
    componentDidMount() {
        document.querySelector('#button-preview')
            .addEventListener('click', this.showPreview, false);
        document.querySelector('#button-close')
            .addEventListener('click', this.closePreview, false);
    }

    showPreview() {
        this.setState({
            previewVisible: true
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
            data: data
        });
    }

    render() {
        const previewVisible = this.state.previewVisible;
        if (!previewVisible) {
            return 'HIDE';
        }    
        return e(
            ReactFormGenerator, {   
                download_path: '',
                back_action: '/',
                back_name: 'Back',
                answer_data: {},
                action_name: 'Save',
                form_action: '/',
                form_method: 'POST',
                variables: this.props.variables,
                data: this.state.data
            },
            'Preview'
        );
    }
}

ReactDOM.render(e(FormGenerator), formContainer);