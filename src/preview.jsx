/**
  * <Preview />
  */

import React from 'react';
// import Sortable from 'react-sortable-items';
import ElementStore from './stores/ElementStore';
import ElementActions from './actions/ElementActions';
import {Header,Paragraph,Label,LineBreak,TextInput,NumberInput,TextArea,Dropdown,Checkboxes,DatePicker,RadioButtons,Image,Rating,Tags,Signature,HyperLink,Download,Camera,Range} from './sortable-form-elements';
import FormElementsEdit from './form-elements-edit';

import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class SortableContainer extends React.Component { 
	render() {
		return <div className="Sortable">{this.props.items}</div>;
	}
}

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

  handleSort(orderedIds) {
    let sortedArray = [];
    let data = this.state.data;
    let index = 0;

    for(var i=0, len=data.length; i < len; i++) {
      index = orderedIds.indexOf(data[i].id);
      sortedArray[index] = data[i];
    }

    ElementActions.saveData(sortedArray);
    this.state.data = sortedArray;
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
    switch (item.element) {
      case "Header":
        return <Header id={item.id} index={index} moveCard={this.moveCard} mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Paragraph":
        return <Paragraph id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Label":
        return <Label id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "LineBreak":
        return <LineBreak id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "TextInput":
        return <TextInput id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "NumberInput":
        return <NumberInput id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "TextArea":
        return <TextArea id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Dropdown":
        return <Dropdown id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Checkboxes":
        return <Checkboxes id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "DatePicker":
        return <DatePicker id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "RadioButtons":
        return <RadioButtons id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Rating":
        return <Rating id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Image":
        return <Image id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Tags":
        return <Tags id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      // case "Signature":
      //   return <Signature
      //     id={item.id} index={index} moveCard={this.moveCard} mutable={false} 
      //     parent={this.props.parent}
      //     editModeOn={this.props.editModeOn}
      //     isDraggable={true}
      //     key={item.id}
      //     sortData={item.id}
      //     data={item}
      //     read_only={item.readOnly}
      //     defaultValue={this.state.answer_data[item.field_name]}
      //     _onDestroy={this._onDestroy} />
      case "HyperLink":
        return <HyperLink id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Download":
        return <Download id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      case "Camera":
        return <Camera id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
      // case "Range":
      //   return <Range id={item.id} index={index} moveCard={this.moveCard} mutable={false}  parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
    }
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
        {/* <Sortable sensitivity={0} key={this.state.data.length} onSort={this.handleSort.bind(this)}>
          {items}
        </Sortable> */}
        <SortableContainer items={items} />
      </div>
    )
  }
}
Preview.defaultProps = { showCorrectColumn: false, files: [], editMode: false, editElement: null, className: 'react-form-builder-preview pull-left'}
