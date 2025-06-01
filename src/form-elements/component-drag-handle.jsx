import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemTypes from '../ItemTypes';

const style = {
  cursor: 'move',
};

const DragHandle = (props) => {
  const { data, index, onDestroy, setAsChild, getDataById } = props;

  const [, dragRef, dragPreviewRef] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({
      itemType: ItemTypes.BOX,
      index: data.parentId ? -1 : index,
      parentIndex: data.parentIndex,
      id: data.id,
      col: data.col,
      onDestroy,
      setAsChild,
      getDataById,
      data,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Use empty image as drag preview
  useEffect(() => {
    dragPreviewRef(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }, [dragPreviewRef]);

  return (
    <div ref={dragRef} className="btn is-isolated" style={style}>
      <i className="is-isolated fas fa-grip-vertical"></i>
    </div>
  );
};

export default DragHandle;
