import React from 'react';
import { Form, Radio, Select } from 'antd';
import Placeholder from './PlaceholderAttribute';
import CssAndStyle from './CssAndStyleAttribute';
import { getFormOptions } from '../../../util';

const { Option } = Select;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const DatePickerAttribute = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelAlign='left'>
      <FormItem label='清除内容' {...formItemLayout}>
        {getFieldDecorator('allowClear', {})(
          <Radio.Group>
            <Radio value>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>,
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
  allowClear: false,
  size: undefined,
  placeholder: '',
  className: '',
  style: '',
};

export default Form.create(getFormOptions(formFieldsMap))(DatePickerAttribute);
