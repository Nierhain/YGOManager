import React, { useState } from 'react';
import './App.css';
import {  Layout, Menu, Breadcrumb, Image, Input, Col, Row } from 'antd';
import Dashboard from './pages/Dashboard';
import CardOverview from './pages/CardOverview';
import UserCollection from './pages/UserCollection';
import UserDecks from './pages/UserDecks';
import Icon from '@mdi/react';
import logo from './assets/logo.png';
import { mdiArchiveOutline, mdiCards, mdiHome, mdiInboxMultiple,  mdiLogout } from '@mdi/js';
import { BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;


const queryClient = new QueryClient()

const App = () => {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Router>
      <QueryClientProvider client={queryClient}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} className="shadow">
          <div className="logo">
            <Link to="/">
              <Image src={logo} height="32px" preview={false} />
            </Link>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<Icon path={mdiHome} size="1rem" className="inline-flex"/>}><Link to="/">Dashboard</Link></Menu.Item>
            <Menu.Item key="2" icon={<Icon path={mdiCards} size="1rem" className="inline-flex"/>}><Link to="/cards">Card Overview</Link></Menu.Item>
            <Menu.Item key="3" icon={<Icon path={mdiArchiveOutline} size="1rem" className="inline-flex" />}><Link to="/collection">Collection</Link></Menu.Item>
            <Menu.Item key="4" icon={<Icon path={mdiInboxMultiple} size="1rem" className="inline-flex" />}><Link to="/decks">Decks</Link></Menu.Item>
            <Menu.Item key="5" icon={<Icon path={mdiLogout} size="1rem" className="inline-flex" />}><Link to="/logout">Logout</Link></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>
                <Row align="stretch">
                  <Col span={12} flex="auto" offset="6">
                    <Search
                      placeholder="Search card, passcode, type..."
                      enterButton="Search"
                      size="large"
                      allowClear
                      className="mt-3"
                      />
              </Col>
              <Col span={1} offset="5">
                    
              </Col>
                </Row>
            </Header>
          <Content>
            <Breadcrumb ></Breadcrumb>
            <Switch>
              <Route path="/cards">
                <CardOverview />
                </Route>
                <Route path="/collection">
                <UserCollection />
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>YGOManager &copy;2021 - Created by <a href="https://www.nierhain.de">Nierhain</a></Footer>
        </Layout>
      </Layout>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
