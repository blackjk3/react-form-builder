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

  _defaultItemOptions(element) {
    switch(element) {
      case "Dropdown":
        return [
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()},
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()},
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()}
        ];
      case "Tags":
        return [
          {value: 'place_holder_tag_1', text: 'Place holder tag 1', key: 'tags_option_' + ID.uuid()},
          {value: 'place_holder_tag_2', text: 'Place holder tag 2', key: 'tags_option_' + ID.uuid()},
          {value: 'place_holder_tag_3', text: 'Place holder tag 3', key: 'tags_option_' + ID.uuid()}
        ];
      case "Checkboxes":
        return [
          {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'checkboxes_option_' + ID.uuid()},
          {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'checkboxes_option_' + ID.uuid()},
          {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'checkboxes_option_' + ID.uuid()}
        ];
      case "RadioButtons":
        return [
          {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'radiobuttons_option_' + ID.uuid()},
          {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'radiobuttons_option_' + ID.uuid()},
          {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'radiobuttons_option_' + ID.uuid()}
        ];
      default:
        return [];
    }
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
        key: 'Label',
        name: 'Label',
        static: true,
        icon: 'fa fa-font',
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
        canHaveAnswer: true,
        name: 'Dropdown',
        icon: 'fa fa-caret-square-o-down',
        label: 'Placeholder Label',
        field_name: 'dropdown_',
        options: []
      },
      {
        key: 'Tags',
        canHaveAnswer: true,
        name: 'Tags',
        icon: 'fa fa-tags',
        label: 'Placeholder Label',
        field_name: 'tags_',
        options: []
      },
      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: 'Checkboxes',
        icon: 'fa fa-check-square-o',
        label: 'Placeholder Label',
        field_name: 'checkboxes_',
        options: []
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: 'Multiple Choice',
        icon: 'fa fa-dot-circle-o',
        label: 'Placeholder Label',
        field_name: 'radio_buttons_',
        options: []
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        name: 'Text Input',
        label: 'Placeholder Label',
        icon: 'fa fa-font',
        field_name: 'text_input_'
      },
      {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: 'Number Input',
        label: 'Placeholder Label',
        icon: 'fa fa-plus',
        field_name: 'number_input_'
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        name: 'Multi-line Input',
        label: 'Placeholder Label',
        icon: 'fa fa-text-height',
        field_name: 'text_area_'
      },
      {
        key: 'Image',
        name: 'Image',
        label: '',
        icon: 'fa fa-photo',
        field_name: 'image_',
        src: ''
      },
      {
        key: 'Rating',
        canHaveAnswer: true,
        name: 'Rating',
        label: 'Placeholder Label',
        icon: 'fa fa-star',
        field_name: 'rating_'
      },
      {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        name: 'Date',
        icon: 'fa fa-calendar',
        label: 'Placeholder Label',
        field_name: 'date_picker_'
      },
      {
        key: 'Signature',
        canReadOnly: true,
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

    if(item.static) {
      elementOptions['bold'] = false;
      elementOptions['italic'] = false;
    }

    if (item.canHaveAnswer)
      elementOptions['canHaveAnswer'] = item.canHaveAnswer;

    if (item.canReadOnly)
      elementOptions['readOnly'] = false;

    if (item.canDefaultToday)
      elementOptions['defaultToday'] = false;

    if (item.content)
      elementOptions['content'] = item.content;

    if (item.href)
      elementOptions['href'] = item.href;

    if (item.key === "Image") {
      elementOptions['src'] = item.src;
    }

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
      elementOptions['options'] = this._defaultItemOptions(elementOptions['element']);
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
