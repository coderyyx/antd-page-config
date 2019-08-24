import React from 'react';
import { Form, Row } from 'antd';

export default {
  Form: {
    en: 'Form',
    cn: '表单容器',
    origin: <div />,
    children: <Form />,
    elementClassName: 'form-container-dnd',
    style: {
      width: 120,
      height: 120,
    },
    originRect: {
      x: 0,
      y: 0,
    },
  },
  FormItem: {
    en: 'FormItem',
    cn: '表单项容器',
    origin: <div />,
    children: <Form.Item></Form.Item>,
    elementClassName: 'formItem-container-dnd',
  },
  Grid: {
    en: 'Grid',
    cn: '栅格容器',
    origin: <div />,
    children: <Row />,
    elementClassName: 'row-container-dnd',
  },
};
