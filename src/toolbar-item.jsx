/**
  * <ToolbarItem />
  */

import React from 'react';

export default class Toolbar extends React.Component {
  render() {
    return(
      <li onClick={this.props.onClick}><i className={this.props.data.icon}></i>{this.props.data.name}</li>
    )
  }
}