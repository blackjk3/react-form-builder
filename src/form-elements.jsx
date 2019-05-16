import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import { format, parse } from 'date-fns';
// import moment from 'moment';
import SignaturePad from 'react-signature-canvas';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import ReactDatePicker from 'react-datepicker';
import StarRating from './star-rating';
import HeaderBar from './header-bar';

const FormElements = {};
const myxss = new xss.FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol: ['style'],
    ul: ['style'],
    li: [],
    p: ['style'],
    sub: [],
    sup: [],
    div: ['style'],
    em: [],
    strong: [],
    span: ['style'],
  },
});

const ComponentLabel = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);

  return (
    <label className={props.className || ''}>
      <span dangerouslySetInnerHTML={{ __html: myxss.process(props.data.label) }}/>
      {hasRequiredLabel && <span className="label-required label label-danger">Required</span>}
    </label>
  );
};

const ComponentHeader = (props) => {
  if (props.mutable) {
    return null;
  }
  return (
    <div>
    { props.data.pageBreakBefore &&
      <div className="preview-page-break">Page Break</div>
    }
    <HeaderBar parent={props.parent} editModeOn={props.editModeOn} data={props.data} onDestroy={props._onDestroy} onEdit={props.onEdit} static={props.data.static} required={props.data.required} />
  </div>
  );
};

class Header extends React.Component {
  render() {
    // const headerClasses = `dynamic-input ${this.props.data.element}-input`;
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <h3 className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class Paragraph extends React.Component {
  render() {
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <p className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class Label extends React.Component {
  render() {
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <label className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class LineBreak extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <hr />
      </div>
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = 'text';
    props.className = 'form-control';
    props.name = this.props.data.field_name;
    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <input {...props} />
        </div>
      </div>
    );
  }
}

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = 'number';
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <input {...props} />
        </div>
      </div>
    );
  }
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <textarea {...props} />
        </div>
      </div>
    );
  }
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();

    this.updateFormat(props);
    this.state = this.updateDateTime(props, this.formatMask);
  }

  formatMask = '';

  handleChange = (dt) => {
    let placeholder;
    if (dt && dt.target) {
      placeholder = (dt && dt.target && dt.target.value === '') ? this.formatMask.toLowerCase() : '';
      const formattedDate = (dt.target.value) ? format(dt.target.value, this.formatMask) : '';
      this.setState({
        value: formattedDate,
        internalValue: formattedDate,
        placeholder,
      });
    } else {
      this.setState({
        value: (dt) ? format(dt, this.formatMask) : '',
        internalValue: dt,
        placeholder,
      });
    }
  };

  updateFormat(props) {
    const { showTimeSelect, showTimeSelectOnly } = props.data;
    const dateFormat = showTimeSelect && showTimeSelectOnly ? '' : props.data.dateFormat;
    const timeFormat = showTimeSelect ? props.data.timeFormat : '';
    const formatMask = (`${dateFormat} ${timeFormat}`).trim();
    const updated = formatMask !== this.formatMask;
    this.formatMask = formatMask;
    return updated;
  }

  updateDateTime(props, formatMask) {
    let value;
    let internalValue;
    const { defaultToday } = props.data;
    if (defaultToday && (props.defaultValue === '' || props.defaultValue === undefined)) {
      value = format(new Date(), formatMask);
      internalValue = new Date();
    } else {
      value = props.defaultValue;

      if (value === '' || value === undefined) {
        internalValue = undefined;
      } else {
        internalValue = parse(value, this.formatMask, new Date());
      }
    }
    return {
      value,
      internalValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday,
    };
  }

  componentWillReceiveProps(props) {
    const formatUpdated = this.updateFormat(props);
    if ((props.data.defaultToday !== !this.state.defaultToday) || formatUpdated) {
      const state = this.updateDateTime(props, this.formatMask);
      this.setState(state);
    }
  }

  render() {
    const { showTimeSelect, showTimeSelectOnly } = this.props.data;
    const props = {};
    props.type = 'date';
    props.className = 'form-control';
    props.name = this.props.data.field_name;
    const readOnly = this.props.data.readOnly || this.props.read_only;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const placeholderText = this.formatMask.toLowerCase();

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div>
            { readOnly &&
              <input type="text"
                     name={props.name}
                     ref={props.ref}
                     readOnly={readOnly}
                     placeholder={this.state.placeholder}
                     value={this.state.value}
                     className="form-control" />
            }
            { iOS && !readOnly &&
              <input type="date"
                     name={props.name}
                     ref={props.ref}
                     onChange={this.handleChange}
                     dateFormat="MM/DD/YYYY"
                     placeholder={this.state.placeholder}
                     value={this.state.value}
                     className = "form-control" />
            }
            { !iOS && !readOnly &&
              <ReactDatePicker
                name={props.name}
                ref={props.ref}
                onChange={this.handleChange}
                selected={this.state.internalValue}
                todayButton={'Today'}
                className = "form-control"
                isClearable={true}
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={showTimeSelectOnly}
                dateFormat={this.formatMask}
                placeholderText={placeholderText} />
            }
          </div>
        </div>
      </div>
    );
  }
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <select {...props}>
            {this.props.data.options.map((option) => {
              const this_key = `preview_${option.key}`;
              return <option value={option.value} key={this_key}>{option.text}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
}

class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue,
    };
    this.inputField = React.createRef();
    this.canvas = React.createRef();
  }

  clear = () => {
    if (this.state.defaultValue) {
      this.setState({ defaultValue: '' });
    } else if (this.canvas.current) {
      this.canvas.current.clear();
    }
  }

  render() {
    const { defaultValue } = this.state;
    let canClear = !!defaultValue;
    const props = {};
    props.type = 'hidden';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = defaultValue;
      props.ref = this.inputField;
    }
    const pad_props = {};
    // umd requires canvasProps={{ width: 400, height: 150 }}
    if (this.props.mutable) {
      pad_props.defaultValue = defaultValue;
      pad_props.ref = this.canvas;
      canClear = !this.props.read_only;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    let sourceDataURL;
    if (defaultValue && defaultValue.length > 0) {
      sourceDataURL = `data:image/png;base64,${defaultValue}`;
    }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.read_only === true || !!sourceDataURL
            ? (<img src={sourceDataURL} />)
            : (<SignaturePad {...pad_props} />)
          }
          { canClear && (
            <i className="fa fa-times clear-signature" onClick={this.clear} title="Clear Signature"></i>) }
          <input {...props} />
        </div>
      </div>
    );
  }
}

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    const { defaultValue, data } = props;
    this.state = { value: this.getDefaultValue(defaultValue, data.options) };
  }

  getDefaultValue(defaultValue, options) {
    if (defaultValue) {
      if (typeof defaultValue === 'string') {
        const vals = defaultValue.split(',').map(x => x.trim());
        return options.filter(x => vals.indexOf(x.value) > -1);
      }
      return options.filter(x => defaultValue.indexOf(x.value) > -1);
    }
    return [];
  }

  // state = { value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(',') : [] };

  handleChange = (e) => {
    this.setState({ value: e });
  };

  render() {
    const options = this.props.data.options.map(option => {
      option.label = option.text;
      return option;
    });
    const props = {};
    props.isMulti = true;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;

    props.options = options;
    if (!this.props.mutable) { props.value = options[0].text; } // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.isDisabled = this.props.read_only;
      props.value = this.state.value;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <Select {...props} />
        </div>
      </div>
    );
  }
}

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = 'checkbox-label';
    if (this.props.data.inline) { classNames += ' option-inline'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel className="form-label" {...this.props} />
          {this.props.data.options.map((option) => {
            const this_key = `preview_${option.key}`;
            const props = {};
            props.name = `option_${option.key}`;

            props.type = 'checkbox';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.key) > -1;
            }
            if (this.props.read_only) {
              props.disabled = 'disabled';
            }
            return (
              <label className={classNames} key={this_key}>
                <input ref={c => {
                  if (c && self.props.mutable) {
                    self.options[`child_ref_${option.key}`] = c;
                  }
                } } {...props} /> {option.text}
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}

class RadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = 'radio-label';
    if (this.props.data.inline) { classNames += ' option-inline'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel className="form-label" {...this.props} />
          {this.props.data.options.map((option) => {
            const this_key = `preview_${option.key}`;
            const props = {};
            props.name = self.props.data.field_name;

            props.type = 'radio';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined &&
                (self.props.defaultValue.indexOf(option.key) > -1 || self.props.defaultValue.indexOf(option.value) > -1));
            }
            if (this.props.read_only) {
              props.disabled = 'disabled';
            }

            return (
              <label className={classNames} key={this_key}>
                <input ref={c => {
                  if (c && self.props.mutable) {
                    self.options[`child_ref_${option.key}`] = c;
                  }
                } } {...props} /> {option.text}
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}

class Image extends React.Component {
  render() {
    const style = (this.props.data.center) ? { textAlign: 'center' } : null;

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses} style={style}>
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} required={this.props.data.required} />
        }
        { this.props.data.src &&
          <img src={this.props.data.src} width={this.props.data.width} height={this.props.data.height} />
        }
        { !this.props.data.src &&
          <div className="no-image">No Image</div>
        }
      </div>
    );
  }
}

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.name = this.props.data.field_name;
    props.ratingAmount = 5;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.disabled = this.props.read_only;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <StarRating {...props} />
        </div>
      </div>
    );
  }
}

class HyperLink extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <a target="_blank" href={this.props.data.href}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}

class Download extends React.Component {
  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <a href={`${this.props.download_path}?id=${this.props.data.file_path}`}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = { img: null };
  }

  displayImage = (e) => {
    const self = this;
    const target = e.target;
    let file; let
      reader;

    if (target.files && target.files.length) {
      file = target.files[0];
      // eslint-disable-next-line no-undef
      reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        self.setState({
          img: reader.result,
        });
      };
    }
  };

  clearImage = () => {
    this.setState({
      img: null,
    });
  };

  render() {
    let baseClasses = 'SortableItem rfb-item';
    const name = this.props.data.field_name;
    const fileInputStyle = this.state.img ? { display: 'none' } : null;
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }
    let sourceDataURL;
    if (this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0) {
      if (this.props.defaultValue.indexOf(name > -1)) {
        sourceDataURL = this.props.defaultValue;
      } else {
        sourceDataURL = `data:image/png;base64,${this.props.defaultValue}`;
      }
    }
    console.log('sourceDataURL', sourceDataURL);
    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0
            ? (<div><img src={sourceDataURL} /></div>)
            : (<div className="image-upload-container">

            <div style={fileInputStyle}>
              <input name={name} type="file" accept="image/*" capture="camera" className="image-upload" onChange={this.displayImage} />
              <div className="image-upload-control">
                <div className="btn btn-default btn-school"><i className="fa fa-camera"></i> Upload Photo</div>
                <p>Select an image from your computer or device.</p>
              </div>
            </div>

            { this.state.img &&
              <div>
                <img src={ this.state.img } height="100" className="image-upload-preview" /><br />
                <div className="btn btn-school btn-image-clear" onClick={this.clearImage}>
                  <i className="fa fa-times"></i> Clear Photo
                </div>
              </div>
            }
          </div>)
        }
        </div>
      </div>
    );
  }
}

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.state = {
      value: props.defaultValue !== undefined ? parseInt(props.defaultValue, 10) : parseInt(props.data.default_value, 10),
    };
  }

  changeValue = (e) => {
    const { target } = e;
    this.setState({
      value: target.value,
    });
  }

  render() {
    const props = {};
    const name = this.props.data.field_name;

    props.type = 'range';
    props.list = `tickmarks_${name}`;
    props.min = this.props.data.min_value;
    props.max = this.props.data.max_value;
    props.step = this.props.data.step;

    props.value = this.state.value;
    props.change = this.changeValue;

    if (this.props.mutable) {
      props.ref = this.inputField;
    }

    const datalist = [];
    for (let i = parseInt(props.min_value, 10); i <= parseInt(props.max_value, 10); i += parseInt(props.step, 10)) {
      datalist.push(i);
    }

    const oneBig = 100 / (datalist.length - 1);

    const _datalist = datalist.map((d, idx) => <option key={`${props.list}_${idx}`}>{d}</option>);

    const visible_marks = datalist.map((d, idx) => {
      const option_props = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length - 1) { w = oneBig / 2; }
      option_props.key = `${props.list}_label_${idx}`;
      option_props.style = { width: `${w}%` };
      if (idx === datalist.length - 1) { option_props.style = { width: `${w}%`, textAlign: 'right' }; }
      return <label {...option_props}>{d}</label>;
    });

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div className="range">
            <div className="clearfix">
              <span className="pull-left">{this.props.data.min_label}</span>
              <span className="pull-right">{this.props.data.max_label}</span>
            </div>
            <ReactBootstrapSlider {...props} />
          </div>
          <div className="visible_marks">
            {visible_marks}
          </div>
          <input name={name} value={this.state.value} type="hidden" />
          <datalist id={props.list}>
            {_datalist}
          </datalist>
        </div>
      </div>
    );
  }
}

FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.Label = Label;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.Range = Range;

export default FormElements;
