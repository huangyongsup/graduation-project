import React from 'react'
import { BackTop, Skeleton, Tooltip, Button, Card, Checkbox, Col, Form, Input, message, Radio, Row, Select} from "antd";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as actions from './action'
import { SessionStorage } from "../../lib/utilService";

class CreateTestPaper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      singleChoiceData: [],
      multiChoiceData: [],
    }
  }

  componentWillMount() {
    const { getClassInfo, setLoading } = this.props
    setLoading()
    getClassInfo({ tableName: 'class' })
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
          <Form.Item>
            { getFieldDecorator('class', {
              // initialValue: 'allClass'
              rules: [{required: true, message: '请选择此试卷的目标班级'}]
            })(
              <Select
                placeholder={'将此试卷分发给'}
                mode={'multiple'}
                showArrow={true}
                labelInValue={true}
              >
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
                extra={<Tooltip title={'点击删除此题目'}><Button
                  onClick={(e) => this.deleteQuestion(--index, 'singleChoice')}
                  shape={'circle'} icon={'close'}
                /></Tooltip>}
                key={value.singleChoiceId}
              >
                <Form.Item >
                  { getFieldDecorator(`singleChoice${value.singleChoiceId}`)(
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
    const { getFieldDecorator } = this.props.form
    const { multiChoiceData } = this.state
    if(multiChoiceData){
      return (
        <Card title={'多选题'}>
          {multiChoiceData.map((value, index) => {
            return (
              <Card
                title={`${++index}、${value.question}`}
                extra={<Tooltip title={'点击删除此题目'}><Button
                  onClick={(e) => this.deleteQuestion(--index, 'multiChoice')}
                  shape={'circle'} icon={'close'}
                /></Tooltip>}
                key={value.multiChoiceId}
              >
                <Form.Item>
                  { getFieldDecorator(`multiChoice${value.multiChoiceId}`)(
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

  handleSubmit = (e) => {
    e.preventDefault()
    const { form: { validateFields, getFieldsValue }, makeTestPaper } = this.props
    const { singleSelectedId, multiSelectedId } = this.getQuestionInfo()
    validateFields(err => {
      if(!err) {
        const data = getFieldsValue()
        makeTestPaper({ ...data, singleSelectedId, multiSelectedId })
      }
    })
  }

  render() {
    const { isLoading } = this.props
    return (
      <Skeleton loading={isLoading} active={true}>
      <Form onSubmit={ this.handleSubmit } onClick={this.handleClick}>
        <Card title={ this.renderTitle() } loading={isLoading}>
          { this.renderSingleChoice() }
          { this.renderMultiChoice() }
        </Card>
      </Form>
        <BackTop />
  </Skeleton>
    )
  }
}

const mapStateToProps = store => store.teacherReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CreateTestPaper))
