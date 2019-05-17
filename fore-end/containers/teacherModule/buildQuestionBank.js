import React from 'react'
import { InputNumber,Input, Form, Button, Card, Radio, Tabs, Tooltip } from 'antd'
import * as actions from "./action";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import SingleChoiceModal from '../../components/singleChoiceModal'
import MultiChoiceModal from '../../components/multiChoiceModal'
import ShortAnswerModal from '../../components/shortAnswerModal'

class BuildQuestionBank extends React.Component {
  constructor(props) {
    super(props)
  }

  question(){
    const{ form: { getFieldDecorator } } = this.props
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
      <Form.Item label={'题目内容'} {...formItemLayout}>
        {getFieldDecorator('question', {
          rules: [{ required: true, message: '题目内容不可为空'}]
        })(
          <Input.TextArea />
        )}
      </Form.Item>
    )
  }

  extra(){
    const { form: { getFieldDecorator } } = this.props
    return (
      <Form.Item label={'分值'}>
        {getFieldDecorator('score', {
          rules: [{required: true, message: '分值不可为空'}]
        })(
          <InputNumber />
        )}
      </Form.Item>
    )
  }

  actions(){
    const { form: { resetFields } } = this.props
    return [
      <Button type={'danger'} onClick={e => resetFields()} >重置</Button>,
      <Button htmlType={'submit'} type={'primary'}>提交</Button>
    ]
  }

  handleSubmit(){
    const { form: { validateFields, getFieldsValue }, username, setQuestion, tableName } = this.props
    validateFields(err => {
      if(!err) {
        const data = getFieldsValue()
        console.log(data);
        setQuestion({ ...data, username, tableName })
      }
    })
  }

  render() {
    const { userInfo: { username }, setQuestion } = this.props
    return (
      <Tabs type={'card'} animated={true}>
        <Tabs.TabPane tab={'添加单选题'} key={'singleChoice'}>
          <SingleChoiceModal
            tableName={'single_choice_question'}
            setQuestion={setQuestion}
            extra={this.extra}
            actions={this.actions}
            question={this.question}
            handleSubmit={this.handleSubmit}
            username={username}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={'添加多选题'} key={'multiChoice'}>
          <MultiChoiceModal
            tableName={'multi_choice_question'}
            setQuestion={setQuestion}
            extra={this.extra}
            actions={this.actions}
            handleSubmit={this.handleSubmit}
            question={this.question}
            username={username}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={'添加简答题'} key={'shortAnswer'}>
          <ShortAnswerModal
            tableName={'short_answer_question'}
            setQuestion={setQuestion}
            extra={this.extra}
            actions={this.actions}
            handleSubmit={this.handleSubmit}
            question={this.question}
            username={username}
          />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

const mapStateToProps = state => ({ userInfo: state.loginReducer.userInfo, ...state.teacherReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(BuildQuestionBank))
