import React from 'react'
import { message } from "antd";
import TestPaper from '../../components/testPaper'
import { SessionStorage } from "../../lib/utilService";

class CreateTestPaper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      singleChoiceData: [],
    }
  }

  componentWillMount() {
    const data = JSON.parse(SessionStorage.getObject('persist:root').teacherReducer).singleChoiceQuestionBankData
    const selectedId = SessionStorage.getObject('singleChoiceId')
    if(!data || !selectedId) {
      message.warn('您还没有选中任何题目')
      return false
    }
    const selectedData = data.filter( value => selectedId.indexOf(value.singleChoiceId) !== -1
    )
    this.setState({ singleChoiceData: selectedData })
  }

  render() {
    return (
      <TestPaper
        singleChoiceData={this.state.singleChoiceData}
      />
    )
  }
}

export default CreateTestPaper
