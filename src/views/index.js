import React from 'react';
import { Tabs } from 'antd';
import Configurable from './Configurable';
import Material from './Material';
import AttributeSetting from './AttributeSetting';
import ToolBar from './ToolBar';
import './index.less';

const { TabPane } = Tabs;

export default class AntdPageConfig extends React.Component {
  state = {
    activeKey: 'material',
    currentDragMaterial: {},
    currentElement: {},
    willDeleteElementId: '',
    pageSize: {},
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

  render() {
    const { activeKey, currentDragMaterial, currentElement, willDeleteElementId, pageSize } = this.state;
    return (
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
            />
          </header>
          <main className='apc-content'>
            <Configurable
              currentDragMaterial={currentDragMaterial}
              currentElement={currentElement}
              willDeleteElementId={willDeleteElementId}
              onSelect={this.selectCurrentElement}
              onChangePageSize={this.changePageSize}
            />

          </main>
        </section>
      </section>
    );
  }
}
