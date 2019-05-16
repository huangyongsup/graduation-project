import React from 'react'
import { BackTop, Row, Col, Checkbox, Button, Card, Radio, Form, Input } from 'antd'
import {bindActionCreators} from "redux";
import { connect } from 'react-redux'
import * as actions from './action'

class TestPaper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getTestPaperInfo } = this.props
    const hash = location.hash
    const index = hash.lastIndexOf('?')
    const testPaperId = hash.slice(index + 1)
    getTestPaperInfo({ type: 'getTestPaperInfo', testPaperId })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { submitAnswerDone } = this.props
    if(submitAnswerDone){
      location.hash= '#/student/myTestList'
    }
  }

  handleClick = () => {
    location.hash= '#/student/myTestList'
  }

  renderTitle = () => {
    const { userInfo } = this.props
    return (
      <Row gutter={16}>
        <Col span={6}>{`姓名：${userInfo.username}`}</Col>
        <Col span={6}>{`班级：${userInfo.className}`}</Col>
        <Col span={6}>
          <Button htmlType={'submit'} type={'primary'}>交卷</Button>
        </Col>
        <Col span={6}>
          <Button type={'primary'} onClick={this.handleClick}>返回</Button>
        </Col>
      </Row>
    )
  }

  renderSingleChoice = () => {
    const { testPaperInfo: { singleChoiceData }, form: { getFieldDecorator } } = this.props
    if(singleChoiceData){
      return (
        <Card title={'单选题'}>
          {singleChoiceData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
                key={value.singleChoiceId}
              >
                <Form.Item key={value.singleChoiceId}>
                  { getFieldDecorator(`singleChoice-${value.singleChoiceId}`, {
                    rules: [{ required: true, message: '请务必填选答案'}]
                  })(
                    <Radio.Group>
                      {'A.'}<Radio value={'A'}>{ value.answerA }</Radio>
                      {'B.'}<Radio value={'B'}>{ value.answerB }</Radio>
                      {'C.'}<Radio value={'C'}>{ value.answerC }</Radio>
                      {'D.'}<Radio value={'D'}>{ value.answerD }</Radio>
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
    const {testPaperInfo: { multiChoiceData }, form: { getFieldDecorator } } = this.props
    if(multiChoiceData){
      return (
        <Card title={'多选题'}>
          {multiChoiceData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
                key={value.multiChoiceId}
              >
                <Form.Item key={value.multiChoiceId}>
                  { getFieldDecorator(`multiChoice-${value.multiChoiceId}`, {
                    rules: [{ required: true, message: '请务必填选答案'}]
                  })(
                    <Checkbox.Group>
                      {'A.'}<Checkbox value={'A'}>{ value.answerA }</Checkbox>
                      {'B.'}<Checkbox value={'B'}>{ value.answerB }</Checkbox>
                      {'C.'}<Checkbox value={'C'}>{ value.answerC }</Checkbox>
                      {'D.'}<Checkbox value={'D'}>{ value.answerD }</Checkbox>
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

  renderShortAnswer = () => {
    const {testPaperInfo: { shortAnswerData }, form: { getFieldDecorator } } = this.props
    if(shortAnswerData){
      return (
        <Card title={'简答题'}>
          {shortAnswerData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
                key={value.shortAnswerId}
              >
                <Form.Item key={value.shortAnswerId}>
                  { getFieldDecorator(`shortAnswer-${value.shortAnswerId}`, {
                    rules: [{ required: true, message: '请务必填选答案'}]
                  })(
                    <Input.TextArea />
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

  handleSubmit = (e) => {
    e.preventDefault()
    const { form: { validateFields, getFieldsValue },
      userInfo: { username }, submitAnswer} = this.props
    validateFields(err => {
      if(!err){
        const hash = location.hash
        const index = hash.lastIndexOf('?')
        const testPaperId = hash.slice(index + 1)
        const answer = getFieldsValue()
        submitAnswer({ answer, username, testPaperId })
      }
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Card title={ this.renderTitle() }>
            { this.renderSingleChoice() }
            { this.renderMultiChoice() }
            { this.renderShortAnswer() }
          </Card>
        </Form>
        <BackTop />
      </div>
    )
  }
}

const mapStateToProps = state => ({ userInfo: state.loginReducer.userInfo, ...state.studentReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TestPaper))
