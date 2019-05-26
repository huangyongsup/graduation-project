import React, {Component} from 'react'
import { Form, Modal, Input } from 'antd/lib/index'
import * as actions from "./action";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pattern: {
        pattern: /^[0-9a-zA-Z]+$/,
        message: '密码只能由字母和数字组成'
      },
      notNull: {
        required: true,
        message: '不可为空'
      }
    }
  }

  onOk = () => {
    const { update, setLoading, form: { getFieldsValue, validateFields } } = this.props
    validateFields(err => {
      if(!err) {
        const data = getFieldsValue()
        setLoading()
        update(data)
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    if(value && value !== this.props.form.getFieldValue('password')){
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }

  render() {
    const { setInvisible, visible, isLoading, form: { getFieldDecorator }, } = this.props
    const { pattern, notNull } = this.state
    return (
      <Modal
        confirmLoading={isLoading}
        centered={true}
        destroyOnClose={true}
        okText="确认修改"
        cancelText="取消"
        style={{maxWidth: '400px'}}
        visible={visible}
        title="修改密码"
        onOk={this.onOk}
        onCancel={setInvisible}
      >
        <Form>
          <Form.Item label="用户名">
            {getFieldDecorator('username', {
              rules: [pattern, notNull]
            })(
              <Input autoComplete="username" allowClear={true}/>
            )}
          </Form.Item>
          <Form.Item label={'当前密码'}>
            {getFieldDecorator('currentPassword', {
              rules: [pattern, notNull]
            })(
              <Input.Password autoComplete="current-password" allowClear={true} />
            )}
          </Form.Item>
          <Form.Item label={'新密码'}>
            {getFieldDecorator('password', {
              rules: [pattern, notNull]
            })(
              <Input.Password autoComplete="new-password" allowClear={true} />
            )}
          </Form.Item>
          <Form.Item label={'确认密码'}>
            {getFieldDecorator('confirm', {
              rules: [pattern, notNull, {
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

const mapStateToProps = state => state.loginReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Register))

