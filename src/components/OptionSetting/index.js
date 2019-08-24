import React, { useState, useEffect } from 'react';
import { Table, Divider, Radio, Empty, Button } from 'antd';
import shortid from 'shortid';
import RenderEmptyComp from '@/components/RenderEmptyComp';
import OptionsModal from './modal';

const OptionSetting = React.forwardRef((props, ref) => {
  const { value = [], onChange } = props;
  const [mode, setMode] = useState('default');
  const [dataSource, setDataSource] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [formValue, setFormValue] = useState({});
  useEffect(() => {
    setDataSource([...value]);
  }, [value]);

  const selectMode = (e) => {
    setMode(e.target.value);
  };
  const displayModal = (typeVal = '', index = -1, val = {}) => {
    setVisible(!visible);
    setType(typeVal);
    setCurrentIndex(index);
    setFormValue(val);
  };
  const createAndEdit = (val) => {
    if (type === 'create') {
      dataSource.splice(currentIndex + 1, 0, { ...val, $_id: shortid() });
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
  const columns = [{
    dataIndex: 'value',
    title: '属性值',
  }, {
    dataIndex: 'title',
    title: '名称',
  }, {
    dataIndex: 'operation',
    title: '操作',
    width: 135,
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
  const EmptyComp = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span>暂无数据</span>}
    >
      <Button type='primary' onClick={displayModal.bind(this, 'create', -1)}>请创建</Button>
    </Empty>
  );

  return (
    <div ref={ref}>
      <div>
        <Radio.Group value={mode} onChange={selectMode}>
          <Radio value='default'>默认</Radio>
          <Radio value='custom'>自定义</Radio>
        </Radio.Group>
      </div>
      {
        mode === 'default' ? (
          <RenderEmptyComp customizeRenderEmpty={EmptyComp}>
            <Table
              rowKey='$_id'
              columns={columns}
              dataSource={dataSource || []}
              pagination={false}
              size='small'
            />
          </RenderEmptyComp>
        ) : (
          <>
            <div />
          </>
        )
      }
      <OptionsModal
        formValue={formValue}
        visible={visible}
        type={type}
        onOk={createAndEdit}
        onDisplay={displayModal}
      />
    </div>
  );
});

export default OptionSetting;
