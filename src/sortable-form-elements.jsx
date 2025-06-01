import SortableElement from './sortable-element';
import PlaceHolder from './form-place-holder';
import BaseFormElements from './form-elements';
import { TwoColumnRow, ThreeColumnRow, MultiColumnRow } from './multi-column';
import { FieldSet } from './fieldset';
import CustomElement from './form-elements/custom-element';

const {
  Header, Paragraph, Label, LineBreak, TextInput, EmailInput, PhoneNumber, NumberInput, TextArea, Dropdown, Checkboxes,
  DatePicker, RadioButtons, Image, Rating, Tags, Signature, HyperLink, Download, Camera, Range, FileUpload,
} = BaseFormElements;

const FormElements = {};

FormElements.Header = SortableElement(Header);
FormElements.Paragraph = SortableElement(Paragraph);
FormElements.Label = SortableElement(Label);
FormElements.LineBreak = SortableElement(LineBreak);
FormElements.TextInput = SortableElement(TextInput);
FormElements.EmailInput = SortableElement(EmailInput);
FormElements.PhoneNumber = SortableElement(PhoneNumber);
FormElements.NumberInput = SortableElement(NumberInput);
FormElements.TextArea = SortableElement(TextArea);
FormElements.Dropdown = SortableElement(Dropdown);
FormElements.Signature = SortableElement(Signature);
FormElements.Checkboxes = SortableElement(Checkboxes);
FormElements.DatePicker = SortableElement(DatePicker);
FormElements.RadioButtons = SortableElement(RadioButtons);
FormElements.Image = SortableElement(Image);
FormElements.Rating = SortableElement(Rating);
FormElements.Tags = SortableElement(Tags);
FormElements.HyperLink = SortableElement(HyperLink);
FormElements.Download = SortableElement(Download);
FormElements.Camera = SortableElement(Camera);
FormElements.FileUpload = SortableElement(FileUpload);
FormElements.Range = SortableElement(Range);
FormElements.PlaceHolder = SortableElement(PlaceHolder);
FormElements.FieldSet = SortableElement(FieldSet);
FormElements.TwoColumnRow = SortableElement(TwoColumnRow);
FormElements.ThreeColumnRow = SortableElement(ThreeColumnRow);
FormElements.MultiColumnRow = SortableElement(MultiColumnRow);
FormElements.CustomElement = SortableElement(CustomElement);

export default FormElements;
