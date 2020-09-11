import React from 'react';
import myxss from './myxss';

const ComponentLabel = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);

  return (
    <label className={props.className || ''}>
      <span dangerouslySetInnerHTML={{ __html: myxss.process(props.data.label) }}/>
      {hasRequiredLabel && <span className="label-required badge badge-danger">Required</span>}
    </label>
  );
};

export default ComponentLabel;
