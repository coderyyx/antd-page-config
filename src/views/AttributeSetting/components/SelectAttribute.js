import React from 'react';
import { Form, Select, Radio } from 'antd';
import OptionSetting from '@/components/OptionSetting';
import { getFormOptions } from '@/util';
import Placeholder from './Placeholder';
import CssAndStyle from './CssAndStyle';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const SelectAttribute = ({ form }) => {
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
      <FormItem label='选项的设置'>
        {getFieldDecorator('options', {})(
          <OptionSetting />,
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
  options: [],
  allowClear: false,
  placeholder: '',
  className: '',
  style: '',
};

export default Form.create(getFormOptions(formFieldsMap))(SelectAttribute);
