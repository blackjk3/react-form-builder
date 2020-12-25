import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes';

const style = {
  // display: 'inline-block',
  // border: '1px dashed gray',
  // padding: '0.5rem 1rem',
  // backgroundColor: 'white',
  cursor: 'move',
};

const gripSource = {
  beginDrag(props) {
    const { data, onDestroy, setAsChild } = props;
    return {
      id: data.id,
      index: data.index,
      onDestroy,
      setAsChild,
      data,
    };
  },
};

const Grip = ({ connectDragSource }) => connectDragSource(
  <div className="btn is-isolated" style={style} ><i className="is-isolated fas fa-grip-vertical"></i></div>,
);

export default DragSource(
  ItemTypes.BOX,
  gripSource,
  (connect) => ({
    connectDragSource: connect.dragSource(),
  }),
)(Grip);
