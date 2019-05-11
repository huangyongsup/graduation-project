import React from 'react'
import { Table, Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import * as actions from './action'

class MyTestList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getTestPaperList, initialize, userInfo: { classNo, username } } = this.props
    getTestPaperList({ type: 'getTestPaperList', classNo, username})
    initialize()
  }

  render() {
    const { testPaperList } = this.props
    const columns = [{
      title: '试卷名',
      dataIndex: 'testPaperTitle',
    }, {
      title: '答题',
      dataIndex: 'testPaperId',
      render: (text, record, index) => {
        if(!record.analysis){
          return (
            <Button type={'primary'}><Link to={{
              pathname: '/student/myTest',
              search: `${record.testPaperId}`
            }}>去答题</Link></Button>
          )
        }
      }
    }, {
      title: '答案解析',
      dataIndex: 'analysis',
      render: (text, record) => {
        if(record.analysis) {
          return (
            <Button type={'primary'}><Link to={{
              pathname: '/student/analysis',
              search: `${record.testPaperId}`
            }}>答案解析</Link></Button>
          )
        }
      }
    }]

    return (
      <Table
        columns={columns}
        dataSource={testPaperList}
        rowKey={'testPaperId'}
      />
    )
  }
}

const mapStateToProps = state => ({ ...state.loginReducer, ...state.studentReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MyTestList)
