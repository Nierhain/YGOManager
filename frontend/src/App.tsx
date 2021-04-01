import React, { useState } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Icon from '@mdi/react'
import { mdiArchiveOutline, mdiCards, mdiInboxMultiple, mdiLogout } from '@mdi/js'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <div className="logo">
            
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<Icon path={mdiCards} size="1rem" />}>Card Overview</Menu.Item>
            <Menu.Item key="2" icon={<Icon path={mdiArchiveOutline} size="1rem"/>}>Collection</Menu.Item>
            <Menu.Item key="3" icon={<Icon path={mdiInboxMultiple} size="1rem" />}>Decks</Menu.Item>
            <Menu.Item key="4" icon={<Icon path={mdiLogout} size="1rem" />}>Logout</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <h1>YGOManager</h1>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
