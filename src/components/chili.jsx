import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Quill from './quill.jsx'
import FilmList from './filmList.jsx'
import './../App.css';
import React from 'react'
import axios from 'axios'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const loginCss = {
    infologo:{
        width:"150px",
        height:"150px"
    }
}
const container = {
    textAlign: "center", /*让div内部文字居中*/
    backgroundColor: "#fff",
    borderRadius: "20px",
    width: "300px",
    height: "350px",
    margin: "auto",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};
class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {status: 'default'};
    this.showArticle = this.showArticle.bind(this);
    this.showFilmList = this.showFilmList.bind(this);
  }
  showArticle(){
    this.setState({status: 'writeArticle'})
  }
  showFilmList(){
    this.setState({status: 'writeFilmList'})
  }
  render() {
    let showSec = this.state.status
    let coms;
    switch(showSec){
      case 'default':
        coms =  <Content style={{ padding: '0 24px', minHeight: 280 }}>默认内容</Content>
        break;
      case 'writeArticle':
        coms =  <Quill />
        break;
      case 'writeFilmList':
        coms =  <FilmList />
        break;
    }
    return (
      <Layout style={{height:'100%'}}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="0"><a rel="noopener noreferrer" href="/home">
          主页
        </a></Menu.Item>
          <Menu.Item key="1"><a rel="noopener noreferrer" href="/chili">管理后台</a></Menu.Item>
          <Menu.Item key="2">我的组件</Menu.Item>
          <Menu.Item key="3">数据大盘</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>管理后台</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1','sub2','sub3']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
                <Menu.Item key="1">用户列表</Menu.Item>
                <Menu.Item key="2">肖像画像</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="文章管理">
                <Menu.Item key="5" onClick={this.showArticle}>文章列表</Menu.Item>
                <Menu.Item key="6" onClick={this.showArticle}>写文章</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="影片资源">
                <Menu.Item key="9" onClick={this.showFilmList}>影片分类</Menu.Item>
                <Menu.Item key="10">新增影片</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          {coms}
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
  }
    
}
export default Index;