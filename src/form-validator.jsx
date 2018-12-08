/**
  * <FormValidator />
  */

import React from 'react';
import xss from 'xss';

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

export default class FormValidator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentWillMount() {
    this.subscription = this.props.emitter.addListener('formValidation', (errors) => {
      this.setState({ errors });
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissModal(e) {
    e.preventDefault();
    this.setState({ errors: [] });
  }

  render() {
    const errors = this.state.errors.map((error, index) => <li key={`error_${index}`} dangerouslySetInnerHTML={{ __html: myxss.process(error) }} />);

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
    );
  }
}
