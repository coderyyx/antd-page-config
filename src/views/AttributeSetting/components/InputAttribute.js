import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { getFormOptions } from '@/util';
import Placeholder from './PlaceholderAttribute';
import CssAndStyle from './CssAndStyleAttribute';


const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const InputAttribute = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelAlign='left'>
      <FormItem label='输入框大小' {...formItemLayout}>
        {getFieldDecorator('size', {})(
          <Select placeholder='请选择' allowClear>
            <Option value='small'>small</Option>
            <Option value='large'>large</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem label='清除内容' {...formItemLayout}>
        {getFieldDecorator('allowClear', {})(
          <Radio.Group>
            <Radio value>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem label='前缀图标' {...formItemLayout}>
        {getFieldDecorator('prefix', {})(
          <Input placeholder='请输入' />,
        )}
      </FormItem>
      <FormItem label='后置图标' {...formItemLayout}>
        {getFieldDecorator('suffix', {})(
          <Input placeholder='请输入' />,
        )}
      </FormItem>
      <FormItem label='前置标签' {...formItemLayout}>
        {getFieldDecorator('addonAfter', {})(
          <Input placeholder='请输入' />,
        )}
      </FormItem>
      <FormItem label='后置标签' {...formItemLayout}>
        {getFieldDecorator('addonBefore', {})(
          <Input placeholder='请输入' />,
        )}
      </FormItem>
      <Placeholder
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
  size: undefined,
  allowClear: false,
  prefix: '',
  suffix: '',
  addonAfter: '',
  addonBefore: '',
  placeholder: '',
  className: '',
  style: '',
};

export default Form.create(getFormOptions(formFieldsMap))(InputAttribute);
