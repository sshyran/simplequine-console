/* 3rd party modules */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, InputNumber, Tooltip, Icon, Select, Alert } from 'antd';

import { currencyCodes } from '../../../shared/constants/index';

const FormItem = Form.Item;
const Option = Select.Option;

class ServiceForm extends Component {
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

    const initialName = this.getInitialValue('name');
    const initialDuration = this.getInitialValue('duration');
    const initialMaxParticipants = this.getInitialValue('maxParticipants');
    const initialPrice = this.getInitialValue('price');
    const initialCurrency = this.getInitialValue('currency');
    const initialDescription = this.getInitialValue('description');

    return (
      <Form onSubmit={this.handleSubmit} layout={'vertical'}>
        <Alert
          message="Fill the form in order to add your very first lesson type to Simplequine!"
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />
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
            initialValue: initialName,
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
            initialValue: initialDuration,
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
            initialValue: initialMaxParticipants,
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
            initialValue: initialPrice,
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
            initialValue: initialCurrency,
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
            initialValue: initialDescription,
          })(
            <Input type="textarea" rows={4} />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large" style={{ marginRight: '15px' }}>Next</Button>
          <Button size="large" onClick={this.props.onPreviousClick}>Previous</Button>
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
  onPreviousClick: PropTypes.func.isRequired,
};

export default Form.create()(ServiceForm);

