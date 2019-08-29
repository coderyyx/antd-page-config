import React from 'react';
import { Form, Input, Select } from 'antd';
import { getFormOptions } from '@/util';
import CssAndStyle from './CssAndStyleAttribute';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const ButtonAttribute = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelAlign='left'>
      <FormItem>
        {getFieldDecorator('children', {})(
          <Input placeholder='请输入' />,
        )}
      </FormItem>
      <FormItem label='按钮类型' {...formItemLayout}>
        {getFieldDecorator('type', {})(
          <Select placeholder='请选择' allowClear>
            <Option value='primary'>primary</Option>
            <Option value='dashed'>dashed</Option>
            <Option value='danger'>danger</Option>
            <Option value='link'>link</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem label='按钮大小' {...formItemLayout}>
        {getFieldDecorator('size', {})(
          <Select placeholder='请选择' allowClear>
            <Option value='small'>small</Option>
            <Option value='large'>large</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem label='按钮形状' {...formItemLayout}>
        {getFieldDecorator('shape', {})(
          <Select placeholder='请选择' allowClear>
            <Option value='circle'>circle</Option>
            <Option value='round'>round</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem label='按钮图标' {...formItemLayout}>
        {getFieldDecorator('icon', {})(
          <Input placeholder='请输入' />,
        )}
      </FormItem>
      <CssAndStyle
        formItemLayout={formItemLayout}
        getFieldDecorator={getFieldDecorator}
      />
    </Form>
  );
};

const formFieldsMap = {
  children: '',
  type: undefined,
  size: undefined,
  shape: undefined,
  icon: '',
  className: '',
  style: '',
};

export default Form.create(getFormOptions(formFieldsMap))(ButtonAttribute);
