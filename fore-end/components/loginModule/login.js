import React, { Component } from 'react'
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import RegisterModal from './register'

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      visible: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

  }

  showModal = () => {
    this.setState({visible: true})
  }

  onCancel = () => {
    this.setState({visible: false})
  }

  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ maxWidth: '26%', margin: '10px 37%' }}>
       <Card title="登陆">
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
            <Button htmlType="submit" type="primary" block>登陆</Button>
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


export default Form.create()(Login)
