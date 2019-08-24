import React from 'react';
import { ConfigProvider, Empty } from 'antd';

const renderEmpty = () => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
);

export default ({ children, customizeRenderEmpty }) => (
  <ConfigProvider renderEmpty={customizeRenderEmpty || renderEmpty}>
    {children}
  </ConfigProvider>
);
