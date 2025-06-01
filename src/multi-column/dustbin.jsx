import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import FormElements from '../form-elements';
import ItemTypes from '../ItemTypes';

import CustomElement from '../form-elements/custom-element';
import Registry from '../stores/registry';
import store from '../stores/store';

function getCustomElement(item, props) {
  if (!item.component || typeof item.component !== 'function') {
    item.component = Registry.get(item.key);
    if (!item.component) {
      console.error(`${item.element} was not registered`);
    }
  }
  return (
    <CustomElement
      {...props}
      mutable={false}
      key={`form_${item.id}`}
      data={item}
    />
  );
}

function getElement(item, props) {
  if (!item) return null;
  if (item.custom) {
    return getCustomElement(item, props);
  }
  const Element = FormElements[item.element || item.key];
  return <Element {...props} key={`form_${item.id}`} data={item} />;
}

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '2rem',
    minWidth: '7rem',
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

const Dustbin = ({
  onDropSuccess,
  seq,
  parentIndex,
  items,
  col,
  getDataById,
  accepts,
  data,
  setAsChild,
  ...rest
}) => {
  const dropRef = useRef(null);
  const item = getDataById(items[col]);

  const [{ isOver, canDrop, draggedItem }, drop] = useDrop({
    accept: accepts,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedItem: monitor.getItem(),
    }),
    drop: (droppedItem) => {
      // Do nothing when moving the box inside the same column
      if (col === droppedItem.col && items[col] === droppedItem.id) return;

      // Do not allow replace component other than both items in same multi column row
      if (droppedItem.col === undefined && items[col]) {
        store.dispatch('resetLastItem');
        return;
      }

      if (!isContainer(droppedItem)) {
        console.log("Item dropped", droppedItem);
        
        const isBusy = !!items[col];
        
        if (droppedItem.data) {
          const isNew = !droppedItem.data.id;
          const itemData = isNew ? droppedItem.onCreate(droppedItem.data) : droppedItem.data;
          
          if (typeof setAsChild === 'function') {
            setAsChild(data, itemData, col, isBusy);
          }
          
          onDropSuccess && onDropSuccess();
          store.dispatch('deleteLastItem');
        }
      }
    },
    canDrop: (item) => {
      // Add any custom logic for when an item can be dropped
      return true;
    },
  });

  const element = getElement(item, rest);
  const sameCard = draggedItem ? draggedItem.index === parentIndex : false;

  let backgroundColor = 'rgba(0, 0, 0, .03)';

  if (!sameCard && isOver && canDrop && draggedItem && !draggedItem.data?.isContainer) {
    backgroundColor = '#F7F589';
  }

  // Connect the drop ref to the DOM element
  drop(dropRef);

  return (
    <div ref={dropRef} style={!sameCard ? getStyle(backgroundColor) : getStyle('rgba(0, 0, 0, .03)')}>
      {!element && <span>Drop your element here</span>}
      {element}
    </div>
  );
};

export default Dustbin;