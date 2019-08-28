import React, { useMemo } from 'react';
import { Collapse } from 'antd';
import shortid from 'shortid';
import { Components, Containers } from '@/core';
import DndMaterial from '@/components/DndMaterial';
import './index.less';

const { Panel } = Collapse;

export default function Material(props) {
  const { onReceiveDragMaterial } = props;
  const defaultActiveKey = ['antdComp', 'containerComp', 'htmlElement'];
  function selectElement(tagName, type, value) {
    onReceiveDragMaterial({
      id: shortid(),
      tagName,
      type,
      layout: value,
    });
  }
  const memoizedComp = useMemo(() => (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      expandIconPosition='right'
      bordered={false}
      className='apc-material'
    >
      <Panel header='容器组件' key='containerComp' style={{ borderRadius: 0 }}>
        {Object.keys(Containers).map((key) => (
          <DndMaterial
            key={key}
            onChange={selectElement.bind(this, key, 'containerComp')}
          >
            <div className='container' title={Containers[key].en}>
              <div className='container_en'>{Containers[key].en}</div>
              <div className='container_cn'>{Containers[key].cn}</div>
            </div>
          </DndMaterial>
        ))}
      </Panel>
      <Panel header='antd组件' key='antdComp' styles={{ borderRadius: 0 }}>
        {Object.keys(Components).map((key) => (
          <DndMaterial
            key={key}
            onChange={selectElement.bind(this, key, 'antdComp')}
          >
            <div className='component' title={Components[key].en}>
              <div className='component_en'>{Components[key].en}</div>
              <div className='component_cn'>{Components[key].cn}</div>
            </div>
          </DndMaterial>
        ))}
      </Panel>
      {/* <Panel header='HTML元素' key='htmlElement' styles={{ borderRadius: 0 }}>
        {Object.keys(HTMLElements).map((key) => (
          <DndMaterial
            key={key}
            onChange={selectElement.bind(this, key, 'htmlElement')}
          >
            <div className='htmlElement' title={HTMLElements[key].en}>{HTMLElements[key].en}</div>
          </DndMaterial>
        ))}
      </Panel>
      <Panel header='自定义组件' key='diyComponent' styles={{ borderRadius: 0 }}>
        自定义组件
      </Panel> */}
    </Collapse>
  ), []);
  return (
    <>
      {memoizedComp}
    </>
  );
}
