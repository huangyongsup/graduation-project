import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import QuestionBank from '../../components/questionBank'
class MultiChoice extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getMultiChoiceQuestionBank, setLoading } = this.props
    setLoading()
    getMultiChoiceQuestionBank({ tableName: 'multi_choice_question' })
  }

  render() {
    const { isLoading, multiChoiceQuestionBankData } = this.props
    const columns = [{
      title: '命题教师',
      dataIndex: 'teacher',
    }, {
      title: '题目',
      dataIndex: 'question'
    }, {
      title: '正确选项',
      dataIndex: 'correctAnswer'
    },{
      title: 'A',
      dataIndex: 'answerA'
    }, {
      title: 'B',
      dataIndex: 'answerB'
    }, {
      title: 'C',
      dataIndex: 'answerC'
    }, {
      title: 'D',
      dataIndex: 'answerD'
    }]
    return (
      <QuestionBank
        isLoading={isLoading}
        dataSource={multiChoiceQuestionBankData}
        primaryKey={'multiChoiceId'}
        columns={columns}
      />
    )
  }
}

const mapStateToProps = state => state.teacherReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MultiChoice)
