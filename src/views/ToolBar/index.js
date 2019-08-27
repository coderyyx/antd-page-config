import React, { useState } from 'react';
import { Tooltip, Icon, Button, Drawer } from 'antd';
import './index.less';

const ToolBar = (props) => {
  const { pageSize, onDelete } = props;
  const [codePreviewVisible, setCodePreviewVisible] = useState(false);
  return (
    <>
      <div className='page-edit-title'>
        antd page config
      </div>
      <div className='page-size'>
        <span className='page-size-title'>
          宽:
        </span>
        <span className='page-size-value'>
          {pageSize.width}
        </span>
        <span className='page-size-title'>
          高:
        </span>
        <span className='page-size-value'>
          {pageSize.height}
        </span>
      </div>
      <Tooltip title='删除'>
        <div className='close-element' onClick={onDelete}>
          <Icon type='delete' />
        </div>
      </Tooltip>
      <Tooltip title='代码预览'>
        <div className='code-expand-icon' onClick={() => setCodePreviewVisible(true)}>
          <Icon type='snippets' />
        </div>
      </Tooltip>
      <div className='apc-save-page'>
        <Button icon='save' type='primary'>保存</Button>
      </div>
      <Drawer
        title='代码预览'
        placement='right'
        visible={codePreviewVisible}
        onClose={() => setCodePreviewVisible(false)}
      >
        <pre>
          {'<div>\n</div>'}
        </pre>
      </Drawer>
    </>
  );
};

export default ToolBar;
