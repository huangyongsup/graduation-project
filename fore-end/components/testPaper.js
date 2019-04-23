import React from 'react'
import { Checkbox, Button, Card, Radio, Form, Input } from 'antd'

class TestPaper extends React.Component {
  constructor(props) {
    super(props)
  }

  renderTitle = () => {
    const { getFieldDecorator } = this.props.form
    const { handleSubmit } = this.props
    return (
      <div>
        <Form.Item key={'title'} wrapperCol={{ span: 5, offset: 1 }}>
          { getFieldDecorator('title', {
            rules: [{
              required: true,
              message: '试卷名不能为空'
            }]
          })(
            <Input placeholder={'请输入试卷名'}/>
          )}
        </Form.Item>
        <Button onClick={() => handleSubmit} type={'primary'}>提交</Button>
      </div>
    )
  }

  renderSingleChoice = () => {
    const { getFieldDecorator } = this.props.form
    const { singleChoiceData, editable } = this.props
    if(singleChoiceData){
      return (
        <Card title={'单选题'}>
          {singleChoiceData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
                extra={editable && <Button shape={'circle'} icon={'close'} />}
                key={value.singleChoiceId}
              >
                <Form.Item key={value.singleChoiceId}>
                  { getFieldDecorator(`singleChoice${value.singleChoiceId}`)(
                    <Radio.Group>
                      <Radio value={'A'}>{ value.answerA }</Radio>
                      <Radio value={'B'}>{ value.answerB }</Radio>
                      <Radio value={'C'}>{ value.answerC }</Radio>
                      <Radio value={'D'}>{ value.answerD }</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Card>
            )
          })}
        </Card>
      )
    } else {
      return false
    }
  }

  renderMultiChoice = () => {
    const { getFieldDecorator } = this.props.form
    const { multiChoiceData, editable } = this.props
    if(multiChoiceData){
      return (
        <Card title={'多选题'}>
          {multiChoiceData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
                extra={editable && <Button shape={'circle'} icon={'close'} />}
                key={value.multiChoiceId}
              >
                <Form.Item key={value.multiChoiceId}>
                  { getFieldDecorator(`multiChoice${value.multiChoiceId}`)(
                    <Checkbox.Group>
                      <Checkbox value={'A'}>{ value.answerA }</Checkbox>
                      <Checkbox value={'B'}>{ value.answerB }</Checkbox>
                      <Checkbox value={'C'}>{ value.answerC }</Checkbox>
                      <Checkbox value={'D'}>{ value.answerD }</Checkbox>
                    </Checkbox.Group>
                  )}
                </Form.Item>
              </Card>
            )
          })}
        </Card>
      )
    } else {
      return false
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <Form>
        <Card title={this.renderTitle()}>
          { this.renderSingleChoice() }
          { this.renderMultiChoice() }
        </Card>
      </Form>
    )
  }
}

export default Form.create()(TestPaper)
