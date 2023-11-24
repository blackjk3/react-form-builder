import React, { useImperativeHandle, Fragment } from 'react';
import { DropTarget } from 'react-dnd';
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

const Dustbin = React.forwardRef(
  ({
    onDropSuccess, seq, draggedItem, parentIndex, canDrop, isOver, isOverCurrent, connectDropTarget, items, col, getDataById, ...rest
  }, ref) => {
    const item = getDataById(items[col]);
    useImperativeHandle(
      ref,
      () => ({
        onDrop: (dropped) => {
          console.log("dropped ites")
          const { data } = dropped;
          if (data) {
            onDropSuccess && onDropSuccess();
            store.dispatch('deleteLastItem');
          }
        },
      }),
      [],
    );

    const element = getElement(item, rest);
    const sameCard = draggedItem ? draggedItem.index === parentIndex : false;

    // console.log('dragIndex:',draggedItem?.index)
    // console.log('HoverIndex:',parentIndex)
    // console.log('SameCard:',sameCard)

    let backgroundColor = 'rgba(0, 0, 0, .03)';

    if (!sameCard && isOver && canDrop && !draggedItem.data.isContainer) {
      backgroundColor = '#F7F589';
    }

    // console.log('sameCard, canDrop', sameCard, canDrop);
    return connectDropTarget(
      <div style={!sameCard ? getStyle(backgroundColor) : getStyle('rgba(0, 0, 0, .03') }>
      {!element && <span>Drop your element here </span>}
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

      // //Do nothing whith busy dustbin
      // if(props.items[props.col]) return;
      // Allow swap column if target and source are in same multi column row
      const isBusy = !!props.items[props.col];
      const item = monitor.getItem();

      // Do nothing when moving the box inside the same column
      if (props.col === item.col && props.items[props.col] === item.id) return;

      // Do not allow replace component other than both items in same multi column row
      if (item.col === undefined && props.items[props.col]) {
        store.dispatch('resetLastItem');
        return;
      }

      if (!isContainer(item)) {
        (component).onDrop(item);
        console.log("calling on Drop from 137",item)
        if (item.data && typeof props.setAsChild === 'function') {
          const isNew = !item.data.id;
          const data = isNew ? item.onCreate(item.data) : item.data;
          props.setAsChild(props.data, data, props.col, isBusy);
        }
      }
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    draggedItem: monitor.getItem() ? monitor.getItem() : null,
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin);
