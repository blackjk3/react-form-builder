import React from 'react';

import ComponentHeader from '../form-elements/component-header';
import ComponentLabel from '../form-elements/component-label';
import Dustbin from './dustbin';
import ItemTypes from '../ItemTypes';

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

class TwoColumnRow extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     items: props.data.childItems || [null, null],
  //   };
  // }

  render() {
    const {
      controls, data, editModeOn, _onDestroy, getDataById, setAsChild, seq,
    } = this.props;
    const { childItems, pageBreakBefore } = this.props.data;
    let baseClasses = 'SortableItem rfb-item';
    if (pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div>
          <ComponentLabel {...this.props} />
          <div className="row">
            <div className="col-md-6">
            { controls ? controls[0] : <Dustbin data={data} accepts={accepts} items={childItems} col={0} editModeOn={editModeOn} _onDestroy={_onDestroy} getDataById={getDataById} setAsChild={setAsChild} seq={seq} />}
            </div>
            <div className="col-md-6">
            { controls ? controls[1] : <Dustbin data={data} accepts={accepts} items={childItems} col={1} editModeOn={editModeOn} _onDestroy={_onDestroy} getDataById={getDataById} setAsChild={setAsChild} seq={seq} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TwoColumnRow;
