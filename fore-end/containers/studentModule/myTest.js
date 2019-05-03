import React from 'react'
import { Select, Row, Col, Checkbox, Button, Card, Radio, Form, Input } from 'antd'
import {bindActionCreators} from "redux";
import { connect } from 'react-redux'
import * as actions from './action'

class TestPaper extends React.Component {
  constructor(props) {
    super(props)
  }

  renderTitle = () => {
    const { userInfo } = this.props
    return (
      <Row gutter={16}>
        <Col span={6}>{userInfo.username}</Col>
        <Col span={6}>{userInfo.classNo}</Col>
        <Col span={6}>
          <Button htmlType={'submit'} type={'primary'}>提交</Button>
        </Col>
      </Row>
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

  handleSubmit = () => {

  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Card title={ this.renderTitle() }>
          { this.renderSingleChoice() }
          { this.renderMultiChoice() }
        </Card>
      </Form>
    )
  }
}

const mapStateToProps = state => ({ ...state.loginReducer, ...state.studentReducer })
const mpaDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mpaDispatchToProps)(Form.create()(TestPaper))
