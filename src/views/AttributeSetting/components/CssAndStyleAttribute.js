import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
// const { TextArea } = Input

export default ({ formItemLayout, getFieldDecorator }) => (
  <>
    <FormItem label='css类名' {...formItemLayout}>
      {getFieldDecorator('className', {})(
        <Input placeholder='请输入' />,
      )}
    </FormItem>
    {/* <FormItem label='自定义样式'>
      {getFieldDecorator('style', {})(
        <TextArea placeholder='例：&#10;color:red&#10;textAlign:center' rows={4} />
      )}
    </FormItem> */}
  </>
);
