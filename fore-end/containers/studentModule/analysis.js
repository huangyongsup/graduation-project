import React from 'react'
import { Icon, BackTop, Row, Col, Checkbox, Button, Card, Radio, Form } from 'antd'
import {bindActionCreators} from "redux";
import { connect } from 'react-redux'
import * as actions from './action'

class TestPaper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { analysis, getTestPaperInfo } = this.props
    const hash = location.hash
    const index = hash.lastIndexOf('?')
    const testPaperId = hash.slice(index + 1)
    getTestPaperInfo({ type: 'getTestPaperInfo', testPaperId })
    analysis({ type: 'analysis', testPaperId })
  }

  handleClick = () => {
    location.href = 'http://localhost:1234/#/student/myTestList'
  }

  getTotalScore = () => {
    const { analysisInfo: { singleAnswer, multiAnswer } } = this.props
    let totalScore = 0
    console.log(singleAnswer);
    singleAnswer.forEach(element => totalScore += parseInt(element.score))
    multiAnswer.forEach(element => totalScore += parseInt(element.score))
    return totalScore
  }

  actionForSingle = singleChoiceId => {
    const { analysisInfo: { singleAnswer }} = this.props
    const target = singleAnswer.filter(element => element.singleChoiceId === singleChoiceId )[0]
    const choice = `这道题正确答案是：${target.correctAnswer}，你选择的是：${target.singleAnswer}`
    if(parseInt(target.isCorrect)){
      return [<div><Icon type="check" />{choice}</div>]
    } else {
      return [<div><Icon type="close" />{choice}</div>]
    }
  }

  actionForMulti = multiChoiceId => {
    const { analysisInfo: { multiAnswer }} = this.props
    const target = multiAnswer.filter(element => element.multiChoiceId === multiChoiceId )[0]
    const choice = `这道题正确答案是：${target.correctAnswer}，你选择的是：${target.multiAnswer}`
    if(parseInt(target.isCorrect)){
      return [<div><Icon type="check" />{choice}</div>]
    } else {
      return [<div><Icon type="close" />{choice}</div>]
    }
  }

  renderTitle = () => {
    const { userInfo } = this.props
    return (
      <Row gutter={16}>
        <Col span={6}>{`姓名：${userInfo.username}`}</Col>
        <Col span={6}>{`班级：${userInfo.className}`}</Col>
        <Col span={6}>{`得分：${this.getTotalScore()}`}</Col>
        <Col span={6}>
          <Button type={'primary'} onClick={this.handleClick}>返回</Button>
        </Col>
      </Row>
    )
  }

  renderSingleChoice = () => {
    const { testPaperInfo: { singleChoiceData } } = this.props
    if(singleChoiceData){
      return (
        <Card title={'单选题'}>
          {singleChoiceData.map((value, index) => {
            return (
              <Card
                hoverable={true}
                actions={this.actionForSingle(value.singleChoiceId)}
                title={`${++index}、${value.question}`}
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
    const {testPaperInfo: { multiChoiceData }} = this.props
    if(multiChoiceData){
      return (
        <Card title={'多选题'}>
          {multiChoiceData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
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

  render() {
    return (
      <div>
        <Form>
        <Card title={ this.renderTitle() }>
          { this.renderSingleChoice() }
          { this.renderMultiChoice() }
        </Card>
      </Form>
        <BackTop />
      </div>
    )
  }
}

const mapStateToProps = state =>  ({ ...state.loginReducer, ...state.studentReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TestPaper)
