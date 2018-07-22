import React from 'react';

const PLACE_HOLDER = 'form-place-holder';

export default class PlaceHolder extends React.Component {
  render() {
    return (
      <div id={PLACE_HOLDER} className={PLACE_HOLDER} title="Drop item here...." >
        <div>Place Holder</div>
      </div>
    );
  }
}