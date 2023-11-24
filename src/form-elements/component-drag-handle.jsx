import React, { PureComponent } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemTypes from '../ItemTypes';

const style = {
  // display: 'inline-block',
  // border: '1px dashed gray',
  // padding: '0.5rem 1rem',
  // backgroundColor: 'white',
  cursor: 'move',
};

const dragHandleSource = {
  beginDrag(props) {
    const {
      data, index, onDestroy, setAsChild, getDataById,
    } = props;
    return {
      itemType: ItemTypes.BOX,
      index: data.parentId ? -1 : index,
      parentIndex: data.parentIndex,
      id: data.id,
      col: data.col,
      onDestroy,
      setAsChild,
      getDataById,
      data,
    };
  },
};

class DragHandle extends PureComponent {
  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      });
    }
  }

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(<div className="btn is-isolated" style={style} ><i className="is-isolated fas fa-grip-vertical"></i></div>);
  }
}

export default DragSource(
  ItemTypes.BOX,
  dragHandleSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
)(DragHandle);
