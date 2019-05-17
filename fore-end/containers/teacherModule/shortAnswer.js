import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import QuestionBank from '../../components/questionBank'
class ShortAnswer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getShortAnswer, setLoading } = this.props
    setLoading()
    getShortAnswer({ tableName: 'short_answer_question' })
  }

  render() {
    const { isLoading, shortAnswerQuestionBankData } = this.props
    const columns = [{
      title: '命题教师',
      dataIndex: 'teacher',
    }, {
      title: '题目',
      dataIndex: 'question'
    }, {
      title: '参考答案',
      dataIndex: 'correctAnswer'
    }]
    return (
      <QuestionBank
        isLoading={isLoading}
        dataSource={shortAnswerQuestionBankData}
        primaryKey={'shortAnswerId'}
        columns={columns}
      />
    )
  }
}

const mapStateToProps = state => state.teacherReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ShortAnswer)
