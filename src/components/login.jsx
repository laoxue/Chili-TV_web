import React from 'react'
import { Button } from 'antd';
import { Input } from 'antd';
import { Route , withRouter} from 'react-router-dom';
// import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.goLogin = this.goLogin.bind(this)
        this.changeUser = this.changeUser.bind(this)
        this.changePwd = this.changePwd.bind(this)
    }
    goLogin() {
        let that = this
        axios({
            method:'POST',
            url: 'http://172.17.123.154:3000/v1/chili/login',
            data:JSON.stringify(
                {
                    username: this.state.user,
                    password: this.state.pwd
                }
            ),
            headers:{
                'Accept': 'text/javascript, application/javascript, application/ x-javascript, */*',
                'Content-Type':'application/json'
            }

        })
        .then((data) => {
            if (data.data.code===0) {
                window.localStorage.token = data.data.data.token
                that.props.history.push('/chili')
            }
        })
    }
    changeUser(event){
        this.setState({user: event.target.value});
    }
    changePwd(event){
        this.setState({pwd: event.target.value});
    }
    render(){
        const loginCss = {
            infologo:{
                width:"150px",
                height:"150px",
                borderRadius: "50%"
            }
        }
        const container = {
            textAlign: "center", /*让div内部文字居中*/
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
        const container_dialog = {
            backgroundColor: "#fff",
            padding:"20px",
            border: "1px solid #ccd0d4",
            boxShadow: "0 1px 3px rgba(0,0,0,.04)"
        }
        const login_logo = {
            backgroundSize: "84px",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            color: "#444",
            height: "84px",
            fontSize: "20px",
            fontWeight: "400",
            lineHeight: "1.3",
            margin: "0 auto 25px",
            padding: "0",
            textDecoration: "none",
            width: "84px",
            textIndent: "-9999px",
            outline: "0",
            overflow: "hidden",
            display: "block",
            backgroundImage:"url(https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png)"
        }
        return (
            <div style={container}>
                <h1><span style={login_logo}></span></h1>
                <div style={container_dialog}>
                    <Input addonBefore="用户名" size="large" placeholder="请输入用户名" onChange={this.changeUser} value={this.state.user}/>
                    <br />
                    <br />
                    <Input addonBefore="密&nbsp;&nbsp;&nbsp;码" size="large" onChange={this.changePwd} placeholder="请输入密码" value={this.state.pwd}/>
                    <br />
                    <br />
                    <Button type="primary" danger onClick={this.goLogin} value>登录</Button>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);