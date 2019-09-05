import React from 'react';
import { Form, Input, Select } from 'antd';
import CssAndStyle from './CssAndStyleAttribute';
import ColumnSetting from '../../../components/ColumnSetting';
import { AntdPageConfigContext } from '../../../core';
import { getFormOptions } from '../../../util';

const FormItem = Form.Item;
const { Option } = Select;

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
      <FormItem label='表格大小' {...formItemLayout}>
        {getFieldDecorator('size', {})(
          <Select placeholder='请选择' allowClear>
            <Option value='small'>small</Option>
            <Option value='middle'>middle</Option>
          </Select>,
        )}
      </FormItem>
      {/* <FormItem label='分页功能' {...formItemLayout}>
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
      </FormItem> */}
      <AntdPageConfigContext.Consumer>
        {
          (contextValue) => (
            <FormItem label='列的设置'>
              {getFieldDecorator('columns')(
                <ColumnSetting {...contextValue} />,
              )}
            </FormItem>
          )
        }
      </AntdPageConfigContext.Consumer>
      <CssAndStyle
        formItemLayout={formItemLayout}
        getFieldDecorator={getFieldDecorator}
      />
    </Form>
  );
};

const formFieldsMap = {
  rowKey: 'id',
  size: undefined,
  columns: [],
  paginationVisible: false,
  rowSelectionVisible: false,
  className: '',
  style: '',
};

const extraValueKeys = ['paginationVisible', 'rowSelectionVisible'];

export default Form.create(getFormOptions(formFieldsMap, extraValueKeys))(TableAttribute);
