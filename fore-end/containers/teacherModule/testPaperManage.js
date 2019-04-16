import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import QuestionBank from '../../components/questionBank'
class TestPaperManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
  }

  componentWillMount() {
    const { getSingleChoiceQuestionBank, singleChoiceQuestionBankData } = this.props
    getSingleChoiceQuestionBank({ tableName: 'single_choice_question' })
    this.setState({ dataSource: singleChoiceQuestionBankData })
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
        dataSource={this.state.dataSource}
        primaryKey={'singleChoiceId'}
        columns={columns}
      />
    )
  }
}

const mapStateToProps = state => state.teacherReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TestPaperManage)
