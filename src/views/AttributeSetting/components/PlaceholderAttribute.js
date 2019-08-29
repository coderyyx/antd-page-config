import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

export default ({ formItemLayout, getFieldDecorator }) => (
  <FormItem label='输入框提示文字' {...formItemLayout}>
    {getFieldDecorator('placeholder', {})(
      <Input placeholder='请输入' />,
    )}
  </FormItem>
);
