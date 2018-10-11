/**
  * <ReactFormBuilder />
*/

import React from 'react';
import Preview from './preview';
import Toolbar from './toolbar';
import ReactFormGenerator from './form';
import store from './stores/store';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ReactFormBuilder extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null
    }
    document.addEventListener("click", this.editModeOff.bind(this));
  }

  editModeOn(data, e) {
    e.stopPropagation()
    if (this.state.editMode) {
      this.setState({editMode: !this.state.editMode, editElement: null});
    } else {
      this.setState({editMode: !this.state.editMode, editElement: data});
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null
      });
    }
  }

  editModeOff(e) {
    //  const $menu = $(".edit-form");
    //  let click_is_outside_menu = (!$menu.is(e.target) && $menu.has(e.target).length === 0);
    let click_is_outside_menu = !(e.target && e.target.closest(".edit-form")) && e.screenX > 0;
  
    if (this.state.editMode && click_is_outside_menu) {
      this.setState({
        editMode: false,
        editElement: null
      });
    }
  }

 render() {
   let toolbarProps = {};
   if (this.props.toolbarItems)
     toolbarProps.items = this.props.toolbarItems;
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
                 url={this.props.url}
                 saveUrl={this.props.saveUrl}
                 onLoad={this.props.onLoad}
                 onPost={this.props.onPost}
                 editModeOn={this.editModeOn}
                 editMode={this.state.editMode}
                 variables={this.props.variables}
                 editElement={this.state.editElement} />
             <Toolbar {...this.props.toolbarItems} />
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

module.exports = FormBuilders;
