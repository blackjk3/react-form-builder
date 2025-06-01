/* eslint-disable max-classes-per-file */
import * as React from 'react';

type BaseElement = {
  id: string;
  element:
    | "Header Text"
    | "Label"
    | "Paragraph"
    | "Line Break"
    | "Dropdown"
    | "Tags"
    | "Checkboxes"
    | "Multiple Choice"
    | "Text Input"
    | "Number Input"
    | "Multi-line Input"
    | "Two Column Row"
    | "Three Column Row"
    | "Multi Column Row"
    | "Image"
    | "Rating"
    | "Date"
    | "Signature"
    | "Web site"
    | "Fieldset"
    | "File Attachment"
    | "Range"
    | "Camera";
  showDescription?: boolean;
  required: boolean;
  canHaveAlternateForm: boolean;
  canHaveDisplayHorizontal: boolean;
  canHaveOptionCorrect: boolean;
  canHaveOptionValue: boolean;
  canHavePageBreakBefore: boolean;
  canPopulateFromApi: boolean;
  text: string;
};
export type StaticElement = {
  bold: boolean;
  content: string;
  inline?: boolean;
  italic: boolean;
  static: true;
};
export type FormBuilderInput = {
  canHaveAnswer?: true;
  field_name: string;
  label: string;
};
export type Option = {
  key: string;
  label?: string;
  text: string;
  value: string;
};
export type SelectableElement = {
  options: Option[];
} & FormBuilderInput;
export type ImageElement = {
  field_name: string;
  src: string;
};
export type DateElement = {
  dateFormat: string;
  defaultToday: boolean;
  readOnly: boolean;
  showTimeSelect: boolean;
  showTimeSelectOnly: boolean;
  showTimeInput: boolean;
  timeFormat: string;
} & FormBuilderInput;
export type RangeElement = {
  max_label: string;
  max_value: number;
  min_label: string;
  min_value: number;
} & FormBuilderInput;
export type FileElement = {
  _href: string;
  file_path: string;
  field_name: string;
} & StaticElement;
export type WebsiteElement = {
  href: string;
} & StaticElement;
export type SignatureElement = {
  readOnly: boolean;
} & FormBuilderInput;
export type TaskData = BaseElement &
  (| StaticElement
    | FormBuilderInput
    | SelectableElement
    | ImageElement
    | DateElement
    | RangeElement
    | WebsiteElement
    | FileElement
    | SignatureElement
    // eslint-disable-next-line no-use-before-define
    | FormBuilderLayout
  );
export type FormBuilderLayout = {
  isContainer: true;
  childItems: TaskData[];
  field_name: string;
};
export type FormBuilderPostData = {
  task_data: TaskData[];
};

export type ToolbarItem = {
  key: string;
  name: string;
  static: boolean;
  icon: string;
  content: string;
};

export interface FormBuilderProps {
  toolbarItems?: ToolbarItem[];
  files?: any[];
  locale?: string;
  url?: string;
  showCorrectColumn?: boolean;
  show_description?: boolean;
  onLoad?: () => Promise<FormBuilderPostData>;
  onPost?: (data: FormBuilderPostData) => void;
  saveUrl?: string;
  saveAlways?: boolean;
  editMode?: boolean;
  renderEditForm?: (props: BaseElement) => React.ReactNode;
}

export class ReactFormBuilder extends React.Component<FormBuilderProps> {}

export interface FormGeneratorOnSubmitParams {
  id: number;
  name: string;
  custom_name: string;
  value: string | string[];
}

export interface FormGeneratorProps {
  form_action: string;
  form_method: string;
  action_name?: string;
  onBlur?: (info: FormGeneratorOnSubmitParams[]) => void;
  onSubmit?: (info: FormGeneratorOnSubmitParams[]) => void;
  onChange?: (info: FormGeneratorOnSubmitParams[]) => void;
  data: any[];
  back_action?: string;
  back_name?: string;
  locale?: string;
  task_id?: number;
  answer_data?: any[];
  authenticity_token?: string;
  hide_actions?: boolean;
  skip_validations?: boolean;
  option_key_value?: 'key' | 'value';
  download_path?: string;
  display_short?: boolean;
  read_only?: boolean;
  // eslint-disable-next-line no-undef
  variables?: Record<any, any>;
  submitButton?: JSX.Element;
}

export class ReactFormGenerator extends React.Component<FormGeneratorProps> {}

export type ActionType = "load" | "updateOrder" | "delete";

export class ElementStore {
  static dispatch: (type: ActionType, data: any) => void;
}

export class Registry {
  static register: (name: string, component: React.ReactNode) => void;

  static list: () => string[];

  static get: (name: string) => React.ReactNode;
}
