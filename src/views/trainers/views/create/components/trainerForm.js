// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, TimePicker, Checkbox } from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

function range (start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledMinutes () {
  return [].concat([], range(1, 15), range(16, 30), range(31, 45), range(46, 60));
}

const days = [
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
  { label: 'Sun', value: 7 },
];

class TrainerForm extends Component {
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
          label="First name"
          hasFeedback
        >
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input first name!', whitespace: true }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Last name"
          hasFeedback
        >
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input last name!', whitespace: true }],
          })(
            <Input />,
          )}
        </FormItem>
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
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone number"
          hasFeedback
        >
          {getFieldDecorator('phoneNumber', {
            rules: [{ required: true, message: 'Please input phone number!', whitespace: true }],
          })(
            <Input type="tel" />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('workingDays', {
            valuePropName: 'checked',
            rules: [{ type: 'array', required: true, message: 'Please select working days!' }],
          })(
            <CheckboxGroup options={days} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Start"
        >
          {getFieldDecorator('startsAt', {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          })(
            <TimePicker format="HH:mm" disabledMinutes={disabledMinutes} hideDisabledOptions />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="End"
        >
          {getFieldDecorator('endsAt', {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          })(
            <TimePicker format="HH:mm" disabledMinutes={disabledMinutes} hideDisabledOptions />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

TrainerForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form.create()(TrainerForm);

