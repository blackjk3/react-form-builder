/**
  * <Preview />
  */

import React from 'react';
import ElementStore from './stores/ElementStore';
import ElementActions from './actions/ElementActions';
import FormElementsEdit from './form-elements-edit';

import * as SortableFormElements from './sortable-form-elements';
import update from 'immutability-helper';

const { PlaceHolder } = SortableFormElements;

export default class Preview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      answer_data: {}
    }

    var loadData = (this.props.url) ? this.props.url : (this.props.data) ? this.props.data : [];
    var saveUrl = (this.props.saveUrl) ? this.props.saveUrl : '';

    ElementStore.load(loadData, saveUrl);
    ElementStore.listen(this._onChange.bind(this));

    this.moveCard = this.moveCard.bind(this);
    this.insertCard = this.insertCard.bind(this);
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
  }

  updateElement(element) {
    let data = this.state.data;
    let found = false;

    for(var i=0, len=data.length; i < len; i++) {
      if (element.id === data[i].id) {
        data[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      ElementActions.saveData(data);
    }
  }

  _onChange(data) {
    let answer_data = {};

    data.forEach((item) => {
      if (item && item.readOnly && this.props.variables[item.variableKey]) {
        answer_data[item.field_name] = this.props.variables[item.variableKey];
      }
    });

    this.setState({
      data,
      answer_data
    });
  }

  _onDestroy(item) {
    ElementActions.deleteElement(item);
  }
  
  insertCard(item, hoverIndex) {
    const { data } = this.state
    data.splice(hoverIndex, 0, item)
    this.saveData(item, hoverIndex, hoverIndex)
  }

  moveCard(dragIndex, hoverIndex) {
    const { data } = this.state
		const dragCard = data[dragIndex]
    this.saveData(dragCard, dragIndex, hoverIndex)
  }

  cardPlaceHolder(dragIndex, hoverIndex) {
    // Dummy
  }

  saveData(dragCard, dragIndex, hoverIndex) {
    const newData =	update(this.state, {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    });
    this.setState(newData)
    ElementActions.saveData(newData.data);
  }

  getElement(item, index) {
    const SortableFormElement = SortableFormElements[item.element]
    return <SortableFormElement id={item.id} index={index} moveCard={this.moveCard} insertCard={this.insertCard} mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
  }

  render() {
    let classes = this.props.className;
    if (this.props.editMode) { classes += ' is-editing'; }
    const data = this.state.data.filter(x => !!x);
    const items = data.map((item, index) => {
      return this.getElement(item, index);
    })
    return (
      <div className={classes}>
        <div className="edit-form">
          { this.props.editElement !== null &&
            <FormElementsEdit showCorrectColumn={this.props.showCorrectColumn} files={this.props.files} manualEditModeOff={this.props.manualEditModeOff} preview={this} element={this.props.editElement} updateElement={this.updateElement} />
          }
        </div>
        <div className="Sortable">{items}</div>
         <PlaceHolder id="form-place-holder" show={items.length == 0} index={items.length} moveCard={this.cardPlaceHolder} insertCard={this.insertCard}/>
      </div>
    )
  }
}
Preview.defaultProps = { showCorrectColumn: false, files: [], editMode: false, editElement: null, className: 'react-form-builder-preview pull-left'}
