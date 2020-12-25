import React, { useImperativeHandle, Fragment } from 'react';
import { DropTarget } from 'react-dnd';
import FormElements from '../form-elements';

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
    // color: 'white',
    backgroundColor,
    padding: 0,
    // padding: '2rem',
    // paddingTop: '1rem',
    // margin: '1rem',
    // textAlign: 'center',
    float: 'left',
    // fontSize: '1rem',
  };
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
      (component).onDrop(item);
      if (typeof item.setAsChild === 'function') item.setAsChild(props.data, item.data, props.col);
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin);
