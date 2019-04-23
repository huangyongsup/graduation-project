import React from 'react'
import { message } from "antd";
import TestPaper from '../../components/testPaper'
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
    const root = JSON.parse(SessionStorage.getObject('persist:root').teacherReducer) || {}
    if (root) {
      const single = root.singleChoiceQuestionBankData
      const multi = root.multiChoiceQuestionBankData
      const singleSelectedId = SessionStorage.getObject('singleChoiceId')
      const multiSelectedId = SessionStorage.getObject('multiChoiceId')
      if (singleSelectedId) {
        const selectedSingleData = single.filter(value => singleSelectedId.indexOf(value.singleChoiceId) !== -1)
        this.setState({singleChoiceData: selectedSingleData})
      }
      if(multiSelectedId) {
        const selectedMultiData = multi.filter(value => multiSelectedId.indexOf(value.multiChoiceId) !== -1)
        this.setState({ multiChoiceData: selectedMultiData })
      }
    } else {
      message.warn('您还未选中任何题目')
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log("ad");
    // console.log(this.props, 'sskjkl');
    // const { getFieldsValue } = this.props.form
    // const data = getFieldsValue()
    // console.log(data);
  }

  render() {
    return (
      <TestPaper
        singleChoiceData={this.state.singleChoiceData}
        multiChoiceData={this.state.multiChoiceData}
        editable={true}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default CreateTestPaper
