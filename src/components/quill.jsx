import React, { useState } from "react";
import ReactQuill from 'react-quill';
import { Button, Card , Avatar, Modal } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { EditOutlined, DeleteOutlined, SettingOutlined ,ExclamationCircleOutlined} from '@ant-design/icons';
import axios from 'axios'
const { Meta } = Card;
const { confirm } = Modal;
const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        // image() {
        //   imageHandler.call(this, props.action);
        // },
      },
    },
  }
class Quill extends React.Component{
//   const [value, setValue] = useState('')
  constructor(){
      super()
      this.state = {
        title:'',
        banner:'',
        content: '',
        itemBox:[],
        editId: ''
      }
      this.handleClick = this.handleClick.bind(this)
      this.setTitle = this.setTitle.bind(this)
      this.setBanner = this.setBanner.bind(this)
      this.setContent = this.setContent.bind(this)
      this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
      this.showEditConfirm = this.showEditConfirm.bind(this)
  }
  componentDidMount(){
    axios({
        method:'GET',
        url: 'http://172.17.123.154:3000/v1/chili/getindexbanner',
        headers:{
            'Accept': 'text/javascript, application/javascript, application/ x-javascript, */*',
            'Content-Type':'application/json',
            'Authorization': window.localStorage.token
        }
    })
    .then((res) => {
        if(res.data.code === 0) {
           console.log(res)
           console.log(this)
           this.setState({
               itemBox:res.data.data,
               title:'',
               banner:'',
               content: 'test'
           })
        }
    })
  }
  // 发布文章
  handleClick(){
     let that = this
    axios({
      method:'POST',
      url: 'http://172.17.123.154:3000/v1/chili/publicarticle',
      data:JSON.stringify(
          {
            title: this.state.title,
            bannerUrl: this.state.banner,
            content: this.state.content,
            type: this.state.editId ? 'edit' : 'new',
            id: this.state.editId ? this.state.editId : ''
          }
      ),
      headers:{
          'Accept': 'text/javascript, application/javascript, application/ x-javascript, */*',
          'Content-Type':'application/json'
      }

  })
  .then((data) => {
      if (data.data.code===0) {
          alert('成功')
      }
  })
  }
  showEditConfirm(id){
    let that = this
    confirm({
      title: '编辑文章?',
      icon: <ExclamationCircleOutlined />,
      content: '是否编辑此篇文章?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk() {
        // window.location.href = 'http://192.168.253.6:3000/delarticle?id='+ e.getAttribute('data-id').replace(/['"]+/g, '')
        axios({
          method:'GET',
          url:`http://172.17.123.154:3000/v1/chili/editarticle?id=${id}`,
          headers:{
              'Accept': 'text/javascript, application/javascript, application/ x-javascript, */*',
              'Content-Type':'application/json',
              'Authorization': window.localStorage.token
          }
        })
        .then((res) => {
          console.log(res.data.data.title)
          that.setState({
            title:res.data.data.title,
            banner:res.data.data.bannerUrl,
            content: res.data.data.content,
            editId: res.data.data._id
          })
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  showDeleteConfirm(id){
    confirm({
      title: '删除文章?',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除此篇文章?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk() {
        // window.location.href = 'http://192.168.253.6:3000/delarticle?id='+ e.getAttribute('data-id').replace(/['"]+/g, '')
        axios({
          method:'GET',
          url:`http://172.17.123.154:3000/v1/chili/delarticle?id=${id}`,
          headers:{
              'Accept': 'text/javascript, application/javascript, application/ x-javascript, */*',
              'Content-Type':'application/json',
              'Authorization': window.localStorage.token
          }
        })
        .then((data) => {
          alert('删除成功')
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  setTitle(event){
    this.setState({title:event.target.value})
  }
  setBanner(event){
    this.setState({banner:event.target.value})
  }
  setContent(content){
    this.setState({content})
  }
  render(){
    const loading = 'false'
    // 判断有无文章显示不同内容
    let listItems
    if(this.state.itemBox.length === 0) {
      listItems = <p>当前暂无文章设置</p>
    } else {
      listItems = this.state.itemBox.map((item,index) =>
            <Card key={index} size="small"
              style={{ width: 300, marginTop: 16, marginRight: '0.5rem', marginLeft: '0.5rem' }}
              cover={
                <img
                  alt="example"
                  src={item.bannerUrl||`https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png`}
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" onClick={() => this.showEditConfirm(item._id)}/>,
                <DeleteOutlined key="delete" onClick={() => this.showDeleteConfirm(item._id)}/>,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={item.title}
                description={item.title}
              />
            </Card>,
            );
    }
    
    return (
        <div style={{padding:'0',width: '1200px',backgroundColor: 'white'}}>
        <div>已发布的文章</div>
            <div style={{display:'flex',justifyContent:'flex-start'}}>
                {listItems}
            </div>
            <div style={{padding:"10px 0"}}>
                <input style={{width:"85%", marginBottom: "10px", marginLeft: '0.5rem',border: '1px solid #ccc'}} placeholder="标题" value={this.state.title} onChange={this.setTitle}/>
                <input style={{width:"85%", marginLeft: '0.5rem', border: '1px solid #ccc'}} placeholder="封面URL：// 推荐 356 * 144" value={this.state.banner} onChange={this.setBanner}/>
            </div>
            <ReactQuill style={{width:"85%",marginLeft: '0.5rem'}} modules={modules} formats={formats} theme="snow" value={this.state.content} onChange={this.setContent}/>
            <div style={{padding: '0 0',display: 'flex',justifyContent: 'flex-end'}}>
                <Button type="primary" danger onClick={this.handleClick}>保存</Button>
                <Button type="primary" danger onClick={this.handleClick} style={{marginLeft:'0.2rem'}}>发布</Button>
            </div>
        </div>
        
      );
  }
}

export default Quill;