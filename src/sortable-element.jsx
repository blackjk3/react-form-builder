import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'pointer',
};

// Modern approach using a custom hook for DnD logic
const useDragAndDrop = (props) => {
  const ref = useRef(null);
  
  // Setup drag
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({
      itemType: ItemTypes.CARD,
      id: props.id,
      index: props.index,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Setup drop
  const [, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.BOX],
    drop: (item) => {
      // Don't handle drops if we're a container and this is a card drop
      if ((props.data && props.data.isContainer) || item.itemType === ItemTypes.CARD) {
        return;
      }
      
      const hoverIndex = props.index;
      const dragIndex = item.index;
      
      // Handle box drops
      if (item.data && typeof item.setAsChild === 'function') {
        if (dragIndex === -1) {
          props.insertCard(item, hoverIndex, item.id);
        }
      }
    },
    hover: (item, monitor) => {
      // Don't replace items being dragged from box with index -1
      if (item.itemType === ItemTypes.BOX && item.index === -1) return;

      // Don't replace multi-column component unless both drag & hover are multi-column
      if (props.data?.isContainer && !item.data?.isContainer) return;

      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Handle new items being created
      if (dragIndex === -1) {
        if (props.data && props.data.isContainer) {
          return;
        }
        
        item.index = hoverIndex;
        props.insertCard(item.onCreate(item.data), hoverIndex);
        return;
      }

      // Skip if no ref available
      if (!ref.current) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

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
      item.index = hoverIndex;
    },
  });

  // Connect the drag and drop refs to the same element
  return {
    ref: (node) => {
      ref.current = node;
      drop(node);
      drag(node);
    },
    previewRef: preview,
    isDragging,
  };
};

// Modern approach using a functional component wrapper instead of HOC
const DraggableCard = (props) => {
  const {
    index,
    id,
    moveCard,
    seq = -1,
    ...restProps
  } = props;

  const { ref, previewRef, isDragging } = useDragAndDrop(props);
  const opacity = isDragging ? 0 : 1;

  // Use the ComposedComponent passed in props
  const ComposedComponent = props.component;

  return (
    <div ref={previewRef}>
      <div ref={ref}>
        <ComposedComponent 
          {...restProps} 
          index={index}
          id={id}
          moveCard={moveCard}
          seq={seq}
          style={{ ...style, opacity }} 
        />
      </div>
    </div>
  );
};

DraggableCard.propTypes = {
  component: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool,
  id: PropTypes.any.isRequired,
  moveCard: PropTypes.func.isRequired,
  seq: PropTypes.number,
};

DraggableCard.defaultProps = {
  seq: -1,
};

// This replaces the HOC pattern with a component that takes the component as a prop
export default function createDraggableCard(ComposedComponent) {
  return (props) => <DraggableCard {...props} component={ComposedComponent} />;
}