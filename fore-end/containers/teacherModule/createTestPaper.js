import React from 'react'
import {Button, Card, Checkbox, Col, Form, Input, message, Radio, Row, Select} from "antd";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as actions from './action'
import { SessionStorage } from "../../lib/utilService";

class CreateTestPaper extends React.Component {
  constructor(props) {
    super(props)
    this.props.getClassInfo({ tableName: 'class' })
    this.state = {
      singleChoiceData: [],
      multiChoiceData: [],
    }
  }

  componentWillMount() {
    this.initQuestionInfo()
  }

  initQuestionInfo = () => {
    const { root, singleSelectedId, multiSelectedId } = this.getQuestionInfo()
    if (root) {
      const single = root.singleChoiceQuestionBankData
      const multi = root.multiChoiceQuestionBankData
      if (singleSelectedId) {
        const selectedSingleData = single.filter(value => singleSelectedId.indexOf(value.singleChoiceId) !== -1)
        this.setState({singleChoiceData: selectedSingleData})
      }
      if(multiSelectedId) {
        const selectedMultiData = multi.filter(value => multiSelectedId.indexOf(value.multiChoiceId) !== -1)
        this.setState({ multiChoiceData: selectedMultiData })
      }
    } else {
      message.warn('获取数据失败，请稍后再试或与管理员联系')
    }
  }

  getQuestionInfo = () => {
    const root = JSON.parse(SessionStorage.getObject('persist:root').teacherReducer) || {}
    const singleSelectedId = SessionStorage.getObject('singleChoiceId')
    const multiSelectedId = SessionStorage.getObject('multiChoiceId')
    return { root, singleSelectedId, multiSelectedId }
  }

  deleteQuestion = (index, type) => {
    const { singleSelectedId, multiSelectedId } = this.getQuestionInfo()
    switch (type) {
      case 'singleChoice':
        singleSelectedId.splice(index, 1)
        SessionStorage.setObject('singleChoiceId', singleSelectedId)
        this.initQuestionInfo()
        break
      case 'multiChoice':
        multiSelectedId.splice(index, 1)
        SessionStorage.setObject('multiChoiceId', multiSelectedId)
        this.initQuestionInfo()
        break
      default:
        break
    }
  }

  renderTitle = () => {
    const { classInfo, form: { getFieldDecorator } } = this.props
    return (
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item>
            { getFieldDecorator('title', {
              rules: [{ required: true, message: '试卷名不能为空' }]
            })(
              <Input placeholder={'请输入试卷名'}/>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'将此试卷分发给'}>
            { getFieldDecorator('classNo', {
              initialValue: 'allClass'
            })(
              <Select>
                <Select.Option value={'allClass'}>所有班级</Select.Option>
                {classInfo.map((value) => {
                  return (
                    <Select.Option key={value.classNo} value={value.classNo}>{value.className}</Select.Option>
                  )
                })}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button htmlType={'submit'} type={'primary'}>提交</Button>
        </Col>
      </Row>
    )
  }

  renderSingleChoice = () => {
    const { getFieldDecorator } = this.props.form
    const { singleChoiceData } = this.state
    if(singleChoiceData){
      return (
        <Card title={'单选题'}>
          {singleChoiceData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
                extra={<Button
                  onClick={(e) => this.deleteQuestion(--index, 'singleChoice')}
                  shape={'circle'} icon={'close'}
                />}
                key={value.singleChoiceId}
              >
                <Form.Item >
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
    const { multiChoiceData } = this.state
    if(multiChoiceData){
      return (
        <Card title={'多选题'}>
          {multiChoiceData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
                extra={<Button
                  onClick={(e) => this.deleteQuestion(--index, 'multiChoice')}
                  shape={'circle'} icon={'close'}
                />}
                key={value.multiChoiceId}
              >
                <Form.Item>
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

  handleSubmit = (e) => {
    e.preventDefault()
    const { form: { validateFields, getFieldsValue }, makeTestPaper } = this.props
    validateFields(err => {
      if(!err) {
        const data = getFieldsValue()
        makeTestPaper(data)
        console.log(data);
      }
    })
  }

  render() {
    return (
      <Form onSubmit={ this.handleSubmit } onClick={this.handleClick}>
        <Card title={ this.renderTitle() }>
          { this.renderSingleChoice() }
          { this.renderMultiChoice() }
        </Card>
      </Form>
    )
  }
}

const mapStateToProps = store => store.teacherReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CreateTestPaper))
