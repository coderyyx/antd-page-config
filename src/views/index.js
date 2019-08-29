import React from 'react';
import { Tabs } from 'antd';
import { conversion, AntdPageConfigContext } from '@/core';
import Configurable from './Configurable';
import Material from './Material';
import AttributeSetting from './AttributeSetting';
import ToolBar from './ToolBar';
import './index.less';

const { TabPane } = Tabs;

export default class AntdPageConfig extends React.Component {
  constructor() {
    super();
    this.state = {
      activeKey: 'material',
      currentDragMaterial: {},
      currentElement: {},
      willDeleteElementId: '',
      pageSize: {},
    };
    this.configurableRef = React.createRef();
  }

  setActivekey = (value) => {
    this.setState({
      activeKey: value,
    });
  }

  setCurrentDragMaterial = (value) => [
    this.setState({
      currentDragMaterial: value,
    }),
  ]

  selectCurrentElement = (value) => {
    this.setState({
      currentElement: value,
      activeKey: 'attribute',
    });
  }

  changeCurrentElement = (value) => {
    this.setState({
      currentElement: value,
    });
  }

  changePageSize = (value) => {
    this.setState({
      pageSize: value,
    });
  }

  deleteCurrentElement = () => {
    const { id } = this.state.currentElement;
    if (id) {
      this.setState({
        willDeleteElementId: id,
        currentElement: {},
        activeKey: 'material',
      });
    }
  }

  saveAllElements = () => {
    const { elements } = this.configurableRef.current.state;
    if (elements.length) {
      conversion(elements);
    }
  }

  render() {
    const { activeKey, currentDragMaterial, currentElement, willDeleteElementId, pageSize } = this.state;
    const ContextValue = {
      antdTableColumnMode: 'input',
      antdTableColumnOptions: [],
      ...this.props,
    };
    return (
      <AntdPageConfigContext.Provider value={ContextValue}>
        <section className='apc-layout'>
          <aside className='apc-slider'>
            <Tabs type='card' activeKey={activeKey} onChange={this.setActivekey}>
              <TabPane tab='物料库' key='material'>
                <Material onReceiveDragMaterial={this.setCurrentDragMaterial} />
              </TabPane>
              <TabPane tab='属性设置' key='attribute'>
                <AttributeSetting
                  currentElement={currentElement}
                  onChange={this.changeCurrentElement}
                />
              </TabPane>
            </Tabs>
          </aside>
          <section className='apc-layout-content'>
            <header className='apc-layout-header'>
              <ToolBar
                pageSize={pageSize}
                onDelete={this.deleteCurrentElement}
                onSave={this.saveAllElements}
              />
            </header>
            <main className='apc-content'>
              <Configurable
                ref={this.configurableRef}
                currentDragMaterial={currentDragMaterial}
                currentElement={currentElement}
                willDeleteElementId={willDeleteElementId}
                onSelect={this.selectCurrentElement}
                onDelete={this.deleteCurrentElement}
                onChangePageSize={this.changePageSize}
              />
            </main>
          </section>
        </section>
      </AntdPageConfigContext.Provider>
    );
  }
}
