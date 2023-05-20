import React from 'react';
import HeaderBar from './header-bar';

const ComponentHeader = (props) => {
  if (props.mutable) {
    return null;
  }
  return (
    <div>
      {props.data.pageBreakBefore &&
        <div className="preview-page-break">Page Break</div>
      }
      <HeaderBar isFieldSet={props.isFieldSet} parent={props.parent} editModeOn={props.editModeOn} data={props.data} index={props.index} setAsChild={props.setAsChild} onDestroy={props._onDestroy} onEdit={props.onEdit} static={props.data.static} required={props.data.required} />
    </div>
  );
};

export default ComponentHeader;
