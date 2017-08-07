// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment-timezone';
import { Form, Input, InputNumber, Button, Tooltip, Icon, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class EmailForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      } else {
        console.error(err); // eslint-disable-line no-console
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    const { email, name, daysInAdvance, timeZoneName } = this.props.user;
    const timeZoneNames = moment.tz.names();

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input E-mail!',
            }],
            initialValue: email,
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Business name"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input business name!', whitespace: true }],
            initialValue: name,
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
            initialValue: timeZoneName,
          })(
            <Select>
              {
                timeZoneNames.map(timeZone => (
                  <Option key={timeZone} value={timeZone}>{timeZone}</Option>
                ))
              }
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="How far in advance clients can book a ride? (days)"
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
            initialValue: daysInAdvance,
          })(
            <InputNumber min={1} max={180} />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

EmailForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    daysInAdvance: PropTypes.number.isRequired,
    timeZoneName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Form.create()(EmailForm);

