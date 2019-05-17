import React from 'react'
import { Row, Col, Form, Input, Card, Button, Checkbox} from "antd";

class MultiChoiceModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { form: { getFieldDecorator }, question, actions, handleSubmit, extra } = this.props
    return (
      <Form onSubmit={e => handleSubmit.call(this)}>
          <Card
            title={question.call(this)}
            extra={extra.call(this)}
            actions={actions.call(this)}
          >
            <Row type="flex" justify="space-around" gutter={16}>
            <Form.Item>
              { getFieldDecorator('correctAnswer',{
                rules: [{ required: true, message: '请标记出正确答案'}]
              })(
                <Checkbox.Group>
                  {['A', 'B', 'C', 'D'].map(value => {
                    return (
                      <Checkbox value={value} key={value}>
                        <Form.Item label={value}>
                          {getFieldDecorator(value, {
                            rules: [{ required: true, message: '答案内容不可为空'}]
                          })(
                            <Input.TextArea />
                          )}
                        </Form.Item>
                      </Checkbox>
                    )
                  })}
                </Checkbox.Group>
              )}
            </Form.Item>
            </Row>
          </Card>
        </Form>
    )
  }
}

export default Form.create()(MultiChoiceModal)
