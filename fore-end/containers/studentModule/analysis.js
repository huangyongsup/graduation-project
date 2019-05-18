import React from 'react'
import { InputNumber, Skeleton, Icon, BackTop, Row, Col, Checkbox, Button, Card, Radio, Form } from 'antd'
import {bindActionCreators} from "redux";
import { connect } from 'react-redux'
import moment from 'moment'
import * as actions from './action'

class TestPaper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { analysis, getTestPaperInfo, setLoading } = this.props
    setLoading()
    const hash = location.hash
    const index = hash.lastIndexOf('?')
    const separator = hash.lastIndexOf('&')
    const testPaperId = hash.slice(index + 1, separator)
    const username = hash.slice(separator + 1)
    getTestPaperInfo({ type: 'getTestPaperInfo', testPaperId })
    setLoading()
    analysis({ type: 'analysis', testPaperId, username })
  }

  handleClick = () => {
    const { userInfo: { userType } } = this.props
    if(userType === 'teacher'){
      location.hash = '#/teacher/correction'
    }
    if(userType === 'student'){
      location.hash = '#/student/myTestList'
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { analysis, form: { validateFields, getFieldsValue }, grade, setLoading } = this.props
    validateFields(err => {
      if(!err){
        const hash = location.hash
        const index = hash.lastIndexOf('?')
        const separator = hash.lastIndexOf('&')
        const testPaperId = hash.slice(index + 1, separator)
        const username = hash.slice(separator + 1)
        const score = getFieldsValue()
        setLoading()
        grade({ score, username, testPaperId })
        setTimeout(() =>
            analysis({ type: 'analysis', testPaperId, username }),
          1000)
      }
    })
  }

  actions = (shortAnswerId) => {
    const { form: { getFieldDecorator }, analysisInfo: { shortAnswer } , userInfo: { userType } } = this.props
    if(userType !== 'teacher' || !shortAnswer){
      return
    }
    const target = shortAnswer.filter(element => element.shortAnswerId === shortAnswerId )[0]
    if(shortAnswer && !parseInt(target.isGrade) ){
      if(moment().isBefore(moment(shortAnswer.endTime).add(7, 'days'))) {
        return [
          <Form.Item label={'请打分'}>
            {getFieldDecorator(shortAnswerId, {
              rules: [{required: true, message: '请先给此题打分'}]
            })(
              <InputNumber min={0} max={parseInt(target.fullMarks)}/>
            )}
          </Form.Item>
        ]
      } else {
        return [<h3>无法进行评分，现在已经超出规定的评分期限</h3>]
      }
    }
  }

  grade = () => {
    const {userInfo: {userType}, isLoading, analysisInfo: { shortAnswer }  } = this.props
    if(userType === 'teacher' && shortAnswer && !parseInt(shortAnswer[0].isGrade)  ){
      if(moment().isBefore(moment(shortAnswer.endTime).add(7, 'days'))) {
        return [
          <Button htmlType={'submit'} type={'primary'} loading={isLoading}>提交打分</Button>
        ]
      }
    }
  }

  actionForSingle = singleChoiceId => {
    const { analysisInfo: { singleAnswer, username }} = this.props
    if(!singleAnswer){
      return
    }
    const target = singleAnswer.filter(element => element.singleChoiceId === singleChoiceId )[0]
    const choice = <div>
      <p>这道题正确答案是：{target.correctAnswer}</p>
      <p>{username}选择的是：{target.singleAnswer}</p>
    </div>
    if(parseInt(target.isCorrect)){
      return [<h3 key={singleChoiceId}><Icon type="check" />{choice}</h3>]
    } else {
      return [<h3 key={singleChoiceId}><Icon type="close" />{choice}</h3>]
    }
  }

  actionForMulti = multiChoiceId => {
    const { analysisInfo: { multiAnswer, username }} = this.props
    if(!multiAnswer) {
      return
    }
    const target = multiAnswer.filter(element => element.multiChoiceId === multiChoiceId )[0]
    const choice = <div><p>这道题正确答案是：{target.correctAnswer}</p>
      <p>{username}选择的是：{target.multiAnswer}</p></div>
    if(parseInt(target.isCorrect)){
      return [<h3 key={multiChoiceId}><Icon type="check" />{choice}</h3>]
    } else {
      return [<h3 key={multiChoiceId}><Icon type="close" />{choice}</h3>]
    }
  }

  ForShort = shortAnswerId => {
    const { analysisInfo: { shortAnswer, username }} = this.props
    if(!shortAnswer ){
      return
    }
    const target = shortAnswer.filter(element => element.shortAnswerId === shortAnswerId )[0]
    const choice = <div><p>这道题参考答案是：{target.correctAnswer}</p>
      <p>{username}的答案是：{target.shortAnswer}</p>
    <p>{parseInt(target.isGrade) ? `得分：${target.score}` : false }</p></div>
    return [<h3 key={shortAnswerId}>{choice}</h3>]
  }

  renderTitle = () => {
    const {  analysisInfo } = this.props
    return (
      <Row gutter={16}>
        <Col span={6}>{`姓名：${analysisInfo.username}`}</Col>
        <Col span={6}>{`班级：${analysisInfo.className}`}</Col>
        <Col span={6}>{`得分：${Math.round(analysisInfo.totalScore / analysisInfo.fullMarks * 100) }`}</Col>
        <Col span={6}>
          <Button type={'primary'} onClick={this.handleClick}>返回</Button>
        </Col>
      </Row>
    )
  }

  renderSingleChoice = () => {
    const { testPaperInfo: { singleChoiceData }, isLoading } = this.props
    if(singleChoiceData){
      return (
        <Card title={'单选题'} loading={ isLoading}>
          {singleChoiceData.map((value, index) => {
            return (
              <Card
                loading={isLoading }
                hoverable={true}
                actions={this.actionForSingle(value.singleChoiceId)}
                title={`${++index}、${value.question}（${value.score}分）`}
                key={value.singleChoiceId}
              >
                <Radio.Group disabled={true}>
                  {'A.'}<Radio value={'A'}>{ value.answerA }</Radio>
                  {'B.'}<Radio value={'B'}>{ value.answerB }</Radio>
                  {'C.'}<Radio value={'C'}>{ value.answerC }</Radio>
                  {'D.'}<Radio value={'D'}>{ value.answerD }</Radio>
                </Radio.Group>
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
    const {testPaperInfo: { multiChoiceData }, isLoading } = this.props
    if(multiChoiceData){
      return (
        <Card title={'多选题'} loading={isLoading }>
          {multiChoiceData.map((value, index) => {
            return (
              <Card
                loading={isLoading }
                title={`${++index}、${value.question}（${value.score}分）`}
                hoverable={true}
                actions={this.actionForMulti(value.multiChoiceId)}
                key={value.multiChoiceId}
              >
                <Checkbox.Group disabled={true}>
                  {'A.'}<Checkbox value={'A'}>{ value.answerA }</Checkbox>
                  {'B.'}<Checkbox value={'B'}>{ value.answerB }</Checkbox>
                  {'C.'}<Checkbox value={'C'}>{ value.answerC }</Checkbox>
                  {'D.'}<Checkbox value={'D'}>{ value.answerD }</Checkbox>
                </Checkbox.Group>
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
    const {testPaperInfo: { shortAnswerData }, isLoading } = this.props
    if(shortAnswerData){
      return (
        <Card title={'多选题'} loading={isLoading }>
          {shortAnswerData.map((value, index) => {
            return (
              <Card
                loading={isLoading }
                title={`${++index}、${value.question}（${value.score}分）`}
                actions={this.actions(value.shortAnswerId)}
                hoverable={true}
                key={value.shortAnswerId}
              >
                {this.ForShort(value.shortAnswerId)}
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
    const { isLoading } = this.props
    return (
      <Skeleton loading={isLoading} active={true}>
        <Form onSubmit={this.handleSubmit}>
          <Card title={ this.renderTitle() } actions={this.grade()} >
            { this.renderSingleChoice() }
            { this.renderMultiChoice() }
            <Card title={'简答题'} loading={isLoading }> { this.renderShortAnswer() }</Card>
          </Card>
        </Form>
        <BackTop />
      </Skeleton>
    )
  }
}

const mapStateToProps = state =>  ({ userInfo: state.loginReducer.userInfo, ...state.studentReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TestPaper))
