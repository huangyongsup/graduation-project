import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import QuestionBank from '../../components/questionBank'
class MultiChoice extends React.Component {
  constructor(props) {
    super(props)
    this.props.getMultiChoiceQuestionBank({ tableName: 'multi_choice_question' })
  }

  render() {
    const columns = [{
      title: '题目',
      dataIndex: 'question'
    }, {
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
        dataSource={this.props.multiChoiceQuestionBankData}
        primaryKey={'multiChoiceId'}
        columns={columns}
      />
    )
  }
}

const mapStateToProps = state => state.teacherReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MultiChoice)
