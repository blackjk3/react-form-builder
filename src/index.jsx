/**
  * <ReactFormBuilder />
  */

import React from 'react';
import Preview from './preview'
import Toolbar from './toolbar'
import ElementActions from './actions/ElementActions';
import ReactFormGenerator from './form';

let FormBuilders = {};

class ReactFormBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null
    }
    document.addEventListener("click", this.editModeOff.bind(this));
  }

  editModeOn(data, e) {
    e.stopPropagation()
    if (this.state.editMode) {
      this.setState({editMode: !this.state.editMode, editElement: null});
    } else {
      this.setState({editMode: !this.state.editMode, editElement: data});
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null
      });
    }
  }

  editModeOff(e) {
    const $menu = $(".edit-form");
    let click_is_outside_menu = (!$menu.is(e.target) && $menu.has(e.target).length === 0);

    if (this.state.editMode && click_is_outside_menu) {
      this.setState({
        editMode: false,
        editElement: null
      });
    }
  }

  render() {
    let toolbarProps = {};
    if (this.props.toolbarItems)
      toolbarProps.items = this.props.toolbarItems;
    return (
      <div>
        <div className="react-form-builder clearfix">
          <div>
            <Preview files={this.props.files}
              manualEditModeOff={this.manualEditModeOff.bind(this)}
              parent={this}
              url={this.props.url}
              saveUrl={this.props.saveUrl}
              editModeOn={this.editModeOn}
              editMode={this.state.editMode}
              editElement={this.state.editElement} />
            <Toolbar {...toolbarProps} />
          </div>
        </div>
      </div>
    );
  }

}

FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.ReactFormGenerator = ReactFormGenerator;

module.exports = FormBuilders;