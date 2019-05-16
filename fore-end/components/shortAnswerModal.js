import React from 'react'
import {Modal, Form, Input, Card, Button} from "antd";

class ShortAnswerModal extends React.Component {
  constructor(props) {
    super(props)
  }

  onOk = () => {
    const { form: { validateFields, getFieldsValue }, username } = this.props
    validateFields(err => {
      if(!err) {
        const data = getFieldsValue()
        console.log(data);
        // makeTestPaper({ ...data, singleSelectedId, multiSelectedId, shortSelectedId, username })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, visible, onCancel } = this.props
    return (
      <Modal
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
        destroyOnClose={true}
      >
        <Form>
          <Card
            title={<Form.Item label={'题目内容'}>
              {getFieldDecorator('question', {
                rules: [{ required: true, message: '题目内容不可为空'}]
              })(
                <Input.TextArea />
              )}
            </Form.Item>}
          >
            <Form.Item>
              { getFieldDecorator('correctAnswer',{
                rules: [{ required: true, message: '请填写参考答案'}]
              })(
                <Input.TextArea />
              )}
            </Form.Item>
          </Card>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ShortAnswerModal)
