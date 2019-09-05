import React from 'react';
import { Form, InputNumber } from 'antd';
import LayoutSetting from '../../../components/LayoutSetting';
import ColSetting from '../../../components/ColSetting';
import { getFormOptions } from '../../../util';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const GridContainerAttribute = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelAlign='left'>
      <FormItem label='页面布局'>
        {getFieldDecorator('layout')(
          <LayoutSetting />,
        )}
      </FormItem>
      <FormItem label='等分栅格'>
        {getFieldDecorator('divideGrid')(
          <ColSetting />,
        )}
      </FormItem>
      <FormItem label='栅格间距' {...formItemLayout}>
        {getFieldDecorator('gutter')(
          <InputNumber placeholder='请输入' style={{ width: '100%' }} />,
        )}
      </FormItem>
    </Form>
  );
};

const formFieldsMap = {
  layout: {},
  divideGrid: {},
  gutter: undefined,
};

export default Form.create(getFormOptions(formFieldsMap))(GridContainerAttribute);
