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
    const { controls } = this.props;
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
            { controls ? controls[0] : <Dustbin data={this.props.data} accepts={accepts} items={childItems} col={0} />}
            </div>
            <div className="col-md-6">
            { controls ? controls[1] : <Dustbin data={this.props.data} accepts={accepts} items={childItems} col={1} />}
            </div>
          </div>
        </div>
      </div>
    );

    // return (
    //   <div className={baseClasses}>
    //     <ComponentHeader {...this.props} />
    //     <div className="form-group">
    //       <ComponentLabel {...this.props} />
    //       <div className="row">
    //         <div className="col-md-6" style={{ zIndex: 1000 }}>
    //           <Dustbin greedy={true}>
    //             <Dustbin greedy={true} />
    //           </Dustbin>
    //         </div>
    //         <div className="col-md-6">
    //           <Dustbin>
    //             <Dustbin />
    //           </Dustbin>
    //         </div>
    //       </div>
    //     </div>
    //     <Card />
    //   </div>
    // );
  }
}

export default TwoColumnRow;
