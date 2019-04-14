import React from 'react'
import { message, Table, Button, Row, Col } from 'antd'
import TestPaperModal from "./testPaperModal";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import * as actions from './action'
class TestPaperManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      selectedRowKeys: [],
      columns: [{
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
    }
  }

  componentWillMount() {
    const { getQuestionBank } = this.props
    getQuestionBank()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { makeTestPaperDone } = this.props
    console.log(makeTestPaperDone);
    if(makeTestPaperDone === true ){
      message.info('添加试卷成功')
    }
  }

  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys]
    const index = selectedRowKeys.indexOf(record.singleChoiceId)
    console.log(index, record.singleChoiceId);
    if(index >= 0){
      selectedRowKeys.splice(index, 1)
    } else {
      selectedRowKeys.push(record.singleChoiceId)
    }
    this.setState({ selectedRowKeys })
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  showTestPaperModal = () => {
    // this.setState({visible: true})
    const { makeTestPaper } = this.props
    makeTestPaper(this.state.selectedRowKeys)
  }

  onCancel = () => {
    this.setState({visible: false})
  }
  render() {
    const { questionBankData } = this.props
    const { selectedRowKeys, columns } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    }
    return (
      <div>
        <Row>
          <Button type={'primary'} onClick={this.showTestPaperModal}>新增试卷</Button>
          <TestPaperModal visible={this.state.visible} onCancel={this.onCancel}/>
        </Row>
        <Table
          rowKey={'singleChoiceId'}
          dataSource={questionBankData}
          columns={columns}
          rowSelection={rowSelection}
          onRow={ record => ({
            onClick: () => this.selectRow(record)
          })}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state.teacherReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TestPaperManage)
