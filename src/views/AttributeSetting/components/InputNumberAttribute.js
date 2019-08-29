import React from 'react';
import { Form, Select, InputNumber } from 'antd';
import { getFormOptions } from '@/util';
import PlaceholderAttribute from './PlaceholderAttribute';
import CssAndStyle from './CssAndStyleAttribute';


const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const InputNumberAttribute = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelAlign='left'>
      <FormItem label='最大值' {...formItemLayout}>
        {getFieldDecorator('max', {})(
          <InputNumber placeholder='请输入' />,
        )}
      </FormItem>
      <FormItem label='最小值' {...formItemLayout}>
        {getFieldDecorator('min', {})(
          <InputNumber placeholder='请输入' />,
        )}
      </FormItem>
      <FormItem label='输入框大小' {...formItemLayout}>
        {getFieldDecorator('size', {})(
          <Select placeholder='请选择' allowClear>
            <Option value='small'>small</Option>
            <Option value='large'>large</Option>
          </Select>,
        )}
      </FormItem>
      <PlaceholderAttribute
        formItemLayout={formItemLayout}
        getFieldDecorator={getFieldDecorator}
      />
      <CssAndStyle
        formItemLayout={formItemLayout}
        getFieldDecorator={getFieldDecorator}
      />
    </Form>
  );
};

const formFieldsMap = {
  max: undefined,
  min: undefined,
  size: undefined,
  placeholder: '',
  className: '',
  style: '',
};

export default Form.create(getFormOptions(formFieldsMap))(InputNumberAttribute);
