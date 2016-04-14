import React from 'react';
import HeaderBar from './header-bar';
import TextAreaAutosize from 'react-textarea-autosize';
var SortableItemMixin = require('react-sortable-items/SortableItemMixin')

export default React.createClass({
  mixins: [SortableItemMixin],
  getDefaultProps () {
    return {
      className: 'rfb-item'
    };
  },

  getInitialState (){
    return {
      changedValue: this.props.data.value,
      data: this.props.data
    };
  },

  render() {
    var headerClasses = 'dynamic-input ' + this.props.data.element + '-input';

    return this.renderWithSortable(
      <div>
        <HeaderBar name={this.props.data.text} onDestroy={this.props.onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        {this.props.children}
      </div>
    )

  }

})