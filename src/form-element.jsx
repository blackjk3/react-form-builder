import React from 'react';

export default class extends React.Component {
  static defaultProps = {
    className: 'rfb-item',
  };

  state = {
    changedValue: this.props.data.value,
    data: this.props.data,
  };

  render() {
    return (
      <div>
        <HeaderBar name={this.props.data.text} onDestroy={this.props.onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        {this.props.children}
      </div>
    );
  }
}
