// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, InputNumber } from 'antd';

const FormItem = Form.Item;

class ServiceForm extends Component {
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
    const service = this.props.service;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Name"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input name of a service!', whitespace: true }],
            initialValue: service.name,
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Duration in minutes"
          hasFeedback
        >
          {getFieldDecorator('duration', {
            rules: [{
              type: 'integer', message: 'The input is not valid number!',
            }, {
              required: true, message: 'Please input duration!',
            }],
            initialValue: service.duration,
          })(
            <InputNumber />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Max participants"
          hasFeedback
        >
          {getFieldDecorator('maxParticipants', {
            rules: [{
              type: 'integer', message: 'The input is not valid number!',
            }, {
              required: true, message: 'Please input max number of participants!',
            }],
            initialValue: service.maxParticipants,
          })(
            <InputNumber min={1} max={100} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="price"
          hasFeedback
        >
          {getFieldDecorator('price', {
            rules: [{
              type: 'integer', message: 'The input is not valid number!',
            }, {
              required: true, message: 'Please input price!',
            }],
            initialValue: service.price,
          })(
            <InputNumber />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Currency"
          hasFeedback
        >
          {getFieldDecorator('currency', {
            rules: [{ required: true, message: 'Please input currency!', whitespace: true }],
            initialValue: service.currency,
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="description"
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{ required: false, message: 'Please input description!', whitespace: true }],
            initialValue: service.description,
          })(
            <Input type="textarea" rows={4} />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

ServiceForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  service: PropTypes.shape().isRequired,
};

export default Form.create()(ServiceForm);
