import React from 'react';
import HeaderBar from './header-bar';
import TextAreaAutosize from 'react-textarea-autosize';
// var SortableItemMixin = require('react-anything-sortable/SortableItemMixin')

export default class extends React.Component {
  // mixins: [SortableItemMixin],
  static defaultProps = {
    className: 'rfb-item'
  };

  state = {
    changedValue: this.props.data.value,
    data: this.props.data
  };

  render() {
    var headerClasses = 'dynamic-input ' + this.props.data.element + '-input';

    return (
      <div>
        <HeaderBar name={this.props.data.text} onDestroy={this.props.onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        {this.props.children}
      </div>
    )

  }
}