import React from 'react'
import { Tooltip, Table, Button, Skeleton } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import moment from 'moment'
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
    const { testPaperList, isLoading, userInfo: { username } } = this.props
    const columns = [{
      title: '作业名',
      dataIndex: 'testPaperTitle',
    }, {
      title: '命题教师',
      dataIndex: 'teacher',
    }, {
      title: '答题',
      key: 'testPaperId',
      render: (text, record, index) => {
        if(!record.analysis){
          const isBefore = moment(moment().format('YYYY-MM-DD')).isBefore(record.beginTime)
          const isAfter = moment(moment().format('YYYY-MM-DD')).isAfter(record.endTime)
          if(isBefore){
            return <Tooltip title={`作业开始时间：${record.beginTime}`}><Button disabled>去答题</Button></Tooltip>
          }
        if(isAfter){
          return <Tooltip title={`此作业已于${record.endTime}过期`}><Button disabled>去答题</Button></Tooltip>
        }
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
              search: `${record.testPaperId}&${username}`
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
