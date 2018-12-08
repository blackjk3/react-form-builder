import React from 'react';
import PropTypes from 'prop-types';

const PLACE_HOLDER = 'form-place-holder';

export default class PlaceHolder extends React.Component {
  render() {
    return (
      this.props.show &&
      <div className={PLACE_HOLDER} >
        <div>{this.props.text}</div>
      </div>
    );
  }
}

PlaceHolder.propTypes = {
  text: PropTypes.string,
  show: PropTypes.bool,
};

PlaceHolder.defaultProps = {
  text: 'Drop a item here....',
  show: false,
};
