// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, InputNumber, Tooltip, Icon } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends Component {
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

    const initialEmail = this.getInitialValue('email');
    const initialName = this.getInitialValue('name');
    const initialDaysInAdvance = this.getInitialValue('daysInAdvance') || 30;

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
          <Button type="primary" htmlType="submit" size="large">Next</Button>
        </FormItem>
      </Form>
    );
  }
}

RegistrationForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  formState: PropTypes.shape(),
};

RegistrationForm.defaultProps = {
  formState: undefined,
};

export default Form.create()(RegistrationForm);

