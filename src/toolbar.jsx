/**
  * <Toolbar />
  */

import React from 'react';
import { injectIntl } from 'react-intl';
import ToolbarItem from './toolbar-draggable-item';
import ID from './UUID';
import store from './stores/store';

function isDefaultItem(item) {
  const keys = Object.keys(item);
  return keys.filter(x => x !== 'element' && x !== 'key').length === 0;
}

function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map(x => {
    let found;
    if (isDefaultItem(x)) {
      found = defaultItems.find(y => (x.element || x.key) === (y.element || y.key));
    }
    return found || x;
  });
}

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    const { intl } = this.props;
    const items = buildItems(props.items, this._defaultItems(intl));
    this.state = {
      items,
    };
    store.subscribe(state => this.setState({ store: state }));
    this.create = this.create.bind(this);
  }

  static _defaultItemOptions(element, intl) {
    switch (element) {
      case 'Dropdown':
        return [
          { value: 'place_holder_option_1', text: intl.formatMessage({ id: 'place-holder-option-1' }), key: `dropdown_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: intl.formatMessage({ id: 'place-holder-option-2' }), key: `dropdown_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: intl.formatMessage({ id: 'place-holder-option-3' }), key: `dropdown_option_${ID.uuid()}` },
        ];
      case 'Tags':
        return [
          { value: 'place_holder_tag_1', text: intl.formatMessage({ id: 'place-holder-tag-1' }), key: `tags_option_${ID.uuid()}` },
          { value: 'place_holder_tag_2', text: intl.formatMessage({ id: 'place-holder-tag-2' }), key: `tags_option_${ID.uuid()}` },
          { value: 'place_holder_tag_3', text: intl.formatMessage({ id: 'place-holder-tag-3' }), key: `tags_option_${ID.uuid()}` },
        ];
      case 'Checkboxes':
        return [
          { value: 'place_holder_option_1', text: intl.formatMessage({ id: 'place-holder-option-1' }), key: `checkboxes_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: intl.formatMessage({ id: 'place-holder-option-2' }), key: `checkboxes_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: intl.formatMessage({ id: 'place-holder-option-3' }), key: `checkboxes_option_${ID.uuid()}` },
        ];
      case 'RadioButtons':
        return [
          { value: 'place_holder_option_1', text: intl.formatMessage({ id: 'place-holder-option-1' }), key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: intl.formatMessage({ id: 'place-holder-option-2' }), key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: intl.formatMessage({ id: 'place-holder-option-3' }), key: `radiobuttons_option_${ID.uuid()}` },
        ];
      default:
        return [];
    }
  }

  _defaultItems(intl) {
    return [
      {
        key: 'Header',
        name: intl.formatMessage({ id: 'header-text' }),
        icon: 'fas fa-heading',
        static: true,
        content: intl.formatMessage({ id: 'place-holder-text' }),
      },
      {
        key: 'Label',
        name: intl.formatMessage({ id: 'label' }),
        static: true,
        icon: 'fas fa-font',
        content: intl.formatMessage({ id: 'place-holder-text' }),
      },
      {
        key: 'Paragraph',
        name: intl.formatMessage({ id: 'paragraph' }),
        static: true,
        icon: 'fas fa-paragraph',
        content: intl.formatMessage({ id: 'place-holder-text' }),
      },
      {
        key: 'LineBreak',
        name: intl.formatMessage({ id: 'line-break' }),
        static: true,
        icon: 'fas fa-arrows-alt-h',
      },
      {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'dropdown' }),
        icon: 'far fa-caret-square-down',
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'dropdown_',
        options: [],
      },
      {
        key: 'Tags',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'tags' }),
        icon: 'fas fa-tags',
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'tags_',
        options: [],
      },
      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'checkboxes' }),
        icon: 'far fa-check-square',
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'checkboxes_',
        options: [],
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'multiple-choice' }),
        icon: 'far fa-dot-circle',
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'radiobuttons_',
        options: [],
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'text-input' }),
        label: intl.formatMessage({ id: 'place-holder-label' }),
        icon: 'fas fa-font',
        field_name: 'text_input_',
      },
      {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'number-input' }),
        label: intl.formatMessage({ id: 'place-holder-label' }),
        icon: 'fas fa-plus',
        field_name: 'number_input_',
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'multi-line-input' }),
        label: intl.formatMessage({ id: 'place-holder-label' }),
        icon: 'fas fa-text-height',
        field_name: 'text_area_',
      },
      {
        key: 'TwoColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'two-columns-row' }),
        label: '',
        icon: 'fas fa-columns',
        field_name: 'two_col_row_',
      },
      {
        key: 'ThreeColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'three-columns-row' }),
        label: '',
        icon: 'fas fa-columns',
        field_name: 'three_col_row_',
      },
      {
        key: 'FourColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'four-columns-row' }),
        label: '',
        icon: 'fas fa-columns',
        field_name: 'four_col_row_',
      },
      {
        key: 'Image',
        name: intl.formatMessage({ id: 'image' }),
        label: '',
        icon: 'far fa-image',
        field_name: 'image_',
        src: '',
      },
      {
        key: 'Rating',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'rating' }),
        label: intl.formatMessage({ id: 'place-holder-label' }),
        icon: 'fas fa-star',
        field_name: 'rating_',
      },
      {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'hh:mm aa',
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: intl.formatMessage({ id: 'date' }),
        icon: 'far fa-calendar-alt',
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'date_picker_',
      },
      {
        key: 'Signature',
        canReadOnly: true,
        name: intl.formatMessage({ id: 'signature' }),
        icon: 'fas fa-pen-square',
        label: intl.formatMessage({ id: 'signature' }),
        field_name: 'signature_',
      },
      {
        key: 'HyperLink',
        name: intl.formatMessage({ id: 'website' }),
        icon: 'fas fa-link',
        static: true,
        content: intl.formatMessage({ id: 'place-holder-website-link' }),
        href: 'http://www.example.com',
      },
      {
        key: 'Download',
        name: intl.formatMessage({ id: 'file-attachment' }),
        icon: 'fas fa-file',
        static: true,
        content: intl.formatMessage({ id: 'place-holder-file-name' }),
        field_name: 'download_',
        file_path: '',
        _href: '',
      },
      {
        key: 'Range',
        name: intl.formatMessage({ id: 'range' }),
        icon: 'fas fa-sliders-h',
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: intl.formatMessage({ id: 'easy' }),
        max_label: intl.formatMessage({ id: 'difficult' }),
      },
      {
        key: 'Camera',
        name: intl.formatMessage({ id: 'camera' }),
        icon: 'fas fa-camera',
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'camera_',
      },
    ];
  }

  create(item) {
    const { intl } = this.props;

    const elementOptions = {
      id: ID.uuid(),
      element: item.element || item.key,
      text: item.name,
      static: item.static,
      required: false,
      showDescription: item.showDescription,
    };

    if (this.props.showDescription === true && !item.static) {
      elementOptions.showDescription = true;
    }

    if (item.type === 'custom') {
      elementOptions.key = item.key;
      elementOptions.custom = true;
      elementOptions.forwardRef = item.forwardRef;
      elementOptions.bare = item.bare;
      elementOptions.props = item.props;
      elementOptions.component = item.component || null;
      elementOptions.custom_options = item.custom_options || [];
    }

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) { elementOptions.canHaveAnswer = item.canHaveAnswer; }

    if (item.canReadOnly) { elementOptions.readOnly = false; }

    if (item.canDefaultToday) { elementOptions.defaultToday = false; }

    if (item.content) { elementOptions.content = item.content; }

    if (item.href) { elementOptions.href = item.href; }

    elementOptions.canHavePageBreakBefore = item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
    if (elementOptions.canHaveDisplayHorizontal) {
      elementOptions.inline = item.inline;
    }
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;

    if (item.class_name) {
      elementOptions.class_name = item.class_name;
    }

    if (item.key === 'Image') {
      elementOptions.src = item.src;
    }

    if (item.key === 'DatePicker') {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
      elementOptions.showTimeInput = item.showTimeInput;
    }

    if (item.key === 'Download') {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (item.key === 'Range') {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.defaultValue) { elementOptions.defaultValue = item.defaultValue; }

    if (item.field_name) { elementOptions.field_name = item.field_name + ID.uuid(); }

    if (item.label) { elementOptions.label = item.label; }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options;
      } else {
        elementOptions.options = Toolbar._defaultItemOptions(elementOptions.element, intl);
      }
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch('create', this.create(item));
  }

  render() {
    return (
      <div className="col-md-3 react-form-builder-toolbar float-right">
        <h4>{this.props.intl.formatMessage({ id: 'toolbox' })}</h4>
        <ul>
          {
            this.state.items.map((item) => (<ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />))
          }
        </ul>
      </div>
    );
  }
}

export default injectIntl(Toolbar);
