import React from 'react';
import { Form } from 'antd';
import LayoutSetting from '../../../components/LayoutSetting';
import { getFormOptions } from '../../../util';

const FormItem = Form.Item;

// const formItemLayout = {
//   labelCol: { span: 10 },
//   wrapperCol: { span: 14 }
// };

const FormContainerAttribute = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelAlign='left'>
      <FormItem label='页面布局'>
        {getFieldDecorator('layout')(
          <LayoutSetting />,
        )}
      </FormItem>
    </Form>
  );
};

const formFieldsMap = {
  layout: {},
};

export default Form.create(getFormOptions(formFieldsMap))(FormContainerAttribute);
