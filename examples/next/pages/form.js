import React from 'react';
import { ReactFormGenerator } from 'react-form-builder2';
import { get } from '../components/requests';

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    // console.log(`Demobar: `, props);
    this.state = {
      data: props.data,
      answers: props.answers,
      roPreviewVisible: props.roPreviewVisible,
    };
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      roPreviewVisible: false,
    });
  }

  render() {
    const { answers, data } = this.state;

    let roModalClass = 'modal ro-modal';
    if (this.state.roPreviewVisible) {
      roModalClass += ' show d-block';
    }

    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        <h4 className="float-left">Preview</h4>
        <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={this.showRoPreview.bind(this)}>Read Only Form</button>
        { this.state.roPreviewVisible &&
          <div className={roModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <ReactFormGenerator
                    download_path=""
                    back_action="/"
                    back_name="Back"
                    answer_data={answers}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    read_only={true}
                    variables={this.props.variables}
                    hide_actions={true}
                    data={data} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

// eslint-disable-next-line func-names
Demobar.getInitialProps = async function ({ req }) {
  const protocol = req.headers.referer.split('://')[0];
  const hostUrl = `${protocol}://${req.headers.host}`;
  const url = `${hostUrl}/api/formdata`;
  const getUrl = `${hostUrl}/api/form`;
  const answers = await get(getUrl);
  const data = await get(url);
  return {
    data,
    answers,
    roPreviewVisible: true,
  };
};
