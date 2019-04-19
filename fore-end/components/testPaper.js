import React from 'react'
import { Radio, Form, Input } from 'antd'

class TestPaper extends React.Component {
  constructor(props) {
    super(props)
  }

  renderSingleChoice = () => {
    const { getFieldDecorator } = this.props.form
    const { singleChoiceData } = this.props
    if(singleChoiceData){
      return singleChoiceData.map((value, index) => {
        return (
          <Form.Item
            key={value.singleChoiceId}
            label={`${++index}、${value.question}`}
          >
            { getFieldDecorator(`singleChoice${value.singleChoiceId}`)(
              <Radio.Group>
                <Radio value={'A'}>{ value.answerA }</Radio>
                <Radio value={'B'}>{ value.answerB }</Radio>
                <Radio value={'C'}>{ value.answerC }</Radio>
                <Radio value={'D'}>{ value.answerD }</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        )
      })
    } else {
      return false
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 23, offset: 1 },
      wrapperCol: { span: 20, offset: 2 },
      labelAlign: 'left',
      colon: false,
    }
    return (
      <Form { ...formItemLayout }>
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
        { this.renderSingleChoice() }
      </Form>
    )
  }
}

export default Form.create()(TestPaper)
