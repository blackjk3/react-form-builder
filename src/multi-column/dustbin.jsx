import React, { useState, useImperativeHandle } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import FormElements from '../form-elements';

function getSimpleElement(item) {
  if (!item) return null;
  const Element = FormElements[item.element];
  return (<Element mutable={true} key={`form_${item.id}`} data={item} />);
}

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '2rem',
    minWidth: '8rem',
    color: 'white',
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
    greedy, isOver, isOverCurrent, connectDropTarget, items, col, accepts, canDrop,
  }, ref) => {
    // const [hasDropped, setHasDropped] = useState(false);
    // const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
    const [item, setItem] = useState(null);

    useImperativeHandle(
      ref,
      () => ({
        onDrop: (data) => {
          // setHasDroppedOnChild(onChild);
          // setHasDropped(true);
          setItem(data);
          items[col] = data;
          console.log('onDrop', data);
        },
      }),
      [],
    );

    // const text = greedy ? 'greedy' : 'not greedy';
    let backgroundColor = 'rgba(0, 0, 0, .5)';

    if (isOverCurrent || (isOver && greedy)) {
      backgroundColor = 'darkgreen';
    }

    const element = getSimpleElement(item);
    console.log('accepts, canDrop', accepts, canDrop);
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
      const hasDroppedOnChild = monitor.didDrop();
      if (hasDroppedOnChild && !props.greedy) {
        return;
      }

      const item = monitor.getItem();
      (component).onDrop(item.data, hasDroppedOnChild);
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin);
