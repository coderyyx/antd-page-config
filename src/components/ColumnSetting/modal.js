import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ColumnsModal = (props) => {
  const { visible, type, onDisplay, onOk, formValue, form } = props;
  const { getFieldDecorator } = form;

  const onSumbit = () => {
    form.validateFields((err, value) => {
      if (err) return;
      onOk(value);
      onDisplay();
    });
  };
  const afterClose = () => {
    form.resetFields();
  };

  return (
    <Modal
      title={type === 'create' ? '创建列' : '编辑列'}
      visible={visible}
      onOk={onSumbit}
      onCancel={onDisplay}
      afterClose={afterClose}
      maskClosable={false}
    >
      <Form className='container'>
        <FormItem label='索引' {...formItemLayout}>
          {getFieldDecorator('dataIndex', {
            initialValue: formValue.dataIndex || undefined,
            rules: [{ required: true, message: '请输入索引' }],
          })(
            <Input placeholder='请输入' />,
          )}
        </FormItem>
        <FormItem label='名称' {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: formValue.title || undefined,
            rules: [{ required: true, message: '请输入名称' }],
          })(
            <Input placeholder='请输入' />,
          )}
        </FormItem>
        <FormItem label='宽度' {...formItemLayout}>
          {getFieldDecorator('width', {
            initialValue: formValue.width || undefined,
          })(
            <InputNumber placeholder='请输入' style={{ width: '100%' }} />,
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(ColumnsModal);
