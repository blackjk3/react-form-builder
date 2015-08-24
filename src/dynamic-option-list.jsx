/**
  * <DynamicOptionList />
  */

import React from 'react';
import ID from './UUID';

export default class DynamicOptionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false
    }
  }
  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
  }
  editOption(option_index, e) {
    let this_element = this.state.element;
    this_element.options[option_index].text = e.target.value;
    this_element.options[option_index].value = this._setValue(e.target.value);
    this.setState({
      element: this_element,
      dirty: true
    });
  }
  updateOption() {
    let this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({dirty: false});
    }
  }
  addOption(index) {
    let this_element = this.state.element;
    this_element.options.splice(index+1,0,{value: '', text: '', key: ID.uuid()});
    this.props.updateElement.call(this.props.preview, this_element);
  }
  removeOption(index) {
    let this_element = this.state.element;
    this_element.options.splice(index,1);
    this.props.updateElement.call(this.props.preview, this_element);
  }
  render() {
    return (
      <div className="dynamic-option-list">
        <b>Options</b>
        <ul>
          {
            this.props.element.options.map( (option, index) => {
              let this_key = 'edit_' + option.key;
              return (
                <li className="clearfix" key={this_key}>
                  <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index} placeholder="Option text" value={option.text} onBlur={this.updateOption.bind(this)} onChange={this.editOption.bind(this, index)} />
                  <button onClick={this.addOption.bind(this, index)} className="btn btn-success"><i className="fa fa-plus-circle"></i></button>
                  { index > 0 &&
                    <button onClick={this.removeOption.bind(this, index)} className="btn btn-danger"><i className="fa fa-minus-circle"></i></button>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}