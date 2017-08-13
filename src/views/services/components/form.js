
/* 3rd party modules */
import { Form, Input, Button, InputNumber, Tooltip, Icon, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* App modules */
import { currencyCodes } from '../../../shared/constants/index';

const FormItem = Form.Item;
const Option = Select.Option;

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
          label={(
            <span>
              Name&nbsp;
              <Tooltip title="What is the name of a lesson that you want to offer? E.g 60min group">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input name of a lesson!', whitespace: true }],
            initialValue: service.name,
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Duration&nbsp;
              <Tooltip title="How many minutes does this lesson take?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('duration', {
            rules: [{
              type: 'integer',
              message: 'The input is not valid number!',
              min: 1,
              max: 1440,
            }, {
              required: true, message: 'Please input duration!',
            }],
            initialValue: service.duration,
          })(
            <InputNumber min={1} max={1440} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Max participants&nbsp;
              <Tooltip title="How many people can take part in it?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('maxParticipants', {
            rules: [{
              type: 'integer',
              message: 'The input is not valid number!',
              min: 1,
              max: 99,
            }, {
              required: true, message: 'Please input max number of participants!',
            }],
            initialValue: service.maxParticipants,
          })(
            <InputNumber min={1} max={99} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Price&nbsp;
              <Tooltip title="How mouch does it cost for a one lesson of this type?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('price', {
            rules: [{
              type: 'integer',
              message: 'The input is not valid number!',
              min: 1,
              max: 1000000,
            }, {
              required: true, message: 'Please input price!',
            }],
            initialValue: service.price,
          })(
            <InputNumber min={1} max={1000000} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Currency&nbsp;
              <Tooltip title="Which currency do you accept?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('currency', {
            rules: [{ required: true, message: 'Please input currency!', whitespace: true }],
            initialValue: service.currency,
          })(
            <Select
              showSearch
              placeholder="Select a currency"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {currencyCodes.map(code => (
                <Option key={code} value={code}>{code}</Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Description&nbsp;
              <Tooltip title="Write a description of a lesson which will be displayed for the clients before they book it.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{
              required: false,
              message: 'Description is too long!',
              whitespace: true,
              max: 500,
            }],
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

ServiceForm.defaultProps = {
  service: {},
};

ServiceForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string,
    duration: PropTypes.number,
    maxParticipants: PropTypes.number,
    currency: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Form.create()(ServiceForm);
