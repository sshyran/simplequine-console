/* 3rd party modules */
import { Form, Input, Button, TimePicker, Checkbox } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { range } from 'ramda';
import React, { Component } from 'react';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

function disabledMinutes (h) {
  const disabledMidnight = [];

  if (h === 0) { disabledMidnight.push(0); }

  return [].concat([], range(1, 15), range(16, 30), range(31, 45), range(46, 60), disabledMidnight);
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
    const initialValues = this.props.trainer;

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

    return (
      <Form onSubmit={this.handleSubmit} layout={'vertical'}>
        <FormItem
          {...formItemLayout}
          label="First name"
          hasFeedback
        >
          {getFieldDecorator('firstName', {
            rules: [{
              required: true,
              message: 'Please input first name!',
              whitespace: true,
            }, {
              max: 100, message: 'Input is too long!',
            }],
            initialValue: initialValues.firstName,
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
            rules: [{
              required: true,
              message: 'Please input last name!',
              whitespace: true,
            }, {
              max: 100, message: 'Input is too long!',
            }],
            initialValue: initialValues.lastName,
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
            validateTrigger: ['onBlur'],
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input E-mail!',
            }, {
              max: 254, message: 'Your email address is too long!',
            }],
            initialValue: initialValues.email,
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
            rules: [{
              required: true, message: 'Please input phone number!', whitespace: true,
            }, {
              max: 40, message: 'Phone number is too long!',
            }],
            initialValue: initialValues.phoneNumber,
          })(
            <Input type="tel" />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('workingDays', {
            valuePropName: 'checked',
            rules: [{ type: 'array', required: true, message: 'Please select working days!' }],
            initialValue: initialValues.schedules[0].workingDays,
          })(
            <CheckboxGroup options={days} defaultValue={initialValues.schedules[0].workingDays} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Start"
        >
          {getFieldDecorator('startsAt', {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            initialValue: moment().startOf('day').add(initialValues.schedules[0].startsAt, 'minutes'),
          })(
            <TimePicker
              format="HH:mm"
              defaultOpenValue={moment().startOf('day').add(8, 'hours')}
              disabledMinutes={disabledMinutes}
              hideDisabledOptions
            />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="End"
        >
          {getFieldDecorator('endsAt', {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            initialValue: moment().startOf('day').add(initialValues.schedules[0].endsAt, 'minutes'),
          })(
            <TimePicker
              format="HH:mm"
              defaultOpenValue={moment().startOf('day').add(8, 'hours').add(15, 'minutes')}
              disabledMinutes={disabledMinutes}
              hideDisabledOptions
            />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

TrainerForm.defaultProps = {
  trainer: {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    schedules: [
      {
        endsAt: 960,
        startsAt: 480,
        workingDays: [1, 2, 3, 4, 5],
      },
    ],
  },
};

TrainerForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  trainer: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.shape({
      endsAt: PropTypes.number.isRequired,
      startsAt: PropTypes.number.isRequired,
      workingDays: PropTypes.arrayOf(PropTypes.number).isRequired,
    })).isRequired,
  }).isRequired,
};

export default Form.create()(TrainerForm);

