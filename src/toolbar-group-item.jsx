/**
  * <ToolbarGroupItem />
  */

import React, { useState } from 'react';

function ToolbarGroupItem(props) {
  const { name, group, renderItem } = props;

  const [show, setShow] = useState(false);

  function onClick() {
    setShow(!show);
  }

  const classShow = 'collapse' + (show ? ' show' : '');
  return (
    <li>
      <div className="toolbar-group-item">
        <button className="btn btn-link btn-block text-left" type="button" onClick={onClick}>
          {name}
        </button>
        <div className={classShow}>
          <ul>
            { group.map(renderItem) }
          </ul>
        </div>
      </div>
    </li>
  );
}

export default ToolbarGroupItem;
