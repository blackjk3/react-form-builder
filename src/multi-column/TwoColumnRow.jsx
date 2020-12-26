import React from 'react';

import ComponentHeader from '../form-elements/component-header';
import ComponentLabel from '../form-elements/component-label';
import Dustbin from './dustbin';
import ItemTypes from '../ItemTypes';

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

class TwoColumnRow extends React.Component {
  render() {
    const {
      controls, data, editModeOn, getDataById, setAsChild, removeChild, seq,
    } = this.props;
    const { childItems, pageBreakBefore } = data;
    let baseClasses = 'SortableItem rfb-item';
    if (pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div>
          <ComponentLabel {...this.props} />
          <div className="row">
            <div className="col-md-6">
            { controls ? controls[0] :
              <Dustbin
                data={data}
                accepts={accepts}
                items={childItems}
                col={0}
                editModeOn={editModeOn}
                _onDestroy={() => removeChild(data, 0)}
                getDataById={getDataById}
                setAsChild={setAsChild}
                seq={seq}
              />}
            </div>
            <div className="col-md-6">
            { controls ? controls[1] : <Dustbin data={data} accepts={accepts} items={childItems} col={1} editModeOn={editModeOn} _onDestroy={() => removeChild(data, 1)} getDataById={getDataById} setAsChild={setAsChild} seq={seq} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TwoColumnRow;
