import React from 'react'
import { Table, Button, Skeleton } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import * as actions from './action'

class MyTestList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getTestPaperList, initialize, setLoading, userInfo: { classNo, username } } = this.props
    setLoading()
    initialize()
    getTestPaperList({ type: 'getTestPaperList', classNo, username})
  }

  render() {
    const { testPaperList, isLoading } = this.props
    const columns = [{
      title: '试卷名',
      dataIndex: 'testPaperTitle',
    }, {
      title: '命题教师',
      dataIndex: 'teacher',
    }, {
      title: '答题',
      key: 'testPaperId',
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
      key: 'singleChoiceId',
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
        loading={isLoading}
        columns={columns}
        dataSource={testPaperList}
        rowKey={'testPaperId'}
      />
    )
  }
}

const mapStateToProps = state => ({ userInfo: state.loginReducer.userInfo, ...state.studentReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MyTestList)
