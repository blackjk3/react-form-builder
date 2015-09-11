/**
  * <Form />
  */

import React from 'react';
import {EventEmitter} from 'fbemitter';
import FormValidator from './form-validator';
import {Header,Paragraph,LineBreak,TextInput,TextArea,Dropdown,Checkboxes,DatePicker,RadioButtons,Rating,Tags,Signature,HyperLink,Download,Camera,Range} from './form-elements';

export default class ReactForm extends React.Component {

  constructor(props) {
    super(props);
    this.emitter = new EventEmitter();
  }

  _checkboxesDefaultValue(item) {
    let defaultChecked = [];
    item.options.forEach(option => {
      defaultChecked.push(this.props.answer_data['option_'+option.key])
    })
    return defaultChecked;
  }

  _isIncorrect(item) {
    let incorrect = false;
    if (item.canHaveAnswer) {
      if (item.element === "Checkboxes" || item.element === "RadioButtons") {
        item.options.forEach(option => {
          let $option = React.findDOMNode(this.refs[item.field_name].refs["child_ref_"+option.key]);
          if ((option.hasOwnProperty("correct") && !$option.checked) || (!option.hasOwnProperty("correct") && $option.checked))
            incorrect = true;
        })
      } else {
        let $item = null
        if (item.element === "Rating") {
          $item = {};
          $item.value = this.refs[item.field_name].refs["child_ref_"+item.field_name].state.rating;
          if ($item.value.toString() !== item.correct)
            incorrect = true;
        } else {
          if (item.element === "Tags") {
            $item = {};
            $item.value = this.refs[item.field_name].refs["child_ref_"+item.field_name].state.value
          } else {
            $item = React.findDOMNode(this.refs[item.field_name].refs["child_ref_"+item.field_name]);
            $item.value = $item.value.trim();
          }

          if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase())
            incorrect = true;
        }
      }
    }
    return incorrect;
  }

  _isInvalid(item) {
    let invalid = false;
    if (item.required === true) {
      if (item.element === "Checkboxes" || item.element === "RadioButtons") {
        let checked_options = 0;
        item.options.forEach(option => {
          let $option = React.findDOMNode(this.refs[item.field_name].refs["child_ref_"+option.key]);
          if ($option.checked)
            checked_options += 1;
        })
        if (checked_options < 1)
          // errors.push(item.label + " is required!");
          invalid = true;
      } else {
        let $item = null
        if (item.element === "Rating") {
          $item = {};
          $item.value = this.refs[item.field_name].refs["child_ref_"+item.field_name].state.rating;
          if ($item.value === 0)
            invalid = true;
        } else {
          if (item.element === "Tags") {
            $item = {};
            $item.value = this.refs[item.field_name].refs["child_ref_"+item.field_name].state.value
          } else {
            $item = React.findDOMNode(this.refs[item.field_name].refs["child_ref_"+item.field_name]);
            $item.value = $item.value.trim();
          }

          if ($item.value.length < 1)
            invalid = true;
        }
      }
    }
    return invalid;
  }

  _getSignatureImg(item) {
    let $canvas_sig = this.refs[item.field_name].refs["canvas_"+item.field_name]
    let base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
    let isEmpty = $canvas_sig.isEmpty();
    let $input_sig = React.findDOMNode(this.refs[item.field_name].refs["child_ref_"+item.field_name]);
    if (isEmpty) {
      $input_sig.value = "";
    } else {
      $input_sig.value = base64;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    let $form = React.findDOMNode(this.refs.form);
    let errors = [];
    this.props.data.forEach(item => {
      if (item.element === "Signature")
        this._getSignatureImg(item);

      if (this._isInvalid(item))
        errors.push(item.label + " is required!");

      if (this.props.validateForCorrectness && this._isIncorrect(item))
        errors.push(item.label + " was answered incorrectly!");
    });
    // publish errors, if any
    this.emitter.emit('formValidation', errors);
    if (errors.length < 1)
      $form.submit();
  }

  render() {
    let items = this.props.data.map( item => {
      switch (item.element) {
        case "Header":
          return <Header mutable={true} key={'form_'+item.id} data={item} />
        case "Paragraph":
          return <Paragraph mutable={true} key={'form_'+item.id} data={item} />
        case "LineBreak":
          return <LineBreak mutable={true} key={'form_'+item.id} data={item} />
        case "TextInput":
          return <TextInput ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
        case "TextArea":
          return <TextArea ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
        case "Dropdown":
          return <Dropdown ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
        case "Checkboxes":
          return <Checkboxes ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this._checkboxesDefaultValue(item)} />
        case "DatePicker":
          return <DatePicker ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
        case "RadioButtons":
          return <RadioButtons ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
        case "Rating":
          return <Rating ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
        case "Tags":
          return <Tags ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
        case "Signature":
          return <Signature ref={item.field_name} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
        case "HyperLink":
          return <HyperLink mutable={true} key={'form_'+item.id} data={item} />
        case "Download":
          return <Download download_path={this.props.download_path} mutable={true} key={'form_'+item.id} data={item} />
        case "Camera":
          return <Camera mutable={true} key={'form_'+item.id} data={item} />
        case "Range":
          return <Range ref={item.field_name} handleChange={this.handleChange} mutable={true} key={'form_'+item.id} data={item} defaultValue={this.props.answer_data[item.field_name]} />
      }
    })

    let formTokenStyle = {
      display: 'none'
    }

    return (
      <div>
        <FormValidator emitter={this.emitter} />
        <div className="react-form-builder-form">
          <form encType="multipart/form-data" ref="form" action={this.props.form_action} onSubmit={this.handleSubmit.bind(this)} method={this.props.form_method}>
            { this.props.authenticity_token &&
              <div style={formTokenStyle}>
                <input name="utf8" type="hidden" value="&#x2713;" />
                <input name="authenticity_token" type="hidden" value={this.props.authenticity_token} />
                <input name="task_id" type="hidden" value={this.props.task_id} />
              </div>
            }
            {items}
            <input type="submit" className="btn btn-school btn-big btn-agree" value="Submit" />
            <a href={this.props.back_action} className="btn btn-default btn-cancel btn-big"> Cancel</a>
          </form>
        </div>
      </div>
    )
  }
}

ReactForm.defaultProps = { validateForCorrectness: false };