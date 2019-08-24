import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './views';

export default () => (
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
