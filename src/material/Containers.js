import React from 'react';
import { Form, Row } from 'antd';

const Containers = {
  Form: {
    en: 'Form',
    cn: '表单容器',
    origin: <div />,
    elementClassName: 'form-container-dnd',
  },
  FormItem: {
    en: 'FormItem',
    cn: '表单项容器',
    origin: <div />,
    elementClassName: 'formItem-container-dnd',
  },
  Grid: {
    en: 'Grid',
    cn: '栅格容器',
    origin: <div />,
    elementClassName: 'row-container-dnd',
  },
};

const RealContainers = {
  Form: {
    en: 'Form',
    cn: '表单容器',
    origin: <Form />,
    style: {
      width: '100%',
      height: '100%',
    },
  },
  FormItem: {
    en: 'FormItem',
    cn: '表单项容器',
    origin: <div />,
  },
  Grid: {
    en: 'Grid',
    cn: '栅格容器',
    origin: <Row />,
  },
};

export {
  Containers,
  RealContainers,
};
