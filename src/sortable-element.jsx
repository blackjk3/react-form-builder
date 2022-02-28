import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'pointer',
};

const cardSource = {
  beginDrag(props) {
    return {
      itemType: ItemTypes.CARD,
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  drop(
    props,
    monitor,
    component,
  ) {
    if (!component) {
      return;
    }

    const item = monitor.getItem();
    const hoverIndex = props.index;
    const dragIndex = item.index;

    if ((props.data && props.data.isContainer) || item.itemType === ItemTypes.CARD) {
      // console.log('cardTarget -  Drop', item.itemType);
      return;
    }
    if (item.data && typeof item.setAsChild === 'function') {
      // console.log('BOX', item);
      if (dragIndex === -1) {
        props.insertCard(item, hoverIndex, item.id);
      }
    }
  },
  hover(props, monitor, component) {
    const item = monitor.getItem();

    if (item.itemType === ItemTypes.BOX && item.index === -1) return;

    // Don't replace multi-column component unless both drag & hover are multi-column
    if (props.data?.isContainer && !item.data?.isContainer) return;

    const dragIndex = item.index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    if (dragIndex === -1) {
      if (props.data && props.data.isContainer) {
        return;
      }
      // console.log('CARD', item);
      item.index = hoverIndex;
      props.insertCard(item.onCreate(item.data), hoverIndex);
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.

    // if (item.itemType == ItemTypes.BOX) item.cardIndex = hoverIndex;
    // else
    item.index = hoverIndex;
  },
};

// eslint-disable-next-line no-unused-vars
export default function (ComposedComponent) {
  class Card extends Component {
    static propTypes = {
      connectDragSource: PropTypes.func,
      connectDragPreview: PropTypes.func,
      connectDropTarget: PropTypes.func,
      index: PropTypes.number.isRequired,
      isDragging: PropTypes.bool,
      id: PropTypes.any.isRequired,
      // text: PropTypes.string.isRequired,
      moveCard: PropTypes.func.isRequired,
      seq: PropTypes.number,
    }

    static defaultProps = {
      seq: -1,
    };

    render() {
      const {
        isDragging,
        // connectDragSource,
        connectDragPreview,
        connectDropTarget,
      } = this.props;
      const opacity = isDragging ? 0 : 1;

      return connectDragPreview(
        connectDropTarget(<div><ComposedComponent {...this.props} style={{ ...style, opacity }}></ComposedComponent></div>),
      );
    }
  }

  const x = DropTarget([ItemTypes.CARD, ItemTypes.BOX], cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))(Card);
  return DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))(x);
}
