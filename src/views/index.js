import React from 'react';
import { Tabs, Tooltip, Drawer, Icon } from 'antd';
import Configurable from './Configurable';
import Material from './Material';
import AttributeSetting from './AttributeSetting';
import './index.less';

const { TabPane } = Tabs;

export default class AntdPageConfig extends React.Component {
  state = {
    activeKey: 'material',
    currentDragMaterial: {},
    currentElement: {},
    willDeleteElementId: '',
    codePreviewVisible: false,
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
      willDeleteElementId: '',
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

  displayCodePreviewModal = () => {
    this.setState({
      codePreviewVisible: !this.state.codePreviewVisible,
    });
  }

  render() {
    const { activeKey, currentDragMaterial, currentElement, willDeleteElementId, codePreviewVisible } = this.state;
    return (
      <section className='apc-layout'>
        <aside className='apc-slider'>
          <Tabs type='card' activeKey={activeKey} onChange={this.setActivekey}>
            <TabPane tab='素材库' key='material'>
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
            <div className='page-edit-title'>
              antd page config
            </div>
            <Tooltip title='删除'>
              <div className='close-element' onClick={this.deleteCurrentElement}>
                <Icon type='delete' />
              </div>
            </Tooltip>
            <Tooltip title='代码预览'>
              <div className='code-expand-icon' onClick={this.displayCodePreviewModal}>
                <Icon type='snippets' />
              </div>
            </Tooltip>
          </header>
          <main className='apc-content'>
            <Configurable
              currentDragMaterial={currentDragMaterial}
              currentElement={currentElement}
              willDeleteElementId={willDeleteElementId}
              onSelect={this.selectCurrentElement}
            />
            <Drawer
              title='代码预览'
              placement='right'
              visible={codePreviewVisible}
              onClose={this.displayCodePreviewModal}
            >
              <pre>
                {'<div>\n</div>'}
              </pre>
            </Drawer>
          </main>
        </section>
      </section>
    );
  }
}
