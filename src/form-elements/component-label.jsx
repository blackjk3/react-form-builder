import React from 'react';
import myxss from './myxss';

const ComponentLabel = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);
  const labelText = myxss.process(props.data.label);
  return (
    <label className={props.className || 'form-label'}>
      <span dangerouslySetInnerHTML={{ __html: labelText }}/>
      {hasRequiredLabel && <span className="label-required badge badge-danger">Required</span>}
    </label>
  );
};

export default ComponentLabel;
