/**
  * <Toolbar />
  */

import React from 'react';
import ToolbarItem from './toolbar-item';
import ID from './UUID';
import ElementActions from './actions/ElementActions';

export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);

    var items = (this.props.items) ? this.props.items : this._defaultItems();

    this.state = {
      items: items
    };
  }

  _defaultItems() {
    return [
      {
        key: 'Header',
        name: 'Header Text',
        icon: 'fa fa-header',
        static: true,
        content: 'Placeholder Text...'
      },
      {
        key: 'Paragraph',
        name: 'Paragraph',
        static: true,
        icon: 'fa fa-paragraph',
        content: 'Placeholder Text...'
      },
      {
        key: 'LineBreak',
        name: 'Line Break',
        static: true,
        icon: 'fa fa-arrows-h'
      },
      {
        key: 'Dropdown',
        name: 'Dropdown',
        icon: 'fa fa-caret-square-o-down',
        label: 'Placeholder Label',
        field_name: 'dropdown_',
        options: [
          {value: '', text: '', key: 'dropdown_option_'},
          {value: '', text: '', key: 'dropdown_option_'},
          {value: '', text: '', key: 'dropdown_option_'}
        ]
      },
      {
        key: 'Tags',
        name: 'Tags',
        icon: 'fa fa-tags',
        label: 'Placeholder Label',
        field_name: 'tags_',
        options: [
          {value: 'place_holder_tag_1', text: 'Place holder tag 1', key: 'tags_option_'},
          {value: 'place_holder_tag_2', text: 'Place holder tag 2', key: 'tags_option_'},
          {value: 'place_holder_tag_3', text: 'Place holder tag 3', key: 'tags_option_'}
        ]
      },
      {
        key: 'Checkboxes',
        name: 'Checkboxes',
        icon: 'fa fa-check-square-o',
        label: 'Placeholder Label',
        field_name: 'checkboxes_',
        options: [
          {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'checkboxes_option_'},
          {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'checkboxes_option_'},
          {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'checkboxes_option_'}
        ]
      },
      {
        key: 'RadioButtons',
        name: 'Multiple Choice',
        icon: 'fa fa-dot-circle-o',
        label: 'Placeholder Label',
        field_name: 'radio_buttons_',
        options: [
          {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'radiobuttons_option_'},
          {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'radiobuttons_option_'},
          {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'radiobuttons_option_'}
        ]
      },
      {
        key: 'TextInput',
        name: 'Text Input',
        label: 'Placeholder Label',
        icon: 'fa fa-font',
        field_name: 'text_input_'
      },
      {
        key: 'TextArea',
        name: 'Multi-line Input',
        label: 'Placeholder Label',
        icon: 'fa fa-text-height',
        field_name: 'text_area_'
      },
      {
        key: 'Rating',
        name: 'Rating',
        label: 'Placeholder Label',
        icon: 'fa fa-star',
        field_name: 'rating_'
      },
      {
        key: 'DatePicker',
        name: 'Date',
        icon: 'fa fa-calendar',
        label: 'Placeholder Label',
        field_name: 'date_picker_'
      },
      {
        key: 'Signature',
        name: 'Signature',
        icon: 'fa fa-pencil-square-o',
        label: 'Signature',
        field_name: 'signature_'
      },
      {
        key: 'HyperLink',
        name: 'Web site',
        icon: 'fa fa-link',
        static: true,
        content: 'Placeholder Web site link ...',
        href: 'http://www.example.com'
      },
      {
        key: 'Download',
        name: 'File Attachment',
        icon: 'fa fa-file',
        static: true,
        content: 'Placeholder file name ...',
        field_name: 'download_',
        file_path: '',
        _href: ''
      },
      {
        key: 'Range',
        name: 'Range',
        icon: 'fa fa-sliders',
        label: 'Placeholder Label',
        field_name: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: 'Easy',
        max_label: 'Difficult'
      },
      {
        key: 'Camera',
        name: 'Camera',
        icon: 'fa fa-camera',
        label: 'Placeholder Label',
        field_name: 'camera_'
      }
    ]
  }

  _onClick(item) {

    var elementOptions = {
      id: ID.uuid(),
      element: item.key,
      text: item.name,
      static: item.static,
      required: false
    };

    if (item.content)
      elementOptions['content'] = item.content;

    if (item.href)
      elementOptions['href'] = item.href;

    if (item.key === "Download") {
      elementOptions['_href'] = item._href;
      elementOptions['file_path'] = item.file_path;
    }

    if (item.key === "Range") {
      elementOptions['step'] = item.step;
      elementOptions['default_value'] = item.default_value;
      elementOptions['min_value'] = item.min_value;
      elementOptions['max_value'] = item.max_value;
      elementOptions['min_label'] = item.min_label;
      elementOptions['max_label'] = item.max_label;
    }

    if (item.defaultValue)
      elementOptions['defaultValue'] = item.defaultValue;

    if (item.field_name)
      elementOptions['field_name'] = item.field_name + ID.uuid();

    if (item.label)
      elementOptions['label'] = item.label;

    if (item.options) {
      let options = item.options.map(item => {
        item.key += ID.uuid();
        return item;
      });
      elementOptions['options'] = options;
    }

    ElementActions.createElement(elementOptions);
  }

  render() {
    return (
      <div className="react-form-builder-toolbar pull-right">
        <h4>Toolbox</h4>
        <ul>
          {
            this.state.items.map(item => {
              return <ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item) } />;
            })
          }
        </ul>
      </div>
    )
  }
}