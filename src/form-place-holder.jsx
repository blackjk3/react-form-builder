import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const PLACE_HOLDER = 'form-place-holder';
const PLACE_HOLDER_HIDDEN = 'form-place-holder-hidden';

class PlaceHolder extends React.Component {
  render() {
    const { intl } = this.props;
    const placeHolderClass = this.props.show ? PLACE_HOLDER : PLACE_HOLDER_HIDDEN;
    // eslint-disable-next-line no-nested-ternary
    const placeHolder = this.props.show ?
          (this.props.text === 'Dropzone' ? intl.formatMessage({ id: 'drop-zone' }) : this.props.text) : '';

    return (
      <div className={placeHolderClass} >
        <div>{placeHolder}</div>
      </div>
    );
  }
}

export default injectIntl(PlaceHolder);
PlaceHolder.propTypes = {
  text: PropTypes.string,
  show: PropTypes.bool,
};

PlaceHolder.defaultProps = {
  text: 'Dropzone',
  show: false,
};
