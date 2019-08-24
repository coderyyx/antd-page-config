import React from 'react';
import { Form, Input, Radio } from 'antd';
import ColumnSetting from '@/components/ColumnSetting';
import { getFormOptions } from '@/util';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const TableAttribute = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelAlign='left'>
      <FormItem label='表格主键' {...formItemLayout}>
        {getFieldDecorator('rowKey', {})(
          <Input placeholder='请输入' />,
        )}
      </FormItem>
      <FormItem label='分页功能' {...formItemLayout}>
        {getFieldDecorator('paginationVisible')(
          <Radio.Group>
            <Radio value>开启</Radio>
            <Radio value={false}>关闭</Radio>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem label='选择功能' {...formItemLayout}>
        {getFieldDecorator('rowSelectionVisible')(
          <Radio.Group>
            <Radio value>开启</Radio>
            <Radio value={false}>关闭</Radio>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem label='列的设置'>
        {getFieldDecorator('columns')(
          <ColumnSetting />,
        )}
      </FormItem>
      {

      }
    </Form>
  );
};

const formFieldsMap = {
  rowKey: 'id',
  columns: [],
  paginationVisible: false,
  rowSelectionVisible: false,
};


export default Form.create(getFormOptions(formFieldsMap))(TableAttribute);
