import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './../App.css';
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
function Index(){
    return (
        <Layout style={{height:'100%'}}>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
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
          </Breadcrumb>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
}
export default Index;