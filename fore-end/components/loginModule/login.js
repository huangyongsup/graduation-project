import React, { Component } from 'react'
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router-dom'
import * as actions from './action'
import RegisterModal from './register'

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { getFieldValue } = this.props.form
    const { getUserInfo, userInfo } = this.props
    const userName = getFieldValue('userName')
    const password = getFieldValue('password')
    console.log(getUserInfo({userName, password}))
    this.setState({loading: true})
    console.log(this.props)
    console.log(userInfo);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      const { userInfo } = this.props
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);
    console.log(userInfo);
      if(userInfo.userType){
        location.href = 'http://localhost:1234/#/'
      }
  }

  showModal = () => {
    console.log(this.props.userInfo);
    this.setState({visible: true})
  }

  onCancel = () => {
    this.setState({visible: false})
  }

  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ maxWidth: '26%', margin: '10px 37%' }}>
       <Card title={'登陆'}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{
                pattern: /^[0-9a-zA-Z]+$/, message: '用户名只能由字母和数字组成'
              }]
            })(
              <Input prefix={<Icon type="user" />} placeholder="用户名" autoComplete="username" allowClear={true} />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password')(
              <Input.Password prefix={<Icon type="lock" />} placeholder="密码" autoComplete="current-password" allowClear={true} />
            )}
          </Form.Item>
          <Form.Item>
            <Button loading={this.state.loading} htmlType="submit" type="primary" block>登陆</Button>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <Button onClick={this.showModal} style={{ float: 'right' }}>点此注册</Button>
          </Form.Item>
        </Form>
      </Card>
        <RegisterModal
          visible={this.state.visible}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => state.loginReducer
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
Login = Form.create()(Login)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
