import React from 'react';
import DynamicOptionList from './dynamic-option-list';
import TextAreaAutosize from 'react-textarea-autosize';

import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

let toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
  },
};

export default class FormElementsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false
    }
  }
  toggleRequired() {
    let this_element = this.state.element;
  }
  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    let this_element = this.state.element;
    this_element[elemProperty] = e.target[targProperty];

    this.setState({
      element: this_element,
      dirty: true
    }, () => {
      if (targProperty === 'checked') {this.updateElement();};
    });
  }

  onEditorStateChange(index, property, editorContent) {

    let html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
    let this_element = this.state.element;
    this_element[property] = html;

    this.setState({
      element: this_element,
      dirty: true
    });
  }

  updateElement() {
    let this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({dirty: false});
    }
  }
  render() {
    let this_checked = this.props.element.hasOwnProperty('required') ? this.props.element.required : false;
    let this_read_only = this.props.element.hasOwnProperty('readOnly') ? this.props.element.readOnly : false;
    let this_default_today = this.props.element.hasOwnProperty('defaultToday') ? this.props.element.defaultToday : false;
    let this_checked_inline = this.props.element.hasOwnProperty('inline') ? this.props.element.inline : false;
    let this_checked_bold = this.props.element.hasOwnProperty('bold') ? this.props.element.bold : false;
    let this_checked_italic = this.props.element.hasOwnProperty('italic') ? this.props.element.italic : false;
    let this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
    let this_checked_page_break = this.props.element.hasOwnProperty('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
    let this_checked_alternate_form = this.props.element.hasOwnProperty('alternateForm') ? this.props.element.alternateForm : false;

    let this_files = this.props.files.length ? this.props.files : [];
    if (this_files.length < 1 || this_files.length > 0 && this_files[0].id !== "")
      this_files.unshift({id: '', file_name: ''});

    if(this.props.element.hasOwnProperty('content')) {
      var contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.element.content));
      var editorState = EditorState.createWithContent(contentState);
    }
    if(this.props.element.hasOwnProperty('label')) {
      var contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.element.label));
      var editorState = EditorState.createWithContent(contentState);
    }

    return (
      <div>
        <div className="clearfix">
          <h4 className="pull-left">{this.props.element.text}</h4>
          <i className="pull-right fa fa-times dismiss-edit" onClick={this.props.manualEditModeOff}></i>
        </div>
        { this.props.element.hasOwnProperty('content') &&
          <div className="form-group">
            <label className="control-label">Text to display:</label>

            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'content')} />
          </div>
        }
        { this.props.element.hasOwnProperty('file_path') &&
          <div className="form-group">
            <label className="control-label" htmlFor="fileSelect">Choose file:</label>
            <select id="fileSelect" className="form-control" defaultValue={this.props.element.file_path} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'file_path', 'value')}>
              {this_files.map(function (file) {
                let this_key = 'file_' + file.id;
                return <option value={file.id} key={this_key}>{file.file_name}</option>;
              })}
            </select>
          </div>
        }
        { this.props.element.hasOwnProperty('href') &&
          <div className="form-group">
            <TextAreaAutosize type="text" className="form-control" defaultValue={this.props.element.href} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'href', 'value')} />
          </div>
        }
        { this.props.element.hasOwnProperty('src') &&
          <div>
            <div className="form-group">
              <label className="control-label" htmlFor="srcInput">Link to:</label>
              <input id="srcInput" type="text" className="form-control" defaultValue={this.props.element.src} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'src', 'value')} />
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this_checked_center} value={true} onChange={this.editElementProp.bind(this, 'center', 'checked')} />
                  Center?
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <label className="control-label" htmlFor="elementWidth">Width:</label>
                <input id="elementWidth" type="text" className="form-control" defaultValue={this.props.element.width} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'width', 'value')} />
              </div>
              <div className="col-sm-3">
                <label className="control-label" htmlFor="elementHeight">Height:</label>
                <input id="elementHeight" type="text" className="form-control" defaultValue={this.props.element.height} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'height', 'value')} />
              </div>
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty('label') &&
          <div className="form-group">
            <label>Display Label</label>
            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'label')} />

            <br />
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this_checked} value={true} onChange={this.editElementProp.bind(this, 'required', 'checked')} />
                Required
              </label>
            </div>
            { this.props.element.hasOwnProperty('readOnly') &&
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this_read_only} value={true} onChange={this.editElementProp.bind(this, 'readOnly', 'checked')} />
                  Read only
                </label>
              </div>
            }
            { this.props.element.hasOwnProperty('defaultToday') &&
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this_default_today} value={true} onChange={this.editElementProp.bind(this, 'defaultToday', 'checked')} />
                  Default to Today?
                </label>
              </div>
            }
            { (this.state.element.element === 'RadioButtons' || this.state.element.element === 'Checkboxes') &&
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this_checked_inline} value={true} onChange={this.editElementProp.bind(this, 'inline', 'checked')} />
                  Display horizonal
                </label>
              </div>
            }
          </div>
        }

        {this.state.element.element === 'Signature' && this.props.element.readOnly
          ? (
            <div className="form-group">
              <label className="control-label" htmlFor="variableKey">Variable Key:</label>
              <input id="variableKey" type="text" className="form-control" defaultValue={this.props.element.variableKey} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'variableKey', 'value')} />
              <p className="help-block">This will give the element a key that can be used to replace the content with a runtime value.</p>
            </div>
          )
          : (<div/>)
        }


        <div className="form-group">
          <label className="control-label">Print Options</label>
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={this_checked_page_break} value={true} onChange={this.editElementProp.bind(this, 'pageBreakBefore', 'checked')} />
              Page Break Before Element?
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="control-label">Alternate/Signature Page</label>
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={this_checked_alternate_form} value={true} onChange={this.editElementProp.bind(this, 'alternateForm', 'checked')} />
              Display on alternate/signature Page?
            </label>
          </div>
        </div>

        { this.props.element.hasOwnProperty('step') &&
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeStep">Step</label>
              <input id="rangeStep" type="number" className="form-control" defaultValue={this.props.element.step} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'step', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty('min_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeMin">Min</label>
              <input id="rangeMin" type="number" className="form-control" defaultValue={this.props.element.min_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_value', 'value')} />
              <input type="text" className="form-control" defaultValue={this.props.element.min_label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_label', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty('max_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeMax">Max</label>
              <input id="rangeMax" type="number" className="form-control" defaultValue={this.props.element.max_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_value', 'value')} />
              <input type="text" className="form-control" defaultValue={this.props.element.max_label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_label', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty('default_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="defaultSelected">Default Selected</label>
              <input id="defaultSelected" type="number" className="form-control" defaultValue={this.props.element.default_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'default_value', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty('static') && this.props.element.static &&
          <div className="form-group">
            <label className="control-label">Text Style</label>
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this_checked_bold} value={true} onChange={this.editElementProp.bind(this, 'bold', 'checked')} />
                Bold
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this_checked_italic} value={true} onChange={this.editElementProp.bind(this, 'italic', 'checked')} />
                Italic
              </label>
            </div>
          </div>
        }

        { this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty('options') &&
          <div className="form-group">
            <label className="control-label" htmlFor="correctAnswer">Correct Answer</label>
            <input id="correctAnswer" type="text" className="form-control" defaultValue={this.props.element.correct} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'correct', 'value')} />
          </div>
        }
        { this.props.element.hasOwnProperty('options') &&
          <DynamicOptionList showCorrectColumn={this.props.showCorrectColumn} data={this.props.preview.state.data} updateElement={this.props.updateElement} preview={this.props.preview} element={this.props.element} key={this.props.element.options.length} />
        }
      </div>
    );
  }
}
FormElementsEdit.defaultProps = {className: 'edit-element-fields'}
