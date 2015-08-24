/**
  * <FormValidator />
  */

import React from 'react';

export default class FormValidator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: []
    }
  }

  componentWillMount() {
    this.subscription = this.props.emitter.addListener('formValidation', errors => {
      this.setState({errors: errors});
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissModal(e) {
    e.preventDefault();
    this.setState({errors: []});
  }

  render() {
    let errors = this.state.errors.map((error,index) => {
      return <li key={'error_'+index}>{error}</li>
    })

    return (
      <div>
        { this.state.errors.length > 0 &&
          <div className="alert alert-danger validation-error">
            <div className="clearfix">
              <i className="fa fa-exclamation-triangle pull-left"></i>
              <ul className="pull-left">
                {errors}
              </ul>
            </div>
            <div className="clearfix">
              <a className="pull-right btn btn-default btn-sm btn-danger" onClick={this.dismissModal.bind(this)}>Dismiss</a>
            </div>
          </div>
        }
      </div>
    )
  }
}