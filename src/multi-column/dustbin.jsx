import React, { useImperativeHandle, Fragment } from 'react';
import { DropTarget } from 'react-dnd';
import FormElements from '../form-elements';
import ItemTypes from '../ItemTypes';

function getSimpleElement(item, props) {
  if (!item) return null;
  const Element = FormElements[item.element || item.key];
  return (
    <Fragment>
      <Element {...props} key={`form_${item.id}`} data={item} />
    </Fragment>
  );
}

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '2rem',
    minWidth: '12rem',
    width: '100%',
    backgroundColor,
    padding: 0,
    float: 'left',
  };
}

function isContainer(item) {
  if (item.itemType !== ItemTypes.CARD) {
    const { data } = item;
    if (data) {
      if (data.isContainer) {
        return true;
      }
      if (data.field_name) {
        return data.field_name.indexOf('_col_row') > -1;
      }
    }
  }
  return false;
}

const Dustbin = React.forwardRef(
  ({
    greedy, isOver, isOverCurrent, connectDropTarget, items, col, getDataById, ...rest
  }, ref) => {
    const item = getDataById(items[col]);
    useImperativeHandle(
      ref,
      () => ({
        onDrop: (/* dropped */) => {
          // const { data } = dropped;
          // console.log('onDrop', data);
        },
      }),
      [],
    );

    let backgroundColor = 'rgba(0, 0, 0, .03)';

    if (isOverCurrent || (isOver && greedy)) {
      backgroundColor = 'darkgreen';
    }

    const element = getSimpleElement(item, rest);
    // console.log('accepts, canDrop', accepts, canDrop);
    return connectDropTarget(
      <div style={getStyle(backgroundColor)}>
        {element}
      </div>,
    );
  },
);

export default DropTarget(
  (props) => props.accepts,
  {
    drop(
      props,
      monitor,
      component,
    ) {
      if (!component) {
        return;
      }

      const item = monitor.getItem();
      if (!isContainer(item)) {
        (component).onDrop(item);
        if (item.data && typeof props.setAsChild === 'function') {
          const isNew = !item.data.id;
          const data = isNew ? item.onCreate(item.data) : item.data;
          props.setAsChild(props.data, data, props.col);
        }
      }
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin);
