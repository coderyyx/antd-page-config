import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const OptionsModal = (props) => {
  const { visible, type, onDisplay, onOk, formValue, form } = props;
  const { getFieldDecorator } = form;

  const onSumbit = () => {
    form.validateFields((err, value) => {
      if (err) return;
      if (type === 'edit') {
        onOk({ ...value, $_id: formValue.$_id });
      } else {
        onOk(value);
      }
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
        <FormItem label='属性值' {...formItemLayout}>
          {getFieldDecorator('value', {
            initialValue: formValue.value || undefined,
            rules: [{ required: true, message: '请输入属性值' }],
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
      </Form>
    </Modal>
  );
};

export default Form.create()(OptionsModal);
