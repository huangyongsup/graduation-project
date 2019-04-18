import React, {Component} from 'react'
import { Form, Modal, Input } from 'antd'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pattern: {
        pattern: /^[0-9a-zA-Z]+$/,
        message: '用户名只能由字母和数字组成'
      }
    }
  }

  onOk = () => {

  }

  compareToFirstPassword = (rule, value, callback) => {
    if(value && value !== this.props.form.getFieldValue('password')){
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }

  render() {
    const { onCancel, visible, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        centered={true}
        destroyOnClose={true}
        okText="注册"
        cancelText="取消"
        style={{maxWidth: '400px'}}
        visible={visible}
        title="注册"
        onOk={this.onOk}
        onCancel={onCancel}
      >
        <Form>
          <Form.Item label="用户名">
            {getFieldDecorator('username', {
              rules: [this.state.pattern]
            })(
              <Input autoComplete="username" allowClear={true}/>
            )}
          </Form.Item>
          <Form.Item label={'密码'}>
            {getFieldDecorator('password', {
              rules: [this.state.pattern]
            })(
              <Input.Password autoComplete="new-password" allowClear={true} />
            )}
          </Form.Item>
          <Form.Item label={'确认密码'}>
            {getFieldDecorator('confirm', {
              rules: [this.state.pattern, {
                validator: this.compareToFirstPassword
              }]
            })(
              <Input.Password autoComplete="new-password" allowClear={true} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Register)