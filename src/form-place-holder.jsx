import React from 'react';
import PropTypes from 'prop-types';

const PLACE_HOLDER = 'form-place-holder';
const PLACE_HOLDER_HIDDEN = 'form-place-holder-hidden';

export default class PlaceHolder extends React.Component {
  render() {
    const placeHolderClass = this.props.show ? PLACE_HOLDER : PLACE_HOLDER_HIDDEN;
    const placeHolder = this.props.show ? this.props.text : '';
    return (
      <div className={placeHolderClass} >
        <div>{placeHolder}</div>
      </div>
    );
  }
}

PlaceHolder.propTypes = {
  text: PropTypes.string,
  show: PropTypes.bool,
};

PlaceHolder.defaultProps = {
  text: 'Dropzone',
  show: false,
};
