import React from 'react'
import {Modal, Form, Input, Card, Button, Radio} from "antd";

class SingleChoiceModal extends React.Component {
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
        destroyOnClose={true}
        onCancel={onCancel}
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
                rules: [{ required: true, message: '请标记出正确答案'}]
              })(
                <Radio.Group>
                  {['A', 'B', 'C', 'D'].map(value => {
                    return (
                      <Radio value={value} key={value}>
                        <Form.Item label={value}>
                          {getFieldDecorator(`answer-${value}`, {
                            rules: [{ required: true, message: '答案内容不可为空'}]
                          })(
                            <Input.TextArea />
                          )}
                        </Form.Item>
                      </Radio>
                    )
                  })}
                </Radio.Group>
              )}
            </Form.Item>
          </Card>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(SingleChoiceModal)
