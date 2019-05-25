import React from 'react'
import {Modal, Form, Input, Card, Button} from "antd";

class ShortAnswerModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { form: { getFieldDecorator }, question, actions, handleSubmit, extra } = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    return (
      <Form onSubmit={e => handleSubmit.call(this, e)}>
          <Card
            title={question.call(this)}
            extra={extra.call(this)}
            actions={actions.call(this)}
          >
            <Form.Item label={'参考答案'} {...formItemLayout}>
              { getFieldDecorator('correctAnswer',{
                rules: [{ required: true, message: '请填写参考答案'}]
              })(
                <Input.TextArea />
              )}
            </Form.Item>
          </Card>
        </Form>
    )
  }
}

export default Form.create()(ShortAnswerModal)
