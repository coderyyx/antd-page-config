import React, { useState, useEffect } from 'react';
import { Table, Divider, Button, Empty } from 'antd';
import { AntdPageConfigContext } from '@/core';
import RenderEmptyComp from '@/components/RenderEmptyComp';
import ColumnsModal from './modal';

const ColumnSetting = React.forwardRef((props, ref) => {
  const { value = [], onChange } = props;
  const [dataSource, setDataSource] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [formValue, setFormValue] = useState({});
  useEffect(() => {
    setDataSource(value);
  }, [value]);

  const displayModal = (typeVal = '', index = -1, val = {}) => {
    setVisible(!visible);
    setType(typeVal);
    setCurrentIndex(index);
    setFormValue(val);
  };
  const createAndEdit = (val) => {
    if (type === 'create') {
      dataSource.splice(currentIndex + 1, 0, val);
    } else {
      dataSource[currentIndex] = val;
    }
    setDataSource([...dataSource]);
    if (onChange) {
      onChange([...dataSource]);
    }
  };
  const deleteRow = (index) => {
    dataSource.splice(index, 1);
    setDataSource([...dataSource]);
    if (onChange) {
      onChange([...dataSource]);
    }
  };
  const EmptyComp = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span>暂无数据</span>}
    >
      <Button type='primary' onClick={displayModal.bind(this, 'create', -1)}>请创建</Button>
    </Empty>
  );
  const columns = [{
    dataIndex: 'dataIndex',
    title: '索引',
  }, {
    dataIndex: 'title',
    title: '名称',
  }, {
    dataIndex: 'operation',
    title: '操作',
    width: 140,
    render: (_, record, index) => (
      <>
        <a onClick={displayModal.bind(this, 'edit', index, record)}>编辑</a>
        <Divider type='vertical' />
        <a onClick={displayModal.bind(this, 'create', index)}>添加</a>
        <Divider type='vertical' />
        <a onClick={deleteRow.bind(this, index)}>删除</a>
      </>
    ),
  }];

  return (
    <div ref={ref}>
      <AntdPageConfigContext.Consumer>
        {
          (contextValue) => (
            <>
              <RenderEmptyComp customizeRenderEmpty={EmptyComp}>
                <Table
                  rowKey='dataIndex'
                  columns={columns}
                  dataSource={dataSource || []}
                  pagination={false}
                  size='small'
                />
              </RenderEmptyComp>
              <ColumnsModal
                formValue={formValue}
                visible={visible}
                type={type}
                onOk={createAndEdit}
                onDisplay={displayModal}
                {...contextValue}
              />
            </>
          )
        }
      </AntdPageConfigContext.Consumer>
    </div>
  );
});

export default ColumnSetting;
