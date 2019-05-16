/**
  * <ReactFormBuilder />
*/

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Preview from './preview';
import Toolbar from './toolbar';
import ReactFormGenerator from './form';
import store from './stores/store';

class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
    };
  }

  editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, editElement: null });
    } else {
      this.setState({ editMode: !this.state.editMode, editElement: data });
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  render() {
    const toolbarProps = {};
    if (this.props.toolbarItems) { toolbarProps.items = this.props.toolbarItems; }
    return (
       <div>
         {/* <div>
           <p>
             It is easy to implement a sortable interface with React DnD. Just make
             the same component both a drag source and a drop target, and reorder
             the data in the <code>hover</code> handler.
           </p>
           <Container />
         </div> */}
         <div className="react-form-builder clearfix">
           <div>
             <Preview files={this.props.files}
                 manualEditModeOff={this.manualEditModeOff.bind(this)}
                 parent={this}
                 data={this.props.data}
                 url={this.props.url}
                 saveUrl={this.props.saveUrl}
                 onLoad={this.props.onLoad}
                 onPost={this.props.onPost}
                 editModeOn={this.editModeOn}
                 editMode={this.state.editMode}
                 variables={this.props.variables}
                 editElement={this.state.editElement} />
             <Toolbar {...toolbarProps} />
           </div>
         </div>
       </div>
    );
  }
}

const FormBuilders = {};

FormBuilders.ReactFormBuilder = DragDropContext(HTML5Backend)(ReactFormBuilder);
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;

export default FormBuilders;
