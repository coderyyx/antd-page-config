import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import AntdPageConfig from './views';
import './index.less';

const App = () => (
  <ConfigProvider locale={zhCN}>
    <AntdPageConfig />
  </ConfigProvider>
);


ReactDOM.render(<App />,
  document.getElementById('app'));
