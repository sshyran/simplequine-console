// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, TimePicker, Checkbox } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

function range (start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

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
    const trainer = this.props.trainer;

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
            initialValue: trainer.firstName,
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
            initialValue: trainer.lastName,
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
            initialValue: trainer.email,
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
            initialValue: trainer.phoneNumber,
          })(
            <Input type="tel" />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('workingDays', {
            valuePropName: 'checked',
            rules: [{ type: 'array', required: true, message: 'Please select working days!' }],
            initialValue: trainer.schedules[0].workingDays,
          })(
            <CheckboxGroup options={days} defaultValue={trainer.schedules[0].workingDays} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Start"
        >
          {getFieldDecorator('startsAt', {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            initialValue: moment().startOf('day').add(trainer.schedules[0].startsAt, 'minutes'),
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
            initialValue: moment().startOf('day').add(trainer.schedules[0].endsAt, 'minutes'),
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

TrainerForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  trainer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default Form.create()(TrainerForm);

