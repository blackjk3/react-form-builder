/**
  * <Preview />
  */

import React from 'react';
import ElementStore from './stores/ElementStore';
import ElementActions from './actions/ElementActions';
import FormElementsEdit from './form-elements-edit';

import * as SortableFormElements from './sortable-form-elements';

import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
      if (item.readOnly && this.props.variables[item.variableKey]) {
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
    const dragCard = item
    const dragIndex = hoverIndex

    data.splice(hoverIndex, 0, item)

		this.setState(
			update(this.state, {
				data: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
  }

  moveCard(dragIndex, hoverIndex) {
    const { data } = this.state
		const dragCard = data[dragIndex]

		this.setState(
			update(this.state, {
				data: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
  }

  getElement(item, index) {
    const SortableFormElement = SortableFormElements[item.element]
    return <SortableFormElement id={item.id} index={index} moveCard={this.moveCard} insertCard={this.insertCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
  }

  render() {
    let classes = this.props.className;
    if (this.props.editMode) { classes += ' is-editing'; }
    let items = this.state.data.map((item, index) => {
      return this.getElement(item, index);
    })
    return (
      <div className={classes}>
        <div className="edit-form">
          { this.props.editElement !== null &&
            <FormElementsEdit showCorrectColumn={this.props.showCorrectColumn} files={this.props.files} manualEditModeOff={this.props.manualEditModeOff} preview={this} element={this.props.editElement} updateElement={this.updateElement} />
          }
        </div>
        {/* <SortableContainer items={items} /> */}
        <div className="Sortable">{items}</div>
      </div>
    )
  }
}
Preview.defaultProps = { showCorrectColumn: false, files: [], editMode: false, editElement: null, className: 'react-form-builder-preview pull-left'}
