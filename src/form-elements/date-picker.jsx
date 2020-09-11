import React from 'react';
import { format, parse } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();

    const { newFormatMask } = DatePicker.updateFormat(props, null);
    this.state = DatePicker.updateDateTime(props, { newFormatMask }, newFormatMask);
  }

  // formatMask = '';

  handleChange = (dt) => {
    let placeholder;
    const { newFormatMask } = this.state;
    if (dt && dt.target) {
      placeholder = (dt && dt.target && dt.target.value === '') ? newFormatMask.toLowerCase() : '';
      const formattedDate = (dt.target.value) ? format(dt.target.value, newFormatMask) : '';
      this.setState({
        value: formattedDate,
        internalValue: formattedDate,
        placeholder,
      });
    } else {
      this.setState({
        value: (dt) ? format(dt, newFormatMask) : '',
        internalValue: dt,
        placeholder,
      });
    }
  };

  static updateFormat(props, oldFormatMask) {
    const { showTimeSelect, showTimeSelectOnly } = props.data;
    const dateFormat = showTimeSelect && showTimeSelectOnly ? '' : props.data.dateFormat;
    const timeFormat = showTimeSelect ? props.data.timeFormat : '';
    const newFormatMask = (`${dateFormat} ${timeFormat}`).trim();
    const updated = newFormatMask !== oldFormatMask; // this.formatMask;
    // this.formatMask = newFormatMask;
    return { updated, newFormatMask };
  }

  static updateDateTime(props, state, formatMask) {
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
        internalValue = parse(value, state.newFormatMask, new Date());
      }
    }
    return {
      value,
      internalValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday,
      newFormatMask: state.newFormatMask,
    };
  }

  // componentWillReceiveProps(props) {
  //   const formatUpdated = this.updateFormat(props);
  //   if ((props.data.defaultToday !== !this.state.defaultToday) || formatUpdated) {
  //     const state = this.updateDateTime(props, this.formatMask);
  //     this.setState(state);
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    const { updated, newFormatMask } = DatePicker.updateFormat(props, state.newFormatMask);
    if ((props.data.defaultToday !== state.defaultToday) || updated) {
      const newState = DatePicker.updateDateTime(props, state, newFormatMask);
      return newState;
    }
    return null;
  }

  render() {
    const { showTimeSelect, showTimeSelectOnly } = this.props.data;
    const props = {};
    props.type = 'date';
    props.className = 'form-control';
    props.name = this.props.data.field_name;
    const readOnly = this.props.data.readOnly || this.props.read_only;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const placeholderText = this.state.newFormatMask.toLowerCase();

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
                dateFormat={this.state.newFormatMask}
                portalId="root-portal"
                autoComplete="off"
                placeholderText={placeholderText} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DatePicker;
