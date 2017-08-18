/* 3rd party modules */
import { Form, Input, Button, InputNumber, Tooltip, Icon, Select } from 'antd';
import * as moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getStorageItem } from '../services/localStorage';

const FormItem = Form.Item;
const Option = Select.Option;

class AccountForm extends Component {
  getInitialValue = (key) => {
    const formState = this.props.formState;

    if (formState && formState[key]) {
      return formState[key];
    }

    return undefined;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      } else {
        console.log(err); // eslint-disable-line no-console
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
      },
    };

    const timeZoneNames = moment.tz.names();
    const initialName = this.getInitialValue('name');
    const initialDaysInAdvance = this.getInitialValue('daysInAdvance') || 30;

    let initialEmail;
    let initialTimeZoneName;

    if (this.getInitialValue('email')) {
      initialEmail = this.getInitialValue('email');
    }

    if (getStorageItem('auth0Email') !== 'undefined') {
      initialEmail = getStorageItem('auth0Email');
    }

    if (this.getInitialValue('timeZoneName')) {
      initialTimeZoneName = this.getInitialValue('timeZoneName');
    } else {
      initialTimeZoneName = moment.tz.guess();
    }

    return (
      <Form onSubmit={this.handleSubmit} layout={'vertical'}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            validateTrigger: ['onBlur'],
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }, {
              max: 254, message: 'Your email address is too long!',
            }],
            initialValue: initialEmail,
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Business name&nbsp;
              <Tooltip title="What is the name of your equestrian center? E.g Sun Valley Equestrian Center">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              type: 'string', message: 'The input is not valid!',
            }, {
              required: true, message: 'Please input your business name!',
            }],
            initialValue: initialName,
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Time zone&nbsp;
              <Tooltip title="In which time zone is your center located?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('timeZoneName', {
            rules: [{
              type: 'string', message: 'The input is not valid!',
            }, {
              required: true, message: 'Please specify your time zone!',
            }],
            initialValue: initialTimeZoneName,
          })(
            <Select>
              {
                timeZoneNames.map(timeZoneName => (
                  <Option key={timeZoneName} value={timeZoneName}>{timeZoneName}</Option>
                ))
              }
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              How far in advance clients can book a ride?&nbsp;
              <Tooltip title="How many days in advance can clients book a ride?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('daysInAdvance', {
            rules: [{
              type: 'integer',
              message: 'The input is not valid number!',
              min: 1,
              max: 180,
            }, {
              required: true, message: 'Please input number of days!',
            }],
            initialValue: initialDaysInAdvance,
          })(
            <InputNumber min={1} max={180} />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">{this.props.buttonText}</Button>
        </FormItem>
      </Form>
    );
  }
}

AccountForm.propTypes = {
  buttonText: PropTypes.string,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  formState: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
};

AccountForm.defaultProps = {
  formState: undefined,
  buttonText: 'Submit',
};

export default Form.create()(AccountForm);

