import React from 'react'
import { Table, Button, Skeleton } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import moment from 'moment'
import * as actions from './action'

class Correction extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getTestPaperList, setLoading, } = this.props
    setLoading()
    getTestPaperList({ type: 'getTestPaperList', })
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
          const disabled = moment().isBetween(record.beginTime, record.endTime) || moment(moment().format('YYYY-MM-DD')).isSame(record.beginTime, record.endTime)
          return (
            <Button type={'primary'} disabled={!disabled}><Link to={{
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
            }}>评阅作业</Link></Button>
          )
        }
      }
    }]
    return (
      <Skeleton loading={isLoading} active={true}>
      <Table
        columns={columns}
        dataSource={testPaperList}
        rowKey={'testPaperId'}
      />
      </Skeleton>
    )
  }
}

const mapStateToProps = state => state.teacherReducer
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Correction)
